import { concurrently } from 'concurrently';
import { makeCommands } from './common.js';

async function previewBuildAll() {
  const commands = await makeCommands('pnpm run preview:build');
  console.log('build preview for');
  commands.forEach(({ cwd }) => console.log(`- ${cwd}`));
  concurrently(commands);
}

previewBuildAll();
