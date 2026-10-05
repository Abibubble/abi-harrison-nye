import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'increased', label: 'Increased', hint: 'More space between lines, words and letters' },
];

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  args: {
    legend: 'Text spacing',
    name: 'text-spacing',
    options: OPTIONS,
    value: 'default',
    onChange: () => undefined,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <RadioGroup {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof RadioGroup<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click an option or its label, or use the arrow keys to move between options. */
export const Default: Story = {};
