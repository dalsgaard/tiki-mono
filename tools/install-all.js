import { concurrently } from 'concurrently';
import { makeCommands } from './common.js';

async function installAll() {
  const commands = await makeCommands('pnpm install');
  console.log('install packages for');
  commands.forEach(({ cwd }) => console.log(`- ${cwd}`));
  concurrently(commands);
}

installAll();
