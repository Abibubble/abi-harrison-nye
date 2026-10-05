import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProjectItem } from './ProjectItem';

const meta = {
  title: 'Content/ProjectItem',
  component: ProjectItem,
  args: {
    headingLevel: 2,
    project: {
      name: 'Example project',
      summary: 'An example to show how a project looks. Real projects are added in projects.ts.',
      tech: ['React', 'TypeScript', 'Storybook'],
      href: 'https://example.com',
      codeHref: 'https://github.com/example/example',
    },
  },
} satisfies Meta<typeof ProjectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLinks: Story = {
  args: { project: { name: 'Example project', summary: 'No live site or public code.', tech: [] } },
};
