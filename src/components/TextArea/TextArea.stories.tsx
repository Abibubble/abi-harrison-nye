import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextArea } from './TextArea';

const meta = {
  title: 'Forms/TextArea',
  component: TextArea,
  args: { label: 'Your message' },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAHint: Story = {
  args: { hint: 'Tell me what you’d like to talk about. There’s no word limit.' },
};

export const WithAnError: Story = {
  args: { error: 'Enter a message' },
};
