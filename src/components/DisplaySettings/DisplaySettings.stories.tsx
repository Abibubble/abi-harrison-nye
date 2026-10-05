import type { Meta, StoryObj } from '@storybook/react-vite';

import { DisplaySettings } from './DisplaySettings';

const meta = {
  title: 'Settings/DisplaySettings',
  component: DisplaySettings,
} satisfies Meta<typeof DisplaySettings>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * These are the real settings, so changes apply to Storybook too and are saved in this browser. Use
 * Reset to defaults when you're done.
 */
export const Default: Story = {};
