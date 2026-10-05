import type { Meta, StoryObj } from '@storybook/react-vite';

import { WORK } from '../../content/work';
import { WorkHistory } from './WorkHistory';

const meta = {
  title: 'Content/WorkHistory',
  component: WorkHistory,
  args: { companies: WORK.filter((company) => !company.earlierCareer), headingLevel: 2 },
} satisfies Meta<typeof WorkHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** As on the Work page. */
export const TechRoles: Story = {};

/** As on the CV page, one heading level lower, including roles before tech. */
export const AllRoles: Story = { args: { companies: WORK, headingLevel: 3 } };

export const InTheDarkTheme: Story = { globals: { theme: 'dark' } };
