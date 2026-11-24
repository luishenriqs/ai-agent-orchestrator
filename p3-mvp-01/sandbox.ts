import { spawn } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { digest, fault, namespace, requireThat, startTime, uid } from './common.ts';

const BWRAP = '/usr/bin/bwrap';
const PRLIMIT = '/usr/bin/prlimit';
const NODE = '/home/luishenriqs/.nvm/versions/node/v24.22.2/bin/node';
const LOADER = '/lib64/ld-linux-x86-64.so.2';
const LIBS = ['libc.so.6','libdl.so.2','libgcc_s.so.1','libm.so.6','libpthread.so.0','libsmartcols.so.1','libstdc++.so.6'];
const PAYLOAD = fileURLToPath(new URL('./payload.ts', import.meta.url));
const IDENTITY = [
  [BWRAP, 'bf6cf3d4456665f5d80c14eb79a76e0ce87b39a0883e614a161658b4ec33492c'],
  [PRLIMIT, '740e7bb73625b7aa99821cd6641015dfd0430de801a86881837a2cb688182d94'],
  [NODE, '904a6d3484241d466989f9df9ba3aab822b1496191bdb28230eb491a55c32a52'],
] as const;

export function profileIdentity() {
  requireThat(uid()!==0 && process.version==='v24.22.2' && process.execPath===NODE,'unsupported execution identity');
  for (const [path,expected] of IDENTITY) requireThat(digest(readFileSync(path))===expected,'pinned executable changed: '+path);
  return {
    bubblewrap:IDENTITY[0][1], prlimit:IDENTITY[1][1], node:IDENTITY[2][1],
    libraries:Object.fromEntries([LOADER,...LIBS.map(n=>'/lib/x86_64-linux-gnu/'+n)].map(path=>[path,digest(readFileSync(path))])),
    worker:digest(readFileSync(PAYLOAD)),
    limits:{nproc:24,fsize:65536,core:0,captureBytes:8192},
  };
}

type Mount = { from:string; to:string; writable?:boolean };
type ProcessIdentity = {pid:number; start:string};
export type Custody = { root:ProcessIdentity; init:ProcessIdentity; namespace:string };
export type Observation = { code:number|null; signal:string|null; reason:string|null; out:string; err:string; custody:Custody|null; ceased:boolean };

function identified(pid:number|undefined): ProcessIdentity {
  requireThat(Number.isSafeInteger(pid) && Number(pid)>1,'missing process id');
  const start=startTime(pid!);
  requireThat(start,'process missing before acquisition');
  return {pid:pid!,start};
}

function missing(error:unknown) {
  return ['ENOENT','ESRCH'].includes((error as NodeJS.ErrnoException).code ?? '');
}

export function ceased(custody:Custody) {
  if(startTime(custody.root.pid)===custody.root.start || startTime(custody.init.pid)===custody.init.start) return false;
  // Numeric PIDs alone do not establish cessation. Check the pinned namespace
  // against the current process view and reject ambiguous same-UID observations.
  for(const entry of readdirSync('/proc').filter(x=>/^\d+$/.test(x))) {
    const pid=Number(entry);
    try {
      if(statSync('/proc/'+entry).uid!==uid()) continue;
      if(startTime(pid)===null) continue;
      const status=readFileSync('/proc/'+entry+'/status','utf8');
      const localIds=status.match(/^NSpid:\s+(.+)$/m)?.[1].trim().split(/\s+/);
      if(!localIds) return false;
      // Tasks in the coordinator's own namespace cannot be members of the
      // newly created namespace. Their ns links may be ptrace-restricted.
      if(localIds.length>1 && namespace(pid)===custody.namespace) return false;
    } catch(error) {
      if(!missing(error)) return false;
    }
  }
  return true;
}

export async function confined(options:{
  attempt:string; action:'execute'|'test'|'review'; mounts:Mount[]; timeoutMs:number;
  attached?:(custody:Custody)=>void; accept?:()=>void; poll?:()=>string|null; testCase?:string;
}): Promise<Observation> {
  const args=[
    '--unshare-user','--unshare-pid','--unshare-net','--unshare-ipc','--unshare-uts',
    '--die-with-parent','--new-session','--clearenv','--cap-drop','ALL','--proc','/proc','--dev','/dev',
    '--setenv','HOME','/nonexistent','--setenv','UV_THREADPOOL_SIZE','2',
    '--ro-bind',LOADER,'/lib64/ld-linux-x86-64.so.2',
    ...LIBS.flatMap(lib=>['--ro-bind','/lib/x86_64-linux-gnu/'+lib,'/lib/x86_64-linux-gnu/'+lib]),
    '--ro-bind',NODE,'/node','--ro-bind',PRLIMIT,'/limits','--ro-bind',PAYLOAD,'/payload.ts',
    ...options.mounts.flatMap(m=>[m.writable?'--bind':'--ro-bind',m.from,m.to]),
    '--info-fd','3','--',
    '/limits','--nproc=24:24','--fsize=65536:65536','--core=0:0','--',
    '/node','/payload.ts',options.action,options.attempt,options.testCase??'normal',
  ];
  const child=spawn(BWRAP,args,{stdio:['ignore','pipe','pipe','pipe'],env:{},cwd:'/'});
  let out=Buffer.alloc(0), err=Buffer.alloc(0), info=Buffer.alloc(0);
  let custody:Custody|null=null, reason:string|null=null, ready=false, admitted=false, terminal=false;
  const stop=(why:string)=>{
    reason??=why;
    if(!terminal && child.pid) child.kill('SIGKILL');
  };
  const observe=()=>{
    if(reason || terminal || !child.pid) return;
    if(!custody) {
      let parsed;
      try { parsed=JSON.parse(info.toString()); } catch { return; }
      try {
        const init=identified(parsed['child-pid']);
        const ns=namespace(init.pid);
        const root=identified(child.pid);
        requireThat(ns===`pid:[${parsed['pid-namespace']}]` && ns!==namespace(process.pid),'missing distinct custody namespace');
        custody={root,init,namespace:ns};
        options.attached?.(custody);
      } catch(error) { stop('custody: '+String(error)); }
    }
    if(custody && ready && !reason && !admitted) {
      admitted=true;
      try { options.accept?.(); } catch(error) { stop('admission: '+String(error)); }
    }
  };
  const receive=(which:'out'|'err', bytes:Buffer)=>{
    if(out.length+err.length+bytes.length>8192) { stop('output-limit'); return; }
    if(which==='out') {
      out=Buffer.concat([out,bytes]);
      ready=out.toString().startsWith('READY '+options.attempt+'\n');
      observe();
    } else err=Buffer.concat([err,bytes]);
  };
  child.stdout!.on('data',(b:Buffer)=>receive('out',b));
  child.stderr!.on('data',(b:Buffer)=>receive('err',b));
  child.stdio[3]!.on('data',(b:Buffer)=>{
    if(info.length+b.length>2048) { stop('custody-output-limit'); return; }
    info=Buffer.concat([info,b]);
    observe();
  });
  const timer=setTimeout(()=>stop('timeout'),options.timeoutMs);
  const watcher=setInterval(()=>{
    try {
      const result=options.poll?.();
      if(result) stop(result);
    } catch(error) { stop('state unavailable: '+String(error)); }
  },25);
  try {
    const [code,signal]=await new Promise<[number|null,string|null]>(resolve=>{
      child.once('error',e=>{reason='spawn: '+e.message;});
      child.once('exit',()=>{terminal=true;});
      child.once('close',(code,signal)=>resolve([code,signal]));
      if(options.action==='execute') fault('after-spawn');
    });
    let stopped=false;
    for(let i=0;custody && i<15;i++) {
      if(ceased(custody)) { stopped=true; break; }
      await new Promise(resolve=>setTimeout(resolve,20));
    }
    return {code,signal,reason,out:out.toString(),err:err.toString(),custody,ceased:stopped};
  } finally { clearTimeout(timer); clearInterval(watcher); }
}

export function hasRecord(observation: Observation, record:string) {
  return observation.ceased && observation.code===0 && !observation.reason &&
    observation.out.trimEnd().split('\n').at(-1)===record;
}
