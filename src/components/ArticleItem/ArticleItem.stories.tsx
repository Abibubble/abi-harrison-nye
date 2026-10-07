import type { Meta, StoryObj } from '@storybook/react-vite';

import { ArticleItem } from './ArticleItem';

const meta = {
  title: 'Content/ArticleItem',
  component: ArticleItem,
  args: {
    headingLevel: 2,
    article: {
      title: 'An example article',
      publication: 'Example blog',
      date: '2026-04-03',
      summary: 'An example to show how an article looks; real articles are added in articles.ts',
      href: 'https://example.com',
    },
  },
} satisfies Meta<typeof ArticleItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
