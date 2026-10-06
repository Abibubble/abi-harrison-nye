import { Abbr, AbbrText } from '../components/Abbr';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { PageHeading } from '../components/PageHeading';
import { PlainSummary } from '../components/PlainSummary';
import { Stack } from '../components/Stack';
import { SiteList, WorkHistory } from '../components/WorkHistory';
import { pageTitle } from '../content/site';
import { BEFORE_TECH_SUMMARY, VOLUNTEERING, WORK } from '../content/work';
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
        <PlainSummary />
      </Stack>
      <WorkHistory companies={TECH_ROLES} headingLevel={2} />
      <Stack as="section" gap={4} aria-labelledby="volunteering">
        <Heading level={2} id="volunteering">
          Volunteering
        </Heading>
        <p>Sites I’ve helped with as a volunteer, outside work.</p>
        <SiteList sites={VOLUNTEERING} />
      </Stack>
      <Stack as="section" gap={4} aria-labelledby="before-tech">
        <Heading level={2} id="before-tech">
          Before tech
        </Heading>
        <p>
          <AbbrText>{BEFORE_TECH_SUMMARY}</AbbrText>
        </p>
        <p>
          You can read about those roles in full on{' '}
          <Link to="/cv">
            my <Abbr name="CV" />
          </Link>
          .
        </p>
      </Stack>
    </Stack>
  );
}
