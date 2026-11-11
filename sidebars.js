// @ts-check
import { links } from './src/links.js';

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
        'getting-started/sample-scene',
      ],
    },
    {
      type: 'category',
      label: 'セットアップ',
      collapsible: false,
      items: [
        'setup/add-audiorium',
        'setup/video-player',
        'setup/external',
        'setup/speakers',
        'setup/sound-mode',
        'setup/console',
        'setup/visual-effects',
        'setup/advanced',
        'help/uninstall',
      ],
    },
    {
      type: 'category',
      label: '照明システム',
      collapsible: false,
      items: ['setup/lights', 'setup/entry-notice'],
    },
    {
      type: 'category',
      label: '連携',
      collapsible: false,
      items: ['integrations/audiolink', 'integrations/ltcgi'],
    },
    {
      type: 'category',
      label: 'リファレンス',
      collapsible: false,
      items: ['console/operation'],
    },
    {
      type: 'category',
      label: '困ったとき',
      collapsible: false,
      items: ['help/troubleshooting'],
    },
    'changelog',
    ...(links.booth ? [{ type: 'link', label: 'BOOTH', href: links.booth }] : []),
    { type: 'link', label: '公開ワールド', href: links.world },
  ],
};

export default sidebars;
