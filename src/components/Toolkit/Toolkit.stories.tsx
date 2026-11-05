import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ToolkitFolder, ToolkitItem } from '../../content/toolkit';
import { ToolkitPage } from './ToolkitPage';

const ITEM: ToolkitItem = {
  slug: 'dark-mode',
  title: 'Dark mode',
  description: 'A highlight about dark mode, exploring its accessibility pros and cons.',
  updated: '2026-06-01',
  files: [
    { path: 'inclusion-toolkit/files/highlights/dark-mode.pdf', size: '120KB' },
    { path: 'inclusion-toolkit/files/highlights/dark-mode.docx', size: '45KB' },
  ],
};

const HIGHLIGHTS: ToolkitFolder = {
  slug: 'highlights',
  title: 'Highlights',
  description: 'Posts and other resources that highlight topics related to accessibility.',
  folders: [],
  items: [ITEM],
};

const TRAIL = [{ title: 'Inclusion Toolkit', path: '/inclusion-toolkit' }];

const meta = {
  title: 'Toolkit/ToolkitPage',
  component: ToolkitPage,
  args: {
    data: {
      kind: 'home',
      toolkit: {
        slug: '',
        title: 'Inclusion Toolkit',
        description: '',
        folders: [HIGHLIGHTS],
        items: [],
      },
      search: [
        {
          kind: 'item',
          title: 'Dark mode',
          description: ITEM.description,
          path: '/inclusion-toolkit/highlights/dark-mode',
        },
      ],
    },
  },
} satisfies Meta<typeof ToolkitPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainPage: Story = {};

export const Folder: Story = {
  args: { data: { kind: 'folder', folder: HIGHLIGHTS, slugs: ['highlights'], trail: TRAIL } },
};

export const Resource: Story = {
  args: {
    data: {
      kind: 'item',
      item: ITEM,
      slugs: ['highlights', 'dark-mode'],
      trail: [...TRAIL, { title: 'Highlights', path: '/inclusion-toolkit/highlights' }],
      textHtml:
        '<h3>What dark mode is</h3><p>Light text on a dark background.</p><h3>Pros and cons</h3><ul><li>Less glare for some people</li><li>Harder to read for people with astigmatism</li></ul>',
    },
  },
};
