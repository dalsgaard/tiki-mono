import { CommonPrompts, nextPort } from './common.js';

export default function (plop) {
  plop.setGenerator('application', {
    description: 'an application',
    prompts: [
      ...CommonPrompts,
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
          base: 'tiki/templates/common/vite',
          templateFiles: 'tiki/templates/common/vite/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'applications/{{dashCase name}}',
          base: 'tiki/templates/application/vite',
          templateFiles: 'tiki/templates/application/vite/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'applications/{{dashCase name}}',
          base: 'tiki/templates/common/{{framework}}',
          templateFiles: 'tiki/templates/common/{{framework}}/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'applications/{{dashCase name}}',
          base: 'tiki/templates/application/{{framework}}',
          templateFiles: 'tiki/templates/application/{{framework}}/**/*.hbs',
        },
      ];
    },
  });
}
