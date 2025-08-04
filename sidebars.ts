import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  docsSidebar: [
    'why-kavach',
    'getting-started',
    {
      type: 'category',
      label: 'CLI Reference',
      link: {
        type: 'doc',
        id: 'cli/overview',
      },
      items: [
        'cli/overview',
        'cli/installation',
        'cli/authentication',
        {
          type: 'category',
          label: 'Commands',
          items: [
            'cli/commands/auth',
            'cli/commands/org',
            'cli/commands/group',
            'cli/commands/env',
            'cli/commands/secret',
            'cli/commands/provider',
            'cli/commands/user-group',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      items: [
        'providers/gcp',
        'providers/azure',
        'providers/github'
      ],
    },
    {
      type: 'category',
      label: 'Authorization',
      link: {
        type: 'doc',
        id: 'authorization/rbac',
      },
      items: [
        'authorization/rbac',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      link: {
        type: 'doc',
        id: 'architecture/overview',
      },
      items: [
        'architecture/overview',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/quickstart',
      ],
    },
  ],
};

export default sidebars;
