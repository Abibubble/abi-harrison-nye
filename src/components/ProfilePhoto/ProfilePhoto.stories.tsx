import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProfilePhoto } from './ProfilePhoto';

const meta = {
  title: 'Content/ProfilePhoto',
  component: ProfilePhoto,
  args: { photo: undefined },
} satisfies Meta<typeof ProfilePhoto>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };
