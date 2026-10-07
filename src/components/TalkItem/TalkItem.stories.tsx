import type { Meta, StoryObj } from '@storybook/react-vite';

import { TalkItem } from './TalkItem';

const meta = {
  title: 'Talks/TalkItem',
  component: TalkItem,
  args: {
    headingLevel: 2,
    talk: {
      slug: 'example-talk',
      title: 'An example talk',
      event: 'Example conference',
      location: 'London',
      date: '2026-06',
      summary: 'An example to show how a talk looks in the list',
      video: {
        href: 'https://www.youtube.com/watch?v=example',
        captions: true,
        describedAloud: true,
      },
    },
  },
} satisfies Meta<typeof TalkItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
