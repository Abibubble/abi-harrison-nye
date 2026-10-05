import type { Meta, StoryObj } from '@storybook/react-vite';

import { ContactForm } from './ContactForm';

/** Waits a moment, like a real request, so the sending state can be seen. */
function wait() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1000));
}

const meta = {
  title: 'Forms/ContactForm',
  component: ContactForm,
  // A fake, so nothing is ever really sent from Storybook.
  args: { send: wait },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fill it in, press Continue, check the message, then send it. Sending always works here. */
export const Default: Story = {};

/** Sending always fails here, to show that nothing is lost and it can be tried again. */
export const WhenSendingFails: Story = {
  args: {
    send: async () => {
      await wait();
      throw new Error('EmailJS couldn’t send the message: 500');
    },
  },
};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
