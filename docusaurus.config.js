// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import lineBreaks from './src/remark/line-breaks.js';
import searchIndex from './src/plugins/search-index.js';
import { links } from './src/links.js';


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
  markdown: { hooks: { onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'throw' } },

  i18n: { defaultLocale: 'ja', locales: ['ja'] },

  customFields: { links },

  stylesheets: [
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: 'anonymous' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500&family=Zen+Maru+Gothic:wght@400;500;700&display=swap',
      rel: 'stylesheet',
    },
  ],

  plugins: [searchIndex],
  clientModules: ['./src/clientModules/linkPreview.js', './src/clientModules/motion.js', './src/clientModules/intro.js'],
  headTags: [{ tagName: 'script', attributes: {}, innerHTML: "document.documentElement.dataset.motion = 'ready'; document.documentElement.dataset.intro = '';" }],

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
      colorMode: { defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: true },
      navbar: {
        title: '',
        logo: { alt: 'Audiorium', src: 'img/logo-ink.svg', className: 'navbar-logo', href: '/docs/getting-started/overview' },
        items: [],
      },
      footer: {
        copyright: '© 2026 とうっふ茶房',
      },
      docs: { sidebar: { hideable: false } },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
    }),
};

export default config;
