import { concurrently } from 'concurrently';
import { readJson } from '../lib/read-json.js';
import { makeCommands } from './common.js';

async function main(names) {
  const commands = await makeCommands('pnpm run preview:serve', names);
  console.log('serve preview for');
  commands.forEach(({ cwd }) => {
    const { previewPort } = readJson(`${cwd}/config.json`);
    console.log(`- ${cwd} on http://localhost:${previewPort}`);
  });
  concurrently(commands);
}

const names = process.argv.slice(2);
main(names);
