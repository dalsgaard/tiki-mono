import { concurrently } from 'concurrently';
import { makeCommands } from './common.js';

async function main(names) {
  const commands = await makeCommands('pnpm run preview:build', names);
  console.log('build preview for');
  commands.forEach(({ cwd }) => console.log(`- ${cwd}`));
  concurrently(commands);
}

const names = process.argv.slice(2);
main(names);
