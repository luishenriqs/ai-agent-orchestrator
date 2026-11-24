import { createHash, randomUUID } from 'node:crypto';
import { closeSync, constants, fstatSync, fsyncSync, lstatSync, openSync, readFileSync, readlinkSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative } from 'node:path';

export const digest = (data: string | Buffer) => createHash('sha256').update(data).digest('hex');
export const uid = () => process.getuid!();
export const id = randomUUID;

export function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function fsync(path: string) {
  const fd = openSync(path, 'r');
  try { fsyncSync(fd); } finally { closeSync(fd); }
}

export function durableCreate(path: string, data: string | Buffer) {
  const fd = openSync(path, 'wx', 0o600);
  try { writeFileSync(fd, data); fsyncSync(fd); } finally { closeSync(fd); }
  fsync(dirname(path));
}

export function privateDirectory(path: string): string {
  requireThat(isAbsolute(path) && realpathSync(path) === path, 'absolute canonical directory required');
  const s = lstatSync(path);
  requireThat(s.isDirectory() && s.uid === uid() && (s.mode & 0o777) === 0o700, 'private owner-only directory required');
  return path;
}

export function beneath(parent: string, path: string) {
  const rel = relative(parent, path);
  return rel !== '' && rel !== '..' && !rel.startsWith('../') && !isAbsolute(rel);
}

export function readPrivate(path: string, maxBytes = 65536) {
  const fd=openSync(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
  try {
    const s=fstatSync(fd);
    requireThat(s.isFile() && s.nlink===1 && s.uid===uid() && s.size<=maxBytes,'invalid private file');
    const bytes=readFileSync(fd);
    requireThat(bytes.length<=maxBytes,'private file exceeded limit during read');
    return bytes;
  } finally { closeSync(fd); }
}

export function object(value: unknown): Record<string, unknown> {
  requireThat(value !== null && typeof value === 'object' && !Array.isArray(value), 'object required');
  return value as Record<string, unknown>;
}

export function selfScope() {
  return {
    boot: readFileSync('/proc/sys/kernel/random/boot_id','utf8').trim(),
    pidNamespace: namespace(process.pid),
  };
}

export function namespace(pid: number): string {
  // procfs's ns symlink identifies the PID namespace of a live task.
  return readlinkSync(join('/proc',String(pid),'ns','pid'));
}

export function startTime(pid: number): string | null {
  try {
    const value = readFileSync(join('/proc',String(pid),'stat'),'utf8');
    const fields = value.slice(value.lastIndexOf(') ')+2).split(' ');
    if (fields[0] === 'Z' || fields[0] === 'X') return null;
    requireThat(/^\d+$/.test(fields[19]), 'ambiguous process identity');
    return fields[19];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

// Test faults use only the current process. They cannot signal another task.
export function fault(name: string) {
  if (process.env.P3_TEST_FAULT === name) process.kill(process.pid,'SIGKILL');
}
