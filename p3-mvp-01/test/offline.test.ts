import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { test } from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { verifyEnvelope } from '../artifacts.ts';
import { digest } from '../common.ts';

const CLI=fileURLToPath(new URL('../cli.ts',import.meta.url));
const env={ PATH:'/usr/bin:/bin', LANG:'C' };
type Result={status:number|null; signal:string|null; stdout:string; stderr:string};
function sync(root:string,cmd:string,args:string[]=[],extra:Record<string,string>={}):Result {
  const result=spawnSync(process.execPath,[CLI,cmd,root,...args],{encoding:'utf8',env:{...env,...extra},timeout:10000,maxBuffer:131072});
  assert.ifError(result.error);
  return {status:result.status,signal:result.signal,stdout:result.stdout,stderr:result.stderr};
}
function start(root:string,extra:Record<string,string>={}) {
  const processChild=spawn(process.execPath,[CLI,'run',root],{env:{...env,...extra},stdio:['ignore','pipe','pipe']});
  let stdout='',stderr='';
  processChild.stdout.on('data',b=>stdout+=b);
  processChild.stderr.on('data',b=>stderr+=b);
  return new Promise<Result>((resolve,reject)=>{
    const timer=setTimeout(()=>processChild.kill('SIGKILL'),10000);
    processChild.on('error',reject);
    processChild.on('close',(status,signal)=>{clearTimeout(timer);resolve({status,signal,stdout,stderr});});
  });
}
function okay(result:Result) {
  assert.equal(result.status,0,JSON.stringify(result));
  return JSON.parse(result.stdout);
}
function bad(result:Result, expected:RegExp) {
  assert.equal(result.status,1,JSON.stringify(result));
  assert.match(result.stderr,expected);
}
function fixture(approve:boolean=true) {
  const root=join('/tmp','p3-mvp-01-'+randomUUID());
  const initial=okay(sync(root,'init',['project']));
  const spec={project:'project',task:'task',baseline:initial.baseline,executor:'offline-substitute',
    reviewer:'independent-reader',files:['task.txt'],output:'verified offline result\n',test:'exact-output',timeoutMs:2500};
  const file=join(root,'submission.json');
  writeFileSync(file,JSON.stringify(spec),{mode:0o600,flag:'wx'});
  const sig=okay(sync(root,'register',[file])).digest;
  if(approve) okay(sync(root,'approve',[sig,'30000']));
  return {root,sig,spec,file};
}
const status=(root:string)=>okay(sync(root,'status'));
function event(root:string,name:string) {
  return status(root).events.find((e:{kind:string})=>e.kind===name);
}
async function waitEvent(root:string,name:string) {
  for(let i=0;i<60;i++){
    if(event(root,name)) return;
    await delay(20);
  }
  assert.fail('event absent: '+name);
}
function alter(root:string,sql:string) {
  const db=new DatabaseSync(join(root,'control','state.sqlite'));
  try { db.exec(sql); } finally { db.close(); }
}
function parseResult(result:Result) { return okay(result).outcome; }

test('A01/A02/A03/A04: absent, forged, changed scope, wrong project, duplicate',()=>{
  const {root,sig,spec,file}=fixture(false);
  bad(sync(root,'run'),/missing or forged/);
  bad(sync(root,'approve',['0'.repeat(64),'30000']),/target/);
  writeFileSync(file,JSON.stringify({...spec,project:'another'}));
  bad(sync(root,'register',[file]),/project or baseline/);
  writeFileSync(file,JSON.stringify({...spec,files:['../outside']}));
  bad(sync(root,'register',[file]),/offline scope/);
  okay(sync(root,'approve',[sig,'30000']));
  bad(sync(root,'approve',[sig,'30000']),/applicable/);
  alter(root,"UPDATE approval SET proof='0000000000000000000000000000000000000000000000000000000000000000'");
  bad(sync(root,'run'),/forged/);
  assert.equal(status(root).reservation,null);
});

test('A01/A20/A21: expired and revoked before preparation, permit absent',()=>{
  const expired=fixture(false);
  okay(sync(expired.root,'approve',[expired.sig,'1']));
  bad(sync(expired.root,'run'),/expired/);
  const revoked=fixture();
  okay(sync(revoked.root,'revoke'));
  bad(sync(revoked.root,'run'),/revoked/);
  assert.equal(readdirSync(join(revoked.root,'runs')).length,0);
  const changed=fixture();
  alter(changed.root,"UPDATE task SET spec=replace(spec,'verified offline result','unauthorized output')");
  bad(sync(changed.root,'run'),/context mismatch/);
});

test('A21: revocation wins before spawn admission',async()=>{
  const {root}=fixture();
  const running=start(root,{P3_TEST_CASE:'hold-before-spawn'});
  await waitEvent(root,'prepared');
  okay(sync(root,'revoke'));
  assert.equal(parseResult(await running),'uncertain');
  assert.equal(event(root,'spawn-admitted'),undefined);
  assert.equal(event(root,'local-delivery-observed'),undefined);
});

test('A05/A08/A09/A10/A14/A18/A26: two coordinators, exact artifact and mediated refusals',async()=>{
  const {root,spec}=fixture();
  const results=await Promise.all([start(root,{P3_TEST_CASE:'boundary'}),start(root,{P3_TEST_CASE:'boundary'})]);
  assert.equal(results.filter(x=>x.status===0).length,1,JSON.stringify(results));
  const result=results.find(x=>x.status===0)!;
  assert.equal(parseResult(result),'verified',JSON.stringify(results));
  const state=status(root);
  assert.equal(state.reservation,null);
  assert.equal(state.events.filter((e:{kind:string})=>e.kind==='preparation-intent-and-admission').length,1);
  assert.equal(state.events.filter((e:{kind:string})=>e.kind==='local-delivery-observed').length,1);
  const h=okay(sync(root,'handoff'));
  assert.equal(h.manifest.sha256,digest(spec.output));
  assert.equal(h.test.input,h.manifest.sha256);
  assert.equal(h.next,'independent-review-and-human-gate');
  const evidence=join(root,'evidence',h.attempt);
  const execution=JSON.parse(readFileSync(join(evidence,'execute.json'),'utf8')).observation;
  assert.match(execution.out,/BOUNDARY/);
  assert.equal(execution.ceased,true);
  assert.equal(readFileSync(join(root,'fixture','task.txt'),'utf8'),'fixture baseline\n');
  bad(sync(root,'run'),/already used/);
  for(const command of ['push','merge','cleanup','approve-review']) bad(sync(root,command),/usage/);
  assert.equal(readdirSync(evidence).length,4);
  console.log('P3_REVIEW_EVIDENCE '+JSON.stringify({root,attempt:h.attempt,artifact:h.artifact}));
});

test('A06/A28: crash before preparation, before spawn and before local delivery',async(t)=>{
  for(const checkpoint of ['after-reserve','before-spawn','after-spawn','after-attach','before-delivery']) await t.test(checkpoint,async()=>{
    const {root}=fixture();
    const crash=await start(root,{P3_TEST_FAULT:checkpoint});
    assert.equal(crash.signal,'SIGKILL',JSON.stringify(crash));
    assert.ok(status(root).reservation);
    let outcome;
    for(let i=0;i<(checkpoint==='after-spawn'?1:20);i++) {
      outcome=okay(sync(root,'recover'));
      if(outcome.reservation==='released') break;
      await delay(50);
    }
    if(checkpoint==='after-spawn') {
      assert.deepEqual(outcome,{outcome:'uncertain',reservation:'retained'});
    } else {
      assert.deepEqual(outcome,{outcome:'payload-not-delivered',reservation:'released'});
    }
    assert.equal(event(root,'local-delivery-observed'),undefined);
    bad(sync(root,'run'),/already used/);
  });
});

test('A17/A22/A25/A27: effect possible after handoff, partial or lost ack, no redispatch',async(t)=>{
  for(const variant of ['partial','lost-ack','after-delivery','after-ack','before-result','readonly-result']) await t.test(variant,async()=>{
    const {root}=fixture();
    const extra=['partial','lost-ack','readonly-result'].includes(variant)?{P3_TEST_CASE:variant}:{P3_TEST_FAULT:variant};
    const result=await start(root,extra);
    if(['partial','lost-ack'].includes(variant)) assert.equal(parseResult(result),'uncertain');
    else if(variant==='readonly-result') bad(result,/readonly/i);
    else assert.equal(result.signal,'SIGKILL',JSON.stringify(result));
    assert.ok(status(root).reservation);
    assert.ok(event(root,'prepared'));
    if(variant==='partial'||variant==='lost-ack') assert.ok(event(root,'local-delivery-observed'));
    assert.deepEqual(okay(sync(root,'recover')),{outcome:'uncertain',reservation:'retained'});
    const obligation=JSON.parse(event(root,'recovery-required').payload);
    assert.equal(obligation.owner,'local-operator');
    assert.equal(obligation.attempt,status(root).reservation.id);
    assert.ok(obligation.blocked.includes('redispatch'));
    for(const operation of ['close','cleanup','integrate']) bad(sync(root,operation),/usage/);
    bad(sync(root,'run'),/reservation held/);
    bad(sync(root,'handoff'),/no verified candidate/);
    if(variant==='lost-ack') console.log('P3_RECOVERY_EVIDENCE '+JSON.stringify({root,attempt:status(root).reservation.id}));
  });
});

test('A07/A21/A29: cancellation after admission, timeout, bounded output and descendant custody',async(t)=>{
  for(const variant of ['cancel','hang','excess-output','descendant']) await t.test(variant,async()=>{
    const {root}=fixture();
    const pending=start(root,{P3_TEST_CASE:variant==='cancel'?'hang':variant});
    if(variant==='cancel') {
      await waitEvent(root,'local-delivery-observed');
      bad(sync(root,'recover'),/still owns/);
      okay(sync(root,'cancel'));
    }
    const result=await pending;
    assert.equal(parseResult(result),variant==='descendant'?'verified':'failed',JSON.stringify(result));
    const final=status(root);
    assert.equal(final.reservation,null);
    const attempt=JSON.parse(result.stdout).attempt;
    const execution=JSON.parse(readFileSync(join(root,'evidence',attempt,'execute.json'),'utf8')).observation;
    assert.equal(execution.ceased,true,JSON.stringify(execution));
    if(variant==='cancel') assert.equal(execution.reason,'cancelled');
    if(variant==='hang') assert.equal(execution.reason,'timeout');
    if(variant==='excess-output') assert.equal(execution.reason,'output-limit');
  });
});

test('A10/A11/A23/A24: stale success, unstable source and damaged handoff',async(t)=>{
  for(const variant of ['stale-pass','unstable']) await t.test(variant,async()=>{
    const {root}=fixture();
    assert.equal(parseResult(await start(root,{P3_TEST_CASE:variant})),'uncertain');
    bad(sync(root,'handoff'),/no verified candidate/);
  });
  const {root,spec,sig}=fixture();
  assert.equal(parseResult(await start(root)),'verified');
  const e=okay(sync(root,'handoff'));
  const context={attempt:e.attempt,project:spec.project,task:spec.task,spec:sig,baseline:spec.baseline};
  assert.throws(()=>verifyEnvelope({...e,attempt:randomUUID()},root,context),/stale/);
  assert.throws(()=>verifyEnvelope({...e,observations:[]},root,context),/incomplete/);
  assert.throws(()=>verifyEnvelope({...e,test:{...e.test,input:'0'.repeat(64)}},root,context),/version/);
  const db=new DatabaseSync(join(root,'control','state.sqlite'));
  try {
    db.prepare('UPDATE candidate SET envelope=? WHERE slot=1').run(JSON.stringify({...e,authority:'0'.repeat(64)}));
    bad(sync(root,'handoff'),/authority does not match/);
    db.prepare('UPDATE candidate SET envelope=? WHERE slot=1').run(JSON.stringify(e));
  } finally { db.close(); }
  const path=join(root,'evidence',e.attempt,'test.json');
  assert.ok(existsSync(path));
  writeFileSync(path,'tamper');
  bad(sync(root,'handoff'),/evidence hash differs/);
});
