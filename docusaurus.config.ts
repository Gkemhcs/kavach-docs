import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kavach Documentation - Enterprise Secret Management Platform',
  tagline: 'Enterprise-grade secret management and synchronization platform with CLI-first design',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.kavach.gkem.cloud',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Gkemhcs', // Usually your GitHub org/user name.
  projectName: 'kavach-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Gkemhcs/kavach-docs/tree/main/',
        },

        theme: {
          customCss: './src/css/custom.css',
        },

        // SEO Plugin Configuration
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },

      

        // Google Tag Manager
        gtag: {
          trackingID: 'G-7J9QZNM2WS', // TODO: Replace with your GA4 tracking ID (e.g., G-ABC123DEF4)
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/kavach-og.png',
    navbar: {
      title: 'Kavach Docs',
      logo: {
        alt: 'Kavach Logo',
        src: 'img/kavach.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/getting-started',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: '/docs/cli/overview',
          label: 'CLI Reference',
          position: 'left',
        },
        {
          to: '/docs/architecture/overview',
          label: 'Architecture',
          position: 'left',
        },
        {
          href: 'https://github.com/Gkemhcs/kavach-cli',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'CLI Reference',
              to: '/docs/cli/overview',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Gkemhcs/kavach-cli',
            },
            {
              label: 'Issues',
              href: 'https://github.com/Gkemhcs/kavach-cli/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/Gkemhcs/kavach-cli/discussions',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Why Kavach',
              to: '/docs/why-kavach',
            },
            {
              label: 'Providers',
              to: '/docs/providers/github',
            },
            {
              label: 'Authorization',
              to: '/docs/authorization/rbac',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kavach. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    
    // SEO and Search Configuration
    algolia: {
      appId: '51DYTU5JI5', // TODO: Replace with your Algolia app ID (e.g., ABCDEFGHIJ)
      apiKey: '67043e540a0b72cc29878f3783585884', // TODO: Replace with your Algolia search API key (e.g., abc123def456...)
      indexName: 'kavach-docs',
      contextualSearch: true,
      searchParameters: {},
      externalUrlRegex: 'external\\.com|domain\\.com',
      replaceSearchResultPathname: {
        from: '/docs/',
        to: '/',
      },
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
