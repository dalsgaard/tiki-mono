import { CommonPrompts, JsxFrameworks, nextPort } from './common.js';

export default function (plop) {
  plop.setGenerator('micro-frontend', {
    description: 'a micro frontend',
    prompts: [
      ...CommonPrompts,
      {
        type: 'list',
        name: 'framework',
        message: 'framework to use',
        choices: ['lit', 'preact'],
      },
    ],
    actions: function ({ framework }) {
      return [
        {
          type: 'addMany',
          destination: 'micro-frontends/{{dashCase name}}',
          base: 'templates/common/vite',
          templateFiles: 'templates/common/vite/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'micro-frontends/{{dashCase name}}',
          base: 'templates/common/{{framework}}',
          templateFiles: 'templates/common/{{framework}}/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'micro-frontends/{{dashCase name}}',
          base: 'templates/micro-frontend/vite',
          templateFiles: 'templates/micro-frontend/vite/**/*.hbs',
        },
        {
          type: 'addMany',
          destination: 'micro-frontends/{{dashCase name}}',
          base: 'templates/micro-frontend/{{framework}}',
          templateFiles: 'templates/micro-frontend/{{framework}}/**/*.hbs',
        },
        ...componentActions(framework),
        {
          type: 'add',
          path: 'micro-frontends/{{dashCase name}}/src/{{dashCase name}}.css',
          templateFile: 'templates/style/{{framework}}/style.css.hbs',
        },
      ];
    },
  });
}

function componentActions(framework) {
  const ext = JsxFrameworks.includes(framework) ? 'tsx' : 'ts';
  return [
    {
      type: 'add',
      path: `micro-frontends/{{dashCase name}}/src/{{dashCase name}}.${ext}`,
      templateFile: `templates/component/{{framework}}/component.${ext}.hbs`,
    },
  ];
}
