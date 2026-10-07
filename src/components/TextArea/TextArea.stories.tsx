import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';

import { TextArea } from './TextArea';

function WithState({ value: initialValue = '', ...args }: ComponentProps<typeof TextArea>) {
  const [value, setValue] = useState(String(initialValue));
  return (
    <TextArea
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}

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

export const WithACharacterLimit: Story = {
  args: { characterLimit: 200 },
  render: (args) => <WithState {...args} />,
};

export const OverTheCharacterLimit: Story = {
  args: {
    characterLimit: 40,
    value: 'This message is a little bit too long to fit',
    error: 'Your message must be 40 characters or fewer',
  },
  render: (args) => <WithState {...args} />,
};

export const OverTheCharacterLimitInTheDarkTheme: Story = {
  ...OverTheCharacterLimit,
  globals: { theme: 'dark' },
};
