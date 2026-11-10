// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import lineBreaks from './src/remark/line-breaks.js';

const links = {
  booth: '',
  world: 'https://vrchat.com/home/launch?worldId=wrld_3b124d05-d1c4-4ae3-a216-0b58c5f82ab9',
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Audiorium',
  tagline: 'VRChat のワールドに設置する音響・演出コンソール',
  favicon: 'img/mark-ink.svg',

  url: 'https://touffucha.github.io',
  baseUrl: '/audiorium-docs/',
  organizationName: 'touffucha',
  projectName: 'audiorium-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: { hooks: { onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'warn' } },

  i18n: { defaultLocale: 'ja', locales: ['ja'] },

  customFields: { links },

  stylesheets: [
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: 'anonymous' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap',
      rel: 'stylesheet',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          remarkPlugins: [lineBreaks],
          showLastUpdateTime: false,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: { defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false },
      navbar: {
        title: '',
        logo: { alt: 'Audiorium', src: 'img/logo-ink.svg', className: 'navbar-logo', href: '/docs/getting-started/overview' },
        items: [
          { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'ドキュメント' },
          ...(links.booth ? [{ href: links.booth, label: 'BOOTH', position: 'right' }] : []),
          { href: links.world, label: '公開ワールド', position: 'right' },
        ],
      },
      footer: {
        links: [
          {
            title: 'ドキュメント',
            items: [
              { label: 'はじめる', to: '/docs/getting-started/overview' },
              { label: 'クイックスタート', to: '/docs/getting-started/quick-start' },
              { label: 'トラブルシューティング', to: '/docs/help/troubleshooting' },
            ],
          },
          {
            title: 'リンク',
            items: [
              ...(links.booth ? [{ label: 'BOOTH', href: links.booth }] : []),
              { label: '公開ワールド', href: links.world },
            ],
          },
        ],
        copyright: '© 2026 とうっふ茶房',
      },
      docs: { sidebar: { hideable: false } },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
    }),
};

export default config;
