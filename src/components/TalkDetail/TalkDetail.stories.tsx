import type { Meta, StoryObj } from '@storybook/react-vite';

import { renderTranscript } from '../../content/transcripts';
import { TalkDetail } from './TalkDetail';

const EXAMPLE_TRANSCRIPT = renderTranscript(`### Introduction

On screen: the title slide, "An example talk", with a purple background.

Hello. This is an example transcript, to show how a real one looks on the page.

### A slide with code

On screen: a code example.

\`\`\`ts
const accessible = true;
\`\`\`

The code shows a single line, setting accessible to true.
`);

const meta = {
  title: 'Talks/TalkDetail',
  component: TalkDetail,
  parameters: { router: { path: '/talks/example-talk' } },
  args: {
    talk: {
      slug: 'example-talk',
      title: 'An example talk',
      event: 'Example conference',
      location: 'London',
      date: '2026-06-12',
      summary: 'An example to show how a talk’s page looks. Real talks are added in talks.ts.',
      video: {
        href: 'https://www.youtube.com/watch?v=example',
        captions: false,
        describedAloud: false,
      },
      slidesHref: 'https://example.com/slides',
    },
    transcriptHtml: EXAMPLE_TRANSCRIPT,
  },
} satisfies Meta<typeof TalkDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A video without captions yet, pointing to the transcript instead. */
export const WithoutCaptions: Story = {};

export const WithCaptions: Story = {
  args: {
    talk: {
      ...meta.args.talk,
      video: {
        href: 'https://www.youtube.com/watch?v=example',
        captions: true,
        describedAloud: true,
      },
    },
  },
};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
