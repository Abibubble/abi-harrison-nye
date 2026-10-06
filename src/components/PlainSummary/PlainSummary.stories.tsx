import type { Meta, StoryObj } from '@storybook/react-vite';

import { PlainSummary } from './PlainSummary';

const meta = {
  title: 'Content/PlainSummary',
  component: PlainSummary,
} satisfies Meta<typeof PlainSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
