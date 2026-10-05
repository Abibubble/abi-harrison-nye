import type { Meta, StoryObj } from '@storybook/react-vite';

import { PrintOptions } from './PrintOptions';

const meta = {
  title: 'CV/PrintOptions',
  component: PrintOptions,
} satisfies Meta<typeof PrintOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Choose a layout, then use the button or the browser’s print preview to see it. */
export const Default: Story = {};
