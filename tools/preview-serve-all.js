import { concurrently } from 'concurrently';
import { readJson } from '../lib/read-json.js';
import { makeCommands } from './common.js';

async function previewServeAll() {
  const commands = await makeCommands('pnpm run preview:serve');
  console.log('serve preview for');
  commands.forEach(({ cwd }) => {
    const { port } = readJson(`${cwd}/config.json`);
    console.log(`- ${cwd} on http://localhost:${port}`);
  });
  concurrently(commands);
}

previewServeAll();
