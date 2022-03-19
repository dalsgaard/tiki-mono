import { commonPrompts, nextPort } from './common.js';

export default function (plop) {
  plop.setGenerator('application', {
    description: 'an application',
    prompts: [
      ...commonPrompts,
      {
        type: 'list',
        name: 'framework',
        message: 'framework',
        choices: ['preact'],
      },
    ],
    actions: function (data) {
      return [
        {
          type: 'addMany',
          destination: 'applications/{{dashCase name}}',
          base: 'templates/common/vite',
          templateFiles: 'templates/common/vite/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'applications/{{dashCase name}}',
          base: 'templates/application/vite',
          templateFiles: 'templates/application/vite/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'applications/{{dashCase name}}',
          base: 'templates/common/{{framework}}',
          templateFiles: 'templates/common/{{framework}}/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'applications/{{dashCase name}}',
          base: 'templates/application/{{framework}}',
          templateFiles: 'templates/application/{{framework}}/**/*.hbs',
        },
      ];
    },
  });
}
