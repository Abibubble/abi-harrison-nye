import type { Meta, StoryObj } from '@storybook/react-vite';

import { SiteHeader } from './SiteHeader';

const meta = {
  title: 'Layout/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Narrow the canvas below 768px to see the Menu button. */
export const OnTheHomePage: Story = {};

export const OnAnotherPage: Story = {
  parameters: { router: { path: '/work' } },
};
