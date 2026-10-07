import type { Meta, StoryObj } from '@storybook/react-vite';

import { PrintOptions } from './PrintOptions';

const meta = {
  title: 'CV/PrintOptions',
  component: PrintOptions,
} satisfies Meta<typeof PrintOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
