import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from '../Link';
import { Stack } from '../Stack';
import { TagList } from '../Tag';
import { DateRange } from '../Time';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    as: 'article',
    children: (
      <Stack gap={3}>
        <h2>Software Engineer, giffgaff</h2>
        <p>
          <DateRange from="2021-08" />
        </p>
        <p>
          Building accessible micro frontends in React and TypeScript, and the original giffgaff
          design system.
        </p>
        <TagList tags={['React', 'TypeScript', 'Storybook']} label="Technologies used" />
        <p>
          <Link href="https://www.giffgaff.com">giffgaff.com</Link>
        </p>
      </Stack>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };

export const InTheCreamTheme: Story = { globals: { theme: 'cream' } };
