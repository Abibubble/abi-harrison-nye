import type { Meta, StoryObj } from '@storybook/react-vite';

import { PrintButton } from './PrintButton';

const meta = {
  title: 'CV/PrintButton',
  component: PrintButton,
} satisfies Meta<typeof PrintButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
