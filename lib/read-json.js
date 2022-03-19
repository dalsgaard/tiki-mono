import { readFileSync } from 'fs';

export function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
  } catch {
    return undefined;
  }
}
