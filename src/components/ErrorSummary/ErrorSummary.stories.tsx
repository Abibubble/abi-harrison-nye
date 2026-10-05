import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack } from '../Stack';
import { TextArea } from '../TextArea';
import { TextField } from '../TextField';
import { ErrorSummary, type FormError } from './ErrorSummary';

const ERRORS: FormError[] = [
  { fieldId: 'story-name', message: 'Enter your name' },
  { fieldId: 'story-message', message: 'Enter a message' },
];

const meta = {
  title: 'Forms/ErrorSummary',
  component: ErrorSummary,
  args: { errors: ERRORS },
  render: (args) => (
    <Stack as="section" gap={5}>
      <ErrorSummary {...args} />
      <TextField id="story-name" label="Your name" error="Enter your name" />
      <TextArea id="story-message" label="Your message" error="Enter a message" />
    </Stack>
  ),
} satisfies Meta<typeof ErrorSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Choose an error to move to its field. */
export const Default: Story = {};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
