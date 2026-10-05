import type { Meta, StoryObj } from '@storybook/react-vite';

import { QUALIFICATIONS, SKILLS, SPEAKING_WITHOUT_PAGES } from '../../content/cv';
import { TALKS } from '../../content/talks';
import { QualificationList, SkillsList, SpeakingList } from './CvLists';

const meta = {
  title: 'CV/SkillsList',
  component: SkillsList,
  args: { groups: SKILLS },
} satisfies Meta<typeof SkillsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Skills: Story = {};

export const Qualifications: Story = {
  render: () => <QualificationList items={QUALIFICATIONS} />,
};

export const Speaking: Story = {
  render: () => <SpeakingList talks={TALKS} withoutPages={SPEAKING_WITHOUT_PAGES} />,
};
