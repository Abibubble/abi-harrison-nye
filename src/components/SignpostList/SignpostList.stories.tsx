import type { Meta, StoryObj } from '@storybook/react-vite';

import { HOME_SIGNPOSTS } from '../../content/home';
import { SignpostList } from './SignpostList';

const meta = {
  title: 'Content/SignpostList',
  component: SignpostList,
  args: { signposts: HOME_SIGNPOSTS, headingLevel: 3 },
} satisfies Meta<typeof SignpostList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Narrow the canvas to see the cards wrap into fewer columns. */
export const Default: Story = {};

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
