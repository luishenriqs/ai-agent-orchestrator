import { existsSync, lstatSync, mkdirSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { capture, verifyEnvelope, type Envelope } from './artifacts.ts';
import { digest, durableCreate, fault, fsync, privateDirectory, readPrivate, requireThat } from './common.ts';
import { fixtureState, git, GIT_DIGEST, prepareTree, verifyGit } from './git.ts';
import { ceased, confined, hasRecord, profileIdentity, type Custody, type Observation } from './sandbox.ts';
import { type Attempt, State, specification } from './state.ts';

function dirs(root:string, attempt:string) {
  requireThat(/^[a-f0-9-]{36}$/.test(attempt),'invalid attempt path');
  const runs=privateDirectory(join(root,'runs'));
  const evidenceRoot=privateDirectory(join(root,'evidence'));
  const base=join(runs,attempt);
  return {base, work:join(base,'work'), permit:join(base,'permit'), evidence:join(evidenceRoot,attempt)};
}

function record(directory:string, name:string, observation:Observation, context:unknown) {
  const bytes=JSON.stringify({context,observation});
  requireThat(Buffer.byteLength(bytes)<=65536,'evidence exceeds artifact limit');
  durableCreate(join(directory,name),bytes);
  return {name,sha256:digest(bytes)};
}

export async function execute(state:State) {
  verifyGit();
  const profile={...profileIdentity(),git:GIT_DIGEST};
  const reservation=state.reserve();
  const {attempt,generation,spec}=reservation;
  const locations=dirs(state.root,attempt);
  const preDelivery=['prepare','prepared','spawn-intent','attached','delivery-intent'];
  let effectPossible=false;
  let proofOfCessation=true;
  let executionObservation:Observation|undefined;
  const captureObservation=(name:string,observation:Observation,context:unknown)=>record(locations.evidence,name,observation,context);
  const phase=(status:string,event:string,details:unknown)=>state.tx(()=>state.transition(attempt,generation,status,event,details));
  const serial=(action:()=>void)=>state.tx(()=>{
    state.authorize(true);
    const active=state.owner(attempt,generation);
    requireThat(active.cancelled===0,'attempt cancelled');
    action();
  });
  const stopReason=()=>{
    const attemptState=state.owner(attempt,generation);
    if(attemptState.cancelled) return 'cancelled';
    try { state.authorize(true); return null; }
    catch(error) { return String(error); }
  };
  try {
    fault('after-reserve');
    mkdirSync(locations.base,{mode:0o700});
    mkdirSync(locations.permit,{mode:0o700});
    mkdirSync(locations.evidence,{mode:0o700});
    fsync(locations.base);
    fsync(join(state.root,'runs'));
    fsync(join(state.root,'evidence'));
    const worktree=prepareTree(state.root,spec.baseline,attempt,locations.work);
    phase('prepared','prepared',worktree);
    const workerRequest=join(locations.base,'request.json');
    durableCreate(workerRequest,JSON.stringify({attempt,output:spec.output}));
    if(process.env.P3_TEST_CASE==='hold-before-spawn') await delay(450);
    fault('before-spawn');
    serial(()=>state.transition(attempt,generation,'spawn-intent','spawn-admitted',{attempt,profile}));
    proofOfCessation=false;

    executionObservation=await confined({
      action:'execute',attempt,timeoutMs:spec.timeoutMs,
      mounts:[{from:locations.work,to:'/work',writable:true},{from:join(locations.work,'.git'),to:'/work/.git'},
        {from:workerRequest,to:'/request.json'},{from:locations.permit,to:'/permit'}],
      attached:custody=>{
        state.tx(()=>state.transition(attempt,generation,'attached','process-observed',custody,JSON.stringify(custody)));
        fault('after-attach');
      },
      accept:()=>{
        serial(()=>state.transition(attempt,generation,'delivery-intent','delivery-intent',{attempt}));
        fault('before-delivery');
        serial(()=>{
          // The rename is the receiver's one local acceptance boundary, ordered
          // under the same lock as revocation. The intent predates this effect.
          requireThat(state.owner(attempt,generation).phase==='delivery-intent','unexpected delivery phase');
          const pending=join(locations.permit,'pending');
          const grant=join(locations.permit,'grant');
          requireThat(!existsSync(grant),'delivery already materialized');
          durableCreate(pending,attempt);
          effectPossible=true;
          renameSync(pending,grant);
          fsync(locations.permit);
          fault('after-delivery');
          state.transition(attempt,generation,'delivered','local-delivery-observed',{attempt,digest:digest(attempt)});
        });
      },
      poll:stopReason,
      testCase:process.env.P3_TEST_CASE,
    });
    proofOfCessation=executionObservation.ceased;
    const observations=[captureObservation('execute.json',executionObservation,{profile,worktree,arguments:['execute',attempt]})];
    const acknowledged=hasRecord(executionObservation,'ACK '+attempt);
    if(!acknowledged) {
      if(!executionObservation.ceased || (effectPossible && !executionObservation.reason)) {
        state.uncertain(attempt,generation,'delivery, acknowledgement or cessation cannot be verified');
        return {outcome:'uncertain',attempt};
      }
      fixtureState(state.root,spec.baseline);
      requireThat(readdirSync(locations.work).sort().join()==='.git,task.txt','failed execution left an unverified inventory');
      const contents=readPrivate(join(locations.work,'task.txt'),4096);
      const effect=contents.toString()==='fixture baseline\n'?'VERIFIED_NOT_EXECUTED':
        contents.toString()===spec.output?'VERIFIED_COMPLETED':'KNOWN_DIFFERENT_EFFECT';
      state.finish(attempt,generation,'failed',{cause:executionObservation.reason,afterDelivery:effectPossible,effect,observedContent:digest(contents),observations});
      return {outcome:'failed',attempt};
    }
    fault('after-ack');
    const snapshot=join(locations.evidence,'snapshot');
    const manifest=capture(locations.work,snapshot,spec.output,
      process.env.P3_TEST_CASE==='unstable' ? ()=>writeFileSync(join(locations.work,'task.txt'),'changed during capture') : undefined);
    const proofRequest=join(locations.base,'proof.json');
    durableCreate(proofRequest,JSON.stringify({content:manifest.sha256,output:spec.output}));
    for(const action of ['test','review'] as const) {
      const scratch=join(locations.base,action+'-scratch');
      mkdirSync(scratch,{mode:0o700});
      serial(()=>state.transition(attempt,generation,action+'-admitted',action+'-admitted',{input:manifest.sha256}));
      proofOfCessation=false;
      const observed=await confined({
        action,attempt,timeoutMs:spec.timeoutMs,
        mounts:[{from:snapshot,to:'/snapshot'},{from:scratch,to:'/scratch',writable:true},{from:proofRequest,to:'/request.json'}],
        poll:stopReason,testCase:action==='test'?process.env.P3_TEST_CASE:undefined,
        attached:custody=>state.tx(()=>state.transition(attempt,generation,action+'-observed',action+'-observed',custody,JSON.stringify(custody))),
      });
      proofOfCessation=observed.ceased;
      observations.push(captureObservation(action==='test'?'test.json':'reader.json',observed,{
        input:manifest.sha256, invocation:['/node','/payload.ts',action,attempt], profile,scratch,
      }));
      requireThat(hasRecord(observed,'VERIFIED '+manifest.sha256) &&
        readPrivate(join(scratch,'receipt')).toString()===manifest.sha256 &&
        digest(readPrivate(join(snapshot,'task.txt')))===manifest.sha256,'test or reader evidence does not pin this snapshot');
    }
    const envelope:Envelope={schema:1,project:spec.project,task:spec.task,attempt,specification:reservation.digest,
      authority:digest(reservation.p.nonce),baseline:spec.baseline,artifact:digest(JSON.stringify(manifest)),manifest,observations,
      test:{name:'exact-output',input:manifest.sha256,evidence:observations[1].sha256},
      reader:{role:'independent-reader',input:manifest.sha256,evidence:observations[2].sha256},
      lastProven:'pinned-version-and-test',outstanding:[],next:'independent-review-and-human-gate'};
    requireThat(JSON.stringify(profile)===JSON.stringify({...profileIdentity(),git:GIT_DIGEST}),'execution profile changed');
    verifyGit();
    verifyEnvelope(envelope,state.root,{attempt,project:spec.project,task:spec.task,spec:reservation.digest,baseline:spec.baseline});
    // Keep the envelope private until its authoritative SQLite commit succeeds.
    if(process.env.P3_TEST_CASE==='readonly-result') state.db.exec('PRAGMA query_only=ON');
    state.finish(attempt,generation,'verified',{artifact:envelope.artifact},envelope);
    return {outcome:'verified',attempt,artifact:envelope.artifact};
  } catch(error) {
    const reason=String(error);
    const row=state.owner(attempt,generation);
    if(proofOfCessation && executionObservation?.ceased && !effectPossible && !existsSync(join(locations.permit,'grant'))) {
      state.finish(attempt,generation,'failed',{reason,delivery:'withheld',preparation:'observed'});
      return {outcome:'failed',attempt};
    }
    // A failure of authoritative storage also fails this secondary write. In
    // that case the last durable reservation remains held across reopening.
    state.uncertain(attempt,generation,reason+(preDelivery.includes(row.phase)?' (before verified delivery)':''));
    return {outcome:'uncertain',attempt,reason};
  }
}

function preparedEffectsMatch(state:State,row:Attempt,work:string) {
  const spec=specification(JSON.parse(state.task().spec));
  const fixture=fixtureState(state.root,spec.baseline);
  const branch='refs/heads/p3/task-'+row.id;
  const observed=git(fixture,['for-each-ref','--format=%(objectname)',branch]);
  if(!existsSync(work)) return observed==='';
  return observed===spec.baseline && lstatSync(work).isDirectory() &&
    git(work,['rev-parse','HEAD'])===spec.baseline &&
    git(work,['symbolic-ref','HEAD'])===branch &&
    git(work,['--no-optional-locks','status','--porcelain','--untracked-files=all'])==='';
}

export function recover(state:State) {
  return state.recover(row=>{
    const locations=dirs(state.root,row.id);
    const custody=row.custody ? JSON.parse(row.custody) as Custody : null;
    // A durable phase before spawn admission proves execution could not
    // start. A spawn intent without a kernel observation remains held.
    const stopped=custody?ceased(custody):['prepare','prepared'].includes(row.phase);
    const withinPreDelivery=['prepare','prepared','spawn-intent','attached','delivery-intent','uncertain'].includes(row.phase);
    const grant=existsSync(join(locations.permit,'grant'));
    let effects=false,error:string|null=null;
    if(withinPreDelivery && !grant && stopped) {
      try { effects=preparedEffectsMatch(state,row,locations.work); }
      catch(failure) { error=String(failure); }
    }
    return {stopped,knownNoDelivery:effects,detail:{attempt:row.id,phase:row.phase,grant,preparationReconciled:effects,custody,error}};
  });
}

export function handoff(state:State) {
  const row=state.db.prepare('SELECT envelope FROM candidate WHERE slot=1').get();
  requireThat(row && typeof row.envelope==='string' && !state.active() && state.task().status==='verified','no verified candidate');
  const task=state.task();
  const spec=specification(JSON.parse(task.spec));
  const envelope=JSON.parse(row.envelope);
  const attempt=state.db.prepare("SELECT id FROM attempt WHERE phase='released'").get();
  requireThat(attempt && typeof attempt.id==='string','missing verified attempt');
  const authority=state.db.prepare("SELECT payload FROM event WHERE kind='approved' ORDER BY seq DESC LIMIT 1").get();
  requireThat(authority && typeof authority.payload==='string' &&
    digest(JSON.parse(authority.payload).nonce)===envelope.authority,'handoff authority does not match durable decision');
  return verifyEnvelope(envelope,state.root,{attempt:attempt.id,spec:task.digest,baseline:spec.baseline,project:spec.project,task:spec.task});
}
