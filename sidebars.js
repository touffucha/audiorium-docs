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
      label: 'Audiorium Studio',
      collapsible: false,
      items: ['studio/overview', 'studio/speakers', 'studio/console', 'studio/sound-mode', 'studio/effects', 'studio/lights', 'studio/check'],
    },
    {
      type: 'category',
      label: 'コンソール',
      collapsible: false,
      items: ['console/operation', 'console/permissions'],
    },
    {
      type: 'category',
      label: '連携',
      collapsible: false,
      items: ['integrations/video-players', 'integrations/audiolink', 'integrations/ltcgi'],
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
