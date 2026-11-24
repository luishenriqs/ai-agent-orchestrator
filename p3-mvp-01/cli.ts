import { readFileSync, statSync } from 'node:fs';
import { isAbsolute } from 'node:path';
import { requireThat } from './common.ts';
import { initialize, State } from './state.ts';
import { execute, handoff, recover } from './workflow.ts';

process.umask(0o077);
const [command,root,...args]=process.argv.slice(2);

async function main() {
  const arities:Record<string,number>={init:1,register:1,approve:2,run:0,revoke:0,cancel:0,status:0,recover:0,handoff:0};
  requireThat(Object.hasOwn(arities,command) && args.length===arities[command] && typeof root==='string' && isAbsolute(root),
    'usage: cli.ts {init|register|approve|run|revoke|cancel|status|recover|handoff} ABSOLUTE_ROOT [arguments]');
  if(command==='init') return initialize(root,args[0]);
  const state=new State(root);
  try {
    switch(command) {
      case 'register': {
        const stat=statSync(args[0]);
        requireThat(stat.isFile() && stat.size<=8192,'invalid specification input');
        return state.register(JSON.parse(readFileSync(args[0],'utf8')));
      }
      case 'approve': return state.approve(args[0],Number(args[1]));
      case 'run': return await execute(state);
      case 'revoke': case 'cancel': return state.revoke();
      case 'status': return state.status();
      case 'recover': return recover(state);
      case 'handoff': return handoff(state);
    }
  } finally { state.close(); }
}

try { console.log(JSON.stringify(await main())); }
catch(error) { console.error(String(error)); process.exitCode=1; }
