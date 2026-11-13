import type { Meta, StoryObj } from '@storybook/react-vite';

import { renderSlides } from '../../content/transcripts';
import { TalkSlides } from './TalkSlides';

// The first two slides of a real talk, so the pictures show
const SLIDES = renderSlides(`### Slide 1

The title slide, on giffgaff’s bright green. It reads “Moving accessibility from debt to done at giffgaff”, with the giffgaff logo and my name, Abi Harrison-Nye.

### Slide 2

“£446 Billion. The Purple Pound (UK). November 2025.”
`);

const meta = {
  title: 'Talks/TalkSlides',
  component: TalkSlides,
  parameters: { router: { path: '/talks/moving-accessibility-from-debt-to-done/slides' } },
  args: {
    talk: {
      slug: 'moving-accessibility-from-debt-to-done',
      title: 'Moving accessibility from debt to done',
      event: 'Example conference',
      date: '2026-06-12',
      summary: 'An example to show how a talk’s Slides page looks',
      slidesPage: true,
    },
    slides: SLIDES,
  },
} satisfies Meta<typeof TalkSlides>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
