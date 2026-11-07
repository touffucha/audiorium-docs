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
        'getting-started/update',
      ],
    },
    {
      type: 'category',
      label: 'セットアップ',
      collapsible: false,
      items: [
        'guides/speaker-position',
        'guides/add-speaker',
        'guides/edit-presets',
        'guides/console-appearance',
        'console/permissions',
        'guides/lights',
        'guides/entry-notice',
        'integrations/video-players',
        'integrations/audiolink',
        'integrations/ltcgi',
        'help/uninstall',
      ],
    },
    {
      type: 'category',
      label: 'リファレンス',
      collapsible: false,
      items: [
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
          items: ['console/operation'],
        },
      ],
    },
    {
      type: 'category',
      label: '困ったとき',
      collapsible: false,
      items: ['help/troubleshooting'],
    },
    'changelog',
  ],
};

export default sidebars;
