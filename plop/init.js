import { readJson } from '../lib/read-json.js';

export default function (plop) {
  const pkg = readJson('package.json');
  const config = readJson('config.json');
  plop.setGenerator('init', {
    description: 'init',
    prompts: [
      {
        type: 'input',
        name: 'name',
        default: pkg.name,
        message: 'name',
      },
      {
        type: 'number',
        name: 'port',
        default: config.port,
        message: 'port',
      },
    ],
    actions: function (data) {
      return [
        {
          type: 'modify',
          path: 'package.json',
          transform: (content, { name }) => {
            const pkg = JSON.parse(content);
            pkg.name = name;
            return JSON.stringify(pkg, null, 2);
          },
        },
        {
          type: 'modify',
          path: 'config.json',
          transform: (content, { port }) => {
            const config = JSON.parse(content);
            config.port = port;
            return JSON.stringify(config, null, 2);
          },
        },
      ];
    },
  });
}
