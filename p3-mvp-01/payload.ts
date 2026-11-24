// This entry point is mounted read-only in the sandbox. No project code or
// authority material is imported, and control output is scoped to one attempt.
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { spawn } from 'node:child_process';

const [action,attempt,testCase]=process.argv.slice(2);
const fail=(message:string):never=>{ throw new Error(message); };
const hash=(s:Buffer)=>createHash('sha256').update(s).digest('hex');
if(!/^[a-f0-9-]{36}$/.test(attempt)) fail('bad attempt');
const limits=readFileSync('/proc/self/limits','utf8');
if(!/Max processes\s+24\s+24/.test(limits) || !/Max file size\s+65536\s+65536/.test(limits)) fail('limits differ');
if(!/^CapEff:\s+0+$/m.test(readFileSync('/proc/self/status','utf8'))) fail('unexpected capabilities');
console.log('READY '+attempt);
if(action==='execute') {
  const deadline=performance.now()+7000;
  while(!existsSync('/permit/grant')) {
    if(performance.now()>=deadline) fail('no acceptance permit');
    await delay(15);
  }
  if(readFileSync('/permit/grant','utf8')!==attempt) fail('permit identity mismatch');
  const request=JSON.parse(readFileSync('/request.json','utf8'));
  if(request.attempt!==attempt || typeof request.output!=='string' || Buffer.byteLength(request.output)>4096) fail('bad request');
  if(testCase==='boundary') {
    for(const target of ['/work/.git','/request.json','/permit/grant','/work/../permit/grant',
      '/control/state.sqlite','/evidence/marker','/mnt/c/marker','/run/WSL/marker','/nonexistent/marker']) {
      try { writeFileSync(target,'forbidden'); fail('write escaped scope: '+target); }
      catch(error) { if(!['ENOENT','EROFS','EPERM','EACCES'].includes((error as NodeJS.ErrnoException).code??'')) throw error; }
    }
    console.log('BOUNDARY '+attempt);
  }
  if(testCase==='hang' || testCase==='descendant') {
    if(testCase==='descendant') {
      spawn('/node',['-e','setInterval(()=>{},20)'],{stdio:'ignore'}).unref();
    } else await delay(9000);
  }
  if(testCase==='excess-output') {
    process.stdout.write('x'.repeat(16384));
    await delay(100);
  }
  if(testCase==='partial') { process.stdout.write('ACK-'); process.exit(2); }
  const s=lstatSync('/work/task.txt');
  if(!s.isFile() || s.nlink!==1) fail('invalid writable target');
  writeFileSync('/work/task.txt',request.output);
  if(testCase==='lost-ack') process.exit(3);
  console.log('ACK '+attempt);
} else if(action==='test' || action==='review') {
  const request=JSON.parse(readFileSync('/request.json','utf8'));
  const bytes=readFileSync('/snapshot/task.txt');
  if(hash(bytes)!==request.content || (action==='test' && bytes.toString()!==request.output)) fail('pinned input mismatch');
  if(action==='review') {
    for(const target of ['/snapshot/task.txt','/evidence/marker']) {
      try { writeFileSync(target,'forbidden'); fail('review write escaped scope'); }
      catch(error) { if(!['ENOENT','EROFS','EPERM','EACCES'].includes((error as NodeJS.ErrnoException).code??'')) throw error; }
    }
  }
  writeFileSync('/scratch/receipt',request.content,{flag:'wx'});
  if(testCase==='stale-pass') console.log('VERIFIED '+'0'.repeat(64));
  else console.log('VERIFIED '+request.content);
} else fail('invalid action');
