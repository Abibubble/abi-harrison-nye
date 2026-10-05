import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'Settings/ThemeSwitcher',
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Uses the real settings, so choosing a theme here changes Storybook’s theme too. */
export const Default: Story = {};
