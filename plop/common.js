import { globbySync } from 'globby';
import { readJson } from '../lib/read-json.js';

const defaultPort = nextPort();

export const commonPrompts = [
  {
    type: 'input',
    name: 'name',
    message: 'name',
  },
  {
    type: 'list',
    name: 'cdn',
    message: 'cdn',
    choices: ['https://cdn.skypack.dev'],
  },
  {
    type: 'number',
    name: 'previewPort',
    default: defaultPort,
    message: 'preview port',
  },
  {
    type: 'number',
    name: 'developPort',
    default: ({ previewPort }) => previewPort + 1,
    message: 'development port',
  },
];

export function config() {
  return readJson('config.json');
}

export function usedPorts() {
  const files = globbySync([
    'applications/*/config.json',
    'micro-frontends/*/config.json',
  ]);
  return files.map((file) => readJson(file)).map(({ port }) => port);
}

export function nextPort() {
  let { port } = config();
  port += 10;
  const used = usedPorts();
  while (used.includes(port)) {
    port += 10;
  }
  return port;
}
