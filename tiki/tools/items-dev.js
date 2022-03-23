import { concurrently } from 'concurrently';
import { readJson } from '../lib/read-json.js';
import { makeCommands } from './common.js';

async function main(names) {
  const commands = await makeCommands('pnpm run dev', names);
  console.log('serve development for');
  commands.forEach(({ cwd }) => {
    const { developPort } = readJson(`${cwd}/config.json`);
    const url = `http://localhost:${developPort}`;
    console.log(`- ${cwd} on ${url}`);
  });
  concurrently(commands);
}

const names = process.argv.slice(2);
main(names);
