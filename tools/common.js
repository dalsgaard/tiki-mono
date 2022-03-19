import { listDir } from '../lib/list-dir.js';

export async function makeCommands(command) {
  return [
    ...(await listDir('applications')).map((name) => `applications/${name}`),
    ...(await listDir('micro-frontends')).map(
      (name) => `micro-frontends/${name}`
    ),
  ].map((cwd) => ({
    command,
    cwd,
  }));
}
