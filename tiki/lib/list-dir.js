import { readdirSync } from 'fs';
import { readdir } from 'fs/promises';

export async function listDir(path) {
  try {
    return await readdir(path);
  } catch {
    return [];
  }
}

export function listDirSync(path) {
  try {
    return readdirSync(path);
  } catch {
    return [];
  }
}
