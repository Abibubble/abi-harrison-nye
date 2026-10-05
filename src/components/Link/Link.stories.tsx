import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToAPageOnThisSite: Story = {
  args: { to: '/work', children: 'Work' },
};

export const ToAnotherSite: Story = {
  args: { href: 'https://github.com/Abibubble', children: 'GitHub' },
};

export const InAParagraph: Story = {
  args: { href: 'https://github.com/Abibubble', children: 'my GitHub profile' },
  render: (args) => (
    <p>
      You can find the code for this site on <Link {...args} />, along with my other projects.
    </p>
  ),
};
