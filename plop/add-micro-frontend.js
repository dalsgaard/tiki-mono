import { listDirSync } from '../lib/list-dir.js';
import { readJson } from '../lib/read-json.js';

export default function (plop) {
  const applications = listDirSync('applications').map(
    (name) => `applications/${name}`
  );
  const microFrontends = listDirSync('micro-frontends');
  plop.setGenerator('add-micro-frontend', {
    description: 'add a micro frontend',
    prompts: [
      {
        type: 'list',
        name: 'host',
        message: 'host',
        choices: applications,
      },
      {
        type: 'list',
        name: 'place',
        message: 'place',
        choices: ['internal', 'external'],
      },
      {
        type: 'list',
        name: 'name',
        message: 'name',
        choices: microFrontends,
        when: ({ place }) => place === 'internal',
      },
      {
        type: 'input',
        name: 'name',
        message: 'name',
        when: ({ place }) => place === 'external',
      },
      {
        type: 'input',
        name: 'previewUrl',
        message: 'preview url',
      },
      {
        type: 'input',
        name: 'developUrl',
        message: 'develop url',
      },
      {
        type: 'input',
        name: 'style',
        message: 'style',
        when: ({ developUrl }) => !developUrl,
      },
      {
        type: 'input',
        name: 'content',
        message: 'content',
        when: ({ developUrl }) => !developUrl,
      },
    ],
    actions: function (data) {
      const { framework } = readJson(`${data.host}/config.json`);
      const jsx = ['preact'].includes(framework);
      return [
        ...(jsx
          ? [
              {
                type: 'modify',
                path: '{{host}}/src/micro-frontends.d.ts',
                transform: (content, { name }) => {
                  return content.replace(
                    /IntrinsicElements\s*\{([^\}]*)\}/,
                    (_, content) => {
                      const tags = content.trim().split(/;\s*/).filter(Boolean);
                      tags.push(`'${name}': any`);
                      const lines = tags.map((tag) => `    ${tag};\n`);
                      return `IntrinsicElements {\n${lines.join('')}  }`;
                    }
                  );
                },
              },
            ]
          : []),
        {
          type: 'modify',
          path: '{{host}}/micro-frontends.json',
          transform: (content, { name }) => {
            const items = JSON.parse(content);
            items.push({
              name,
              ...createPreview(data),
              ...createDevelop(data),
            });
            return JSON.stringify(items, null, 2);
          },
        },
      ];
    },
  });
}

function getPort(name) {
  const config = readJson(`micro-frontends/${name}/config.json`);
  return config?.previewPort;
}

function createPreview({ previewUrl, name, place }) {
  if (previewUrl) {
    return { preview: previewUrl };
  } else {
    const url =
      place === 'internal' ? `http://localhost:${getPort(name)}/index.js` : '';
    return { preview: url };
  }
}

function createDevelop({ developUrl: url, style: rawStyle, content }) {
  const style = rawStyle && createStyle(rawStyle);
  if (style || url || content) {
    return {
      develop: {
        ...(url ? { url } : {}),
        ...(style ? { style } : {}),
        ...(content ? { content } : {}),
      },
    };
  } else {
    return {};
  }
}

function createStyle(style) {
  const pairs = style
    .split(/\s*[;,]\s*/)
    .map((s) => (s ? s.split(/\s*:\s*/) : undefined))
    .filter(Boolean);
  return pairs.length ? Object.fromEntries(pairs) : undefined;
}
