import type { Meta, StoryObj } from '@storybook/react-vite';

import { TalkDetail } from './TalkDetail';

const meta = {
  title: 'Talks/TalkDetail',
  component: TalkDetail,
  parameters: { router: { path: '/talks/example-talk' } },
  args: {
    talk: {
      slug: 'example-talk',
      title: 'An example talk',
      event: 'Example conference',
      date: '2026-06-12',
      summary: 'An example to show how a talk’s page looks; real talks are added in talks.json',
      video: {
        href: 'https://www.youtube.com/watch?v=example',
        captions: 'none',
        describedAloud: false,
      },
      slidesHref: 'https://example.com/slides',
    },
  },
} satisfies Meta<typeof TalkDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutCaptions: Story = {};

export const WithCaptions: Story = {
  args: {
    talk: {
      ...meta.args.talk,
      video: {
        href: 'https://www.youtube.com/watch?v=example',
        captions: 'accurate',
        describedAloud: true,
      },
    },
  },
};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
