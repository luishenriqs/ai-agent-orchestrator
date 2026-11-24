import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { existsSync, lstatSync, mkdirSync, realpathSync, statfsSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { digest, durableCreate, fault, id, object, privateDirectory, readPrivate, requireThat, selfScope, startTime, uid } from './common.ts';
import { seedFixture } from './git.ts';

export type Specification = {
  project: string; task: string; baseline: string; executor: 'offline-substitute';
  reviewer: 'independent-reader'; files: ['task.txt']; output: string;
  test: 'exact-output'; timeoutMs: number;
};

type Task = { spec: string; digest: string; status: string };
type Approval = { payload: string; proof: string; consumed: number; revoked: number };
export type Attempt = {
  id: string; generation: number; coordinator: number; start: string; scope: string;
  phase: string; custody: string | null; cancelled: number;
};

const HMAC = /^[0-9a-f]{64}$/;
const NAME = /^[a-z][a-z0-9-]{0,39}$/;
const SCHEMA = `
CREATE TABLE installation (project TEXT PRIMARY KEY, baseline TEXT NOT NULL) STRICT;
CREATE TABLE task (slot INTEGER PRIMARY KEY CHECK(slot=1), spec TEXT NOT NULL, digest TEXT NOT NULL, status TEXT NOT NULL) STRICT;
CREATE TABLE approval (slot INTEGER PRIMARY KEY CHECK(slot=1), payload TEXT NOT NULL, proof TEXT NOT NULL,
  consumed INTEGER NOT NULL DEFAULT 0, revoked INTEGER NOT NULL DEFAULT 0) STRICT;
CREATE TABLE attempt (id TEXT PRIMARY KEY, generation INTEGER UNIQUE NOT NULL, coordinator INTEGER NOT NULL,
  start TEXT NOT NULL, scope TEXT NOT NULL, phase TEXT NOT NULL, custody TEXT, cancelled INTEGER NOT NULL DEFAULT 0) STRICT;
CREATE UNIQUE INDEX one_reservation ON attempt ((1)) WHERE phase NOT IN ('released');
CREATE TABLE event (seq INTEGER PRIMARY KEY, at INTEGER NOT NULL, actor TEXT NOT NULL, kind TEXT NOT NULL,
  attempt TEXT REFERENCES attempt(id), payload TEXT NOT NULL) STRICT;
CREATE TABLE candidate (slot INTEGER PRIMARY KEY CHECK(slot=1), envelope TEXT NOT NULL) STRICT;
`;

export function specification(value: unknown): Specification {
  const s = object(value);
  const keys = ['project','task','baseline','executor','reviewer','files','output','test','timeoutMs'];
  requireThat(Object.keys(s).sort().join() === keys.sort().join(), 'unexpected specification fields');
  requireThat(typeof s.project==='string' && NAME.test(s.project) && typeof s.task==='string' && NAME.test(s.task), 'invalid identity');
  requireThat(typeof s.baseline==='string' && /^[a-f0-9]{40}$/.test(s.baseline), 'invalid baseline');
  requireThat(s.executor==='offline-substitute' && s.reviewer==='independent-reader', 'invalid role');
  requireThat(Array.isArray(s.files) && s.files.length===1 && s.files[0]==='task.txt' && s.test==='exact-output', 'invalid offline scope');
  requireThat(typeof s.output==='string' && Buffer.byteLength(s.output)>0 && Buffer.byteLength(s.output)<=4096, 'invalid expected output');
  requireThat(typeof s.timeoutMs==='number' && Number.isInteger(s.timeoutMs) && s.timeoutMs>=250 && s.timeoutMs<=6000, 'invalid deadline');
  return {project:s.project,task:s.task,baseline:s.baseline,executor:s.executor,reviewer:s.reviewer,
    files:['task.txt'],output:s.output,test:s.test,timeoutMs:s.timeoutMs};
}

function open(path: string) {
  const db = new DatabaseSync(path,{timeout:1500,enableForeignKeyConstraints:true});
  db.exec('PRAGMA synchronous=EXTRA');
  requireThat(db.prepare('PRAGMA journal_mode').get()?.journal_mode==='delete' &&
    db.prepare('PRAGMA synchronous').get()?.synchronous===3,'unverified SQLite settings');
  return db;
}

export function initialize(root: string, project: string) {
  requireThat(/^p3-mvp-01-[a-zA-Z0-9.-]+$/.test(basename(root)) && NAME.test(project), 'invalid installation scope');
  const parent = dirname(root);
  requireThat(realpathSync(parent) === parent && statfsSync(parent).type === 0xef53, 'canonical ext4 parent required');
  requireThat(!existsSync(root),'init requires a fresh installation');
  mkdirSync(root,{mode:0o700});
  for (const name of ['control','runs','evidence']) mkdirSync(join(root,name),{mode:0o700});
  const path = join(root,'control','state.sqlite');
  durableCreate(join(root,'control','test-authority'),randomBytes(32));
  durableCreate(path,'');
  const db = open(path);
  try {
    db.exec(SCHEMA);
    // Bootstrap is an explicit local-operator command confined to a fresh root.
    db.prepare('INSERT INTO event(at,actor,kind,payload) VALUES (?,?,?,?)').run(Date.now(),'operator','fixture-bootstrap-intent',JSON.stringify({project}));
    const baseline = seedFixture(root);
    db.exec('BEGIN IMMEDIATE');
    db.prepare('INSERT INTO installation VALUES (?,?)').run(project,baseline);
    db.prepare('INSERT INTO event(at,actor,kind,payload) VALUES (?,?,?,?)').run(Date.now(),'operator','fixture-bootstrap-observed',JSON.stringify({project,baseline}));
    db.exec('COMMIT');
    return {project,baseline};
  } finally { db.close(); }
}

export class State {
  root: string;
  db: DatabaseSync;
  key: Buffer;
  constructor(root: string) {
    this.root=privateDirectory(root);
    const control=privateDirectory(join(root,'control'));
    const path=join(control,'state.sqlite');
    const s=lstatSync(path);
    requireThat(s.isFile() && s.nlink===1 && s.uid===uid() && (s.mode&0o777)===0o600,'unprotected database file');
    this.key=readPrivate(join(control,'test-authority'),32);
    requireThat(this.key.length===32,'test authority is unavailable');
    this.db=open(path);
    requireThat(this.db.prepare('SELECT count(*) AS n FROM installation').get()?.n===1,'incomplete installation');
  }
  close() { this.db.close(); }
  tx<T>(action:()=>T): T {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const result=action();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      if(this.db.isTransaction) this.db.exec('ROLLBACK');
      throw error;
    }
  }
  event(kind:string, payload:unknown, attempt:string|null=null, actor='coordinator') {
    this.db.prepare('INSERT INTO event(at,actor,kind,attempt,payload) VALUES (?,?,?,?,?)').run(Date.now(),actor,kind,attempt,JSON.stringify(payload));
  }
  task(): Task {
    const task=this.db.prepare('SELECT spec,digest,status FROM task WHERE slot=1').get() as Task|undefined;
    requireThat(task,'task is not registered');
    return task;
  }
  active(): Attempt|undefined {
    return this.db.prepare("SELECT * FROM attempt WHERE phase!='released'").get() as Attempt|undefined;
  }
  register(value:unknown) {
    const spec=specification(value);
    const text=JSON.stringify(spec);
    const sha=digest(text);
    return this.tx(()=>{
      const installed=this.db.prepare('SELECT * FROM installation').get();
      requireThat(installed?.project===spec.project && installed.baseline===spec.baseline,'project or baseline mismatch');
      requireThat(!this.db.prepare('SELECT 1 FROM task').get(),'one immutable task specification per offline installation');
      this.db.prepare("INSERT INTO task VALUES (1,?,?,'registered')").run(text,sha);
      this.event('registered',{project:spec.project,task:spec.task,digest:sha},null,'operator');
      return {digest:sha,canonical:spec};
    });
  }
  proof(payload:string) { return createHmac('sha256',this.key).update(payload).digest('hex'); }
  approve(expected:string, ttl:number) {
    requireThat(HMAC.test(expected) && Number.isInteger(ttl) && ttl>=1 && ttl<=600000,'invalid approval context');
    return this.tx(()=>{
      const task=this.task();
      requireThat(task.digest===expected && !this.active() && task.status==='registered','approval target is inapplicable');
      const previous=this.db.prepare('SELECT * FROM approval WHERE slot=1').get() as Approval|undefined;
      if(previous) {
        requireThat(!previous.consumed && (previous.revoked || (JSON.parse(previous.payload).expires <= Date.now())), 'previous approval is still applicable or consumed');
      }
      const spec=specification(JSON.parse(task.spec));
      const now=Date.now();
      const monotonic=process.hrtime.bigint();
      const payload=JSON.stringify({authority:'synthetic-local-operator',nonce:id(),digest:expected,project:spec.project,task:spec.task,
        baseline:spec.baseline,operations:['prepare','dispatch','verify'],issued:now,expires:now+ttl,boot:selfScope().boot,
        expiresMonotonic:String(monotonic+BigInt(ttl)*1000000n)});
      const proof=this.proof(payload);
      this.db.prepare('INSERT INTO approval VALUES(1,?,?,0,0) ON CONFLICT(slot) DO UPDATE SET payload=excluded.payload,proof=excluded.proof,consumed=0,revoked=0').run(payload,proof);
      this.event('approved',{...JSON.parse(payload),proof},null,'synthetic-local-operator');
      return {digest:expected,expires:JSON.parse(payload).expires};
    });
  }
  authorize(consumed:boolean) {
    const task=this.task();
    const a=this.db.prepare('SELECT * FROM approval WHERE slot=1').get() as Approval|undefined;
    requireThat(a && HMAC.test(a.proof) && timingSafeEqual(Buffer.from(a.proof,'hex'),Buffer.from(this.proof(a.payload),'hex')),'missing or forged approval');
    const p=JSON.parse(a.payload);
    const spec=specification(JSON.parse(task.spec));
    requireThat(!a.revoked && Boolean(a.consumed)===consumed && p.issued<=Date.now() && Date.now()<p.expires &&
      p.boot===selfScope().boot && typeof p.expiresMonotonic==='string' && /^\d+$/.test(p.expiresMonotonic) &&
      process.hrtime.bigint()<BigInt(p.expiresMonotonic), 'approval expired, revoked or consumed');
    requireThat(digest(task.spec)===task.digest && p.digest===task.digest && p.project===spec.project &&
      p.task===spec.task && p.baseline===spec.baseline && JSON.stringify(p.operations)==='["prepare","dispatch","verify"]','approval context mismatch');
    return {spec,digest:task.digest,p};
  }
  reserve() {
    return this.tx(()=>{
      requireThat(!this.active() && this.task().status==='registered','installation already used or reservation held');
      const authority=this.authorize(false);
      const generation=Number(this.db.prepare('SELECT COALESCE(MAX(generation),0) AS n FROM attempt').get()?.n)+1;
      const attempt=id();
      const scope=JSON.stringify(selfScope());
      const start=startTime(process.pid);
      requireThat(start,'cannot identify coordinator');
      this.db.prepare("INSERT INTO attempt VALUES (?,?,?,?,?,'prepare',NULL,0)").run(attempt,generation,process.pid,start,scope);
      this.db.prepare('UPDATE approval SET consumed=1 WHERE slot=1').run();
      this.db.prepare("UPDATE task SET status='running' WHERE slot=1").run();
      this.event('preparation-intent-and-admission',{generation,digest:authority.digest,nonce:authority.p.nonce},attempt);
      return {attempt,generation,...authority};
    });
  }
  owner(id:string,generation:number) {
    const row=this.active();
    requireThat(row && row.id===id && row.generation===generation && row.coordinator===process.pid &&
      row.start===startTime(process.pid) && row.scope===JSON.stringify(selfScope()),'stale or unauthorized coordinator');
    return row;
  }
  transition(id:string,generation:number,phase:string,kind:string,payload:unknown,custody?:string) {
    this.owner(id,generation);
    if(custody===undefined) this.db.prepare('UPDATE attempt SET phase=? WHERE id=?').run(phase,id);
    else this.db.prepare('UPDATE attempt SET phase=?,custody=? WHERE id=?').run(phase,custody,id);
    this.event(kind,payload,id);
  }
  revoke() {
    return this.tx(()=>{
      const a=this.db.prepare('SELECT * FROM approval WHERE slot=1').get() as Approval|undefined;
      requireThat(a && !a.revoked,'no applicable approval to revoke');
      const row=this.active();
      requireThat(row || !a.consumed,'approval is terminal');
      this.db.prepare('UPDATE approval SET revoked=1 WHERE slot=1').run();
      if(row) this.db.prepare('UPDATE attempt SET cancelled=1 WHERE id=?').run(row.id);
      this.event('revoked',{nonce:JSON.parse(a.payload).nonce},row?.id??null,'synthetic-local-operator');
      return { revoked:true };
    });
  }
  obligation(row:Attempt, facts:unknown) {
    const task=this.task();
    const {project,task:taskId}=specification(JSON.parse(task.spec));
    return {project,task:taskId,attempt:row.id,generation:row.generation,facts,
      resources:{worktree:join(this.root,'runs',row.id,'work'),evidence:join(this.root,'evidence',row.id),custody:row.custody?JSON.parse(row.custody):null},
      blocked:['new-preparation','redispatch','cleanup','integration'], owner:'local-operator',
      next:'recover after reconciling observed execution and durable effects'};
  }
  uncertain(id:string,generation:number,reason:string) {
    this.tx(()=>{
      const row=this.owner(id,generation);
      this.transition(id,generation,'uncertain','recovery-required',this.obligation(row,{reason,priorPhase:row.phase}));
      this.db.prepare("UPDATE task SET status='suspended' WHERE slot=1").run();
    });
  }
  finish(id:string,generation:number,outcome:string,details:unknown,envelope?:unknown) {
    fault('before-result');
    return this.tx(()=>{
      this.owner(id,generation);
      if(envelope) {
        this.authorize(true);
        requireThat(outcome==='verified','candidate outcome mismatch');
        this.db.prepare('INSERT INTO candidate VALUES (1,?)').run(JSON.stringify(envelope));
      }
      this.transition(id,generation,'released','result',{outcome,details});
      this.db.prepare('UPDATE task SET status=? WHERE slot=1').run(outcome);
    });
  }
  status() {
    return {task:this.task(), reservation:this.active()??null, events:this.db.prepare('SELECT * FROM event ORDER BY seq').all()};
  }
  recover(observation:(attempt:Attempt)=>{ stopped:boolean; knownNoDelivery:boolean; detail:unknown }) {
    return this.tx(()=>{
      const row=this.active();
      requireThat(row,'no reservation to reconcile');
      requireThat(row.scope===JSON.stringify(selfScope()),'different boot or PID namespace; reservation retained');
      requireThat(startTime(row.coordinator)!==row.start,'coordinator still owns the attempt');
      const result=observation(row);
      this.event('recovery-observation',result,row.id,'recovery');
      if(!result.stopped || !result.knownNoDelivery) {
        this.event('recovery-required',this.obligation(row,result),row.id,'recovery');
        this.db.prepare("UPDATE attempt SET phase='uncertain' WHERE id=?").run(row.id);
        this.db.prepare("UPDATE task SET status='suspended' WHERE slot=1").run();
        return {outcome:'uncertain',reservation:'retained'};
      }
      this.db.prepare("UPDATE attempt SET phase='released' WHERE id=?").run(row.id);
      this.db.prepare("UPDATE task SET status='failed' WHERE slot=1").run();
      this.event('recovery-release',{outcome:'payload-not-delivered',preparation:'reconciled separately; no automatic repetition'},row.id,'recovery');
      return {outcome:'payload-not-delivered',reservation:'released'};
    });
  }
}
