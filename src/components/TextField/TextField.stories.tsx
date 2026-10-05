import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextField } from './TextField';

const meta = {
  title: 'Forms/TextField',
  component: TextField,
  args: { label: 'Your name', autoComplete: 'name' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAHint: Story = {
  args: {
    label: 'Your email address',
    type: 'email',
    autoComplete: 'email',
    hint: 'So I can reply to you. I won’t share it with anyone.',
  },
};

export const Optional: Story = {
  args: { label: 'Company', autoComplete: 'organization', optional: true },
};

export const WithAnError: Story = {
  args: {
    label: 'Your email address',
    type: 'email',
    autoComplete: 'email',
    hint: 'So I can reply to you. I won’t share it with anyone.',
    error: 'Enter an email address in the correct format, like name@example.com',
    defaultValue: 'abi@example',
  },
};

export const WithAnErrorInTheDarkTheme: Story = {
  ...WithAnError,
  globals: { theme: 'dark' },
};

export const WithAnErrorInTheCreamTheme: Story = {
  ...WithAnError,
  globals: { theme: 'cream' },
};
