import { concurrently } from 'concurrently';
import { makeCommands } from './common.js';

async function main(names) {
  const commands = await makeCommands('pnpm install', names);
  if (commands.length) {
    console.log('install packages for');
    commands.forEach(({ cwd }) => console.log(`- ${cwd}`));
    concurrently(commands);
  } else {
    console.log('no items to install packages for');
  }
}

const names = process.argv.slice(2);
main(names);
