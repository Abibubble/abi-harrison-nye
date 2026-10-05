import type { Meta, StoryObj } from '@storybook/react-vite';

import { RECOGNITION } from '../../content/recognition';
import { RecognitionList } from './RecognitionList';

const meta = {
  title: 'Content/RecognitionList',
  component: RecognitionList,
  args: { items: RECOGNITION },
} satisfies Meta<typeof RecognitionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
