import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageHeading } from './PageHeading';

const meta = {
  title: 'Layout/PageHeading',
  component: PageHeading,
  args: { children: 'Work' },
} satisfies Meta<typeof PageHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Long: Story = {
  args: { children: 'Moving accessibility from debt to done at giffgaff' },
};
