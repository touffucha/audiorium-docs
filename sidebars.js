// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'はじめる',
      collapsible: false,
      items: [
        'getting-started/overview',
        'getting-started/requirements',
        'getting-started/install',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: '困ったとき',
      collapsible: false,
      items: ['help/troubleshooting', 'help/uninstall'],
    },
    'changelog',
  ],
};

export default sidebars;
