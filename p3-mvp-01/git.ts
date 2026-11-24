import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, mkdirSync, readFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { digest, durableCreate, requireThat } from './common.ts';

export const GIT = '/usr/bin/git';
export const GIT_DIGEST = '07997209f4513fdee3e1eb151b1c37d56cfe37f9915d331ec37d688c6b9d3ce9';
export function verifyGit() {
  requireThat(digest(readFileSync(GIT))===GIT_DIGEST,'pinned Git changed');
}

/** Trusted preparation only. The worker never receives Git metadata writable. */
export function git(cwd: string, args: string[]) {
  const result = spawnSync(GIT, [
    '-c','core.hooksPath=/dev/null','-c','protocol.allow=never',
    '-c','core.fsmonitor=false','-c','core.attributesFile=/dev/null',
    '-C',cwd,...args,
  ], {
    env: { PATH:'/usr/bin:/bin', HOME:'/nonexistent', GIT_CONFIG_NOSYSTEM:'1',
      GIT_CONFIG_GLOBAL:'/dev/null', GIT_ATTR_NOSYSTEM:'1', GIT_TERMINAL_PROMPT:'0', LC_ALL:'C' },
    timeout: 4000, encoding:'utf8', maxBuffer:65536,
  });
  requireThat(result.status === 0 && !result.error, 'fixture Git effect failed: '+(result.stderr ?? '').slice(0,500));
  return result.stdout.trim();
}

export function seedFixture(root: string) {
  verifyGit();
  const path = join(root,'fixture');
  mkdirSync(path,{mode:0o700});
  git(path,['init','--initial-branch=main','--template=']);
  durableCreate(join(path,'task.txt'),'fixture baseline\n');
  git(path,['add','--','task.txt']);
  git(path,['-c','user.name=P3 Fixture','-c','user.email=p3@example.invalid','commit','--no-gpg-sign','-m','Offline baseline']);
  return git(path,['rev-parse','HEAD']);
}

export function fixtureState(root: string, baseline: string) {
  const path = join(root,'fixture');
  requireThat(realpathSync(path) === path && lstatSync(join(path,'.git')).isDirectory(), 'fixture identity changed');
  requireThat(git(path,['remote']) === '', 'fixture must have no remote');
  requireThat(git(path,['symbolic-ref','HEAD']) === 'refs/heads/main', 'fixture main branch changed');
  requireThat(git(path,['rev-parse','HEAD']) === baseline, 'fixture baseline changed');
  requireThat(git(path,['--no-optional-locks','status','--porcelain','--untracked-files=all']) === '', 'fixture main tree changed');
  return path;
}

export function prepareTree(root: string, baseline: string, attempt: string, target: string) {
  const fixture = fixtureState(root,baseline);
  requireThat(!existsSync(target), 'worktree target already exists');
  const branch = 'p3/task-'+attempt;
  git(fixture,['worktree','add','-b',branch,target,baseline]);
  requireThat(git(target,['rev-parse','HEAD']) === baseline, 'prepared worktree revision mismatch');
  return { branch, target, baseline };
}
