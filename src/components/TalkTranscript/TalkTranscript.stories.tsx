import type { Meta, StoryObj } from '@storybook/react-vite';

import { renderTranscriptPage } from '../../content/transcripts';
import { TalkTranscript } from './TalkTranscript';

const EXAMPLE = renderTranscriptPage(`### Introduction

On screen: the title slide, "An example talk", with a purple background

Hello, this is an example transcript to show how a real one looks on its page

### A slide with code

On screen: a code example

\`\`\`ts
const accessible = true;
\`\`\`

The code shows a single line, setting accessible to true

### Questions

Thanks for listening. Any questions?
`);

const meta = {
  title: 'Talks/TalkTranscript',
  component: TalkTranscript,
  parameters: { router: { path: '/talks/example-talk/transcript' } },
  args: {
    talk: {
      slug: 'example-talk',
      title: 'An example talk',
      event: 'Example conference',
      location: 'London',
      date: '2026-06-12',
      summary: 'An example to show how a transcript’s page looks',
    },
    transcriptHtml: EXAMPLE.html,
    sections: EXAMPLE.sections,
  },
} satisfies Meta<typeof TalkTranscript>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
