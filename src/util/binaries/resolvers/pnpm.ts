import parseArgs from 'minimist';
import type { Resolver } from '../types.js';

// https://pnpm.io/cli/add

const commands = [
  'add',
  'i',
  'install',
  'up',
  'update',
  'upgrade',
  'remove',
  'rm',
  'uninstall',
  'un',
  'link',
  'ln',
  'unlink',
  'import',
  'rebuild',
  'rb',
  'prune',
  'fetch',
  'install-test',
  'it',
  'patch',
  'patch-commit',
  'audit',
  'list',
  'ls',
  'outdated',
  'why',
  'test',
  't',
  'tst',
];

export const resolve: Resolver = (binary, args, { manifest }) => {
  const scripts = manifest.scripts ? Object.keys(manifest.scripts) : [];
  const parsed = parseArgs(args, {});
  const [command, result] = parsed._;
  if (scripts.includes(command) || commands.includes(command)) return [];
  if (command === 'run' && scripts.includes(result)) return [];
  if (command === 'exec' || command === 'run') return [result];
  return command ? [command] : [];
};