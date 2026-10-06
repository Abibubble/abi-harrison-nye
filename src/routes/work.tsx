import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { WorkHistory } from '../components/WorkHistory';
import { pageTitle } from '../content/site';
import { BEFORE_TECH_SUMMARY, WORK } from '../content/work';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/work';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Work'),
    description:
      'My work as a software engineer and accessibility specialist at giffgaff, and the sites I’ve worked on.',
    path: '/work',
  });
}

const TECH_ROLES = WORK.filter((company) => !company.earlierCareer);

export default function Work() {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Work</PageHeading>
        <p>What I’ve worked on as a software engineer, and as an accessibility specialist.</p>
      </Stack>
      <WorkHistory companies={TECH_ROLES} headingLevel={2} />
      <Stack as="section" gap={4} aria-labelledby="before-tech">
        <Heading level={2} id="before-tech">
          Before tech
        </Heading>
        <p>{BEFORE_TECH_SUMMARY}</p>
        <p>
          You can read about those roles in full on <Link to="/cv">my CV</Link>.
        </p>
      </Stack>
    </Stack>
  );
}
