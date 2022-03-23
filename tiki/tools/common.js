import { listDir } from '../lib/list-dir.js';

export async function makeCommands(command, names) {
  return [
    ...(await listDir('applications'))
      .filter((name) => inList(name, names))
      .map((name) => `applications/${name}`),
    ...(await listDir('micro-frontends'))
      .filter((name) => inList(name, names))
      .map((name) => `micro-frontends/${name}`),
  ].map((cwd) => ({
    command,
    cwd,
  }));
}

function inList(name, names) {
  return names.length ? names.includes(name) : true;
}
