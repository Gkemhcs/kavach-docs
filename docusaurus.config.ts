import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Kavach',
  tagline: 'Enterprise-grade secret management and synchronization platform',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://Gkemhcs.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/kavach-docs/',

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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/kavach.png',
    navbar: {
      title: 'Kavach',
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
          href: 'https://github.com/Gkemhcs/kavach-docs',
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
                label: 'CLI Reference',
                to: '/docs/cli/overview',
              },
            ],
          },
          {
            title: 'Community',
            items: [
                          {
              label: 'GitHub',
              href: 'https://github.com/Gkemhcs/kavach-docs',
            },
                              {
                  label: 'Issues',
                  href: 'https://github.com/Gkemhcs/kavach-docs/issues',
                },
                {
                  label: 'Discussions',
                  href: 'https://github.com/Gkemhcs/kavach-docs/discussions',
                },
            ],
          },
          {
            title: 'Resources',
            items: [

              {
                label: 'Architecture',
                to: '/docs/architecture/overview',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture/overview',
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
  } satisfies Preset.ThemeConfig,
};

export default config;
