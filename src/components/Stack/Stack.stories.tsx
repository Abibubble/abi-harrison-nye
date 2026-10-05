import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '../Card';
import { Stack } from './Stack';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    gap: 3,
    children: (
      <>
        <Card>First</Card>
        <Card>Second</Card>
        <Card>Third</Card>
      </>
    ),
  },
  argTypes: { gap: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6, 7] } },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Use the gap control to try each step of the spacing scale. */
export const Default: Story = {};
