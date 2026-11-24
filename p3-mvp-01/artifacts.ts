import { chmodSync, lstatSync, mkdirSync, readdirSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { digest, durableCreate, fsync, object, readPrivate, requireThat } from './common.ts';

function fileRecord(path:string) {
  const before=lstatSync(path,{bigint:true});
  const bytes=readPrivate(path,4096);
  const after=lstatSync(path,{bigint:true});
  requireThat(before.ino===after.ino && before.dev===after.dev && before.ctimeNs===after.ctimeNs &&
    before.mtimeNs===after.mtimeNs && before.size===after.size,'source changed during capture');
  return {bytes,signature:[after.ino,after.dev,after.ctimeNs,after.mtimeNs,after.size].map(String).join(':')};
}

function worktreeFiles(work:string) {
  requireThat(realpathSync(work)===work && readdirSync(work).sort().join() === '.git,task.txt','workspace inventory differs from approved scope');
}

export function capture(work:string, destination:string, expected:string, inject?:()=>void) {
  worktreeFiles(work);
  const path=join(work,'task.txt');
  const first=fileRecord(path);
  requireThat(first.bytes.equals(Buffer.from(expected)), 'substitute output differs from approved scope');
  mkdirSync(destination,{mode:0o700});
  const captured=join(destination,'task.txt');
  durableCreate(captured,first.bytes);
  inject?.();
  worktreeFiles(work);
  const last=fileRecord(path);
  requireThat(last.signature===first.signature && last.bytes.equals(first.bytes),'unstable capture');
  requireThat(readPrivate(captured).equals(first.bytes),'capture readback differs');
  chmodSync(captured,0o400);
  chmodSync(destination,0o500);
  fsync(captured);
  fsync(destination);
  return { name:'task.txt',type:'file',mode:'0400',bytes:first.bytes.length,sha256:digest(first.bytes) };
}

type Manifest = ReturnType<typeof capture>;
export type Envelope = {
  schema:1; project:string; task:string; attempt:string; specification:string; authority:string; baseline:string;
  artifact:string; manifest:Manifest; observations:{name:string;sha256:string}[];
  test:{name:'exact-output'; input:string; evidence:string};
  reader:{role:'independent-reader'; input:string; evidence:string};
  lastProven:'pinned-version-and-test'; outstanding:[]; next:'independent-review-and-human-gate';
};

export function verifyEnvelope(value:unknown, root:string, bound:{attempt:string;spec:string;baseline:string;project:string;task:string}) {
  const e=object(value) as unknown as Envelope;
  requireThat(e.schema===1 && e.attempt===bound.attempt && e.specification===bound.spec && e.project===bound.project &&
    e.task===bound.task && e.baseline===bound.baseline && /^[0-9a-f]{64}$/.test(e.authority),'invalid or stale handoff');
  requireThat(e.lastProven==='pinned-version-and-test' && e.next==='independent-review-and-human-gate' &&
    Array.isArray(e.outstanding) && e.outstanding.length===0 && /^[a-f0-9-]{36}$/.test(e.attempt),'incomplete handoff');
  const dir=join(root,'evidence',e.attempt);
  const snapshot=join(dir,'snapshot');
  requireThat(realpathSync(snapshot)===snapshot && readdirSync(snapshot).join()==='task.txt','snapshot inventory mismatch');
  const path=join(snapshot,'task.txt');
  const data=readPrivate(path,4096);
  const manifest={ name:'task.txt',type:'file',mode:'0400',bytes:data.length,sha256:digest(data) };
  requireThat((lstatSync(path).mode & 0o777)===0o400 && JSON.stringify(e.manifest)===JSON.stringify(manifest) &&
    e.artifact===digest(JSON.stringify(manifest)) && e.test?.input===manifest.sha256 && e.reader?.input===manifest.sha256 &&
    e.test.name==='exact-output' && e.reader.role==='independent-reader','evidence or test version mismatch');
  requireThat(Array.isArray(e.observations) && e.observations.map(x=>x.name).join() === 'execute.json,test.json,reader.json','incomplete observations');
  for(const entry of e.observations) {
    const bytes=readPrivate(join(dir,entry.name),65536);
    requireThat(digest(bytes)===entry.sha256,'evidence hash differs');
    const {context,observation}=JSON.parse(bytes.toString());
    const final=entry.name==='execute.json'?'ACK '+e.attempt:'VERIFIED '+manifest.sha256;
    requireThat(observation?.ceased===true && observation.code===0 && !observation.reason &&
      typeof observation.out==='string' && observation.out.trimEnd().split('\n').at(-1)===final &&
      (entry.name==='execute.json' || context?.input===manifest.sha256),'invalid evidence outcome');
  }
  requireThat(e.test.evidence===e.observations[1].sha256 && e.reader.evidence===e.observations[2].sha256,'unbound evidence');
  return e;
}
