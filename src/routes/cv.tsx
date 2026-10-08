import type { ReactNode } from 'react';

import { QualificationList, SkillsList, SpeakingList } from '../components/CvLists';
import { AbbrText } from '../components/Abbr';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { PageHeading } from '../components/PageHeading';
import { PlainSummary } from '../components/PlainSummary';
import { PrintOptions } from '../components/PrintOptions';
import { RecognitionList } from '../components/RecognitionList';
import { Stack } from '../components/Stack';
import { SiteList, WorkHistory } from '../components/WorkHistory';
import {
  CV_PROFILE,
  QUALIFICATIONS,
  SHORT_COURSES,
  SKILLS,
  SPEAKING_WITHOUT_PAGES,
} from '../content/cv';
import { PROFILE, PROFILE_LINKS } from '../content/profile';
import { RECOGNITION } from '../content/recognition';
import { SITE_NAME, pageTitle } from '../content/site';
import { TALKS } from '../content/talks';
import { VOLUNTEERING, WORK } from '../content/work';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/cv';
import styles from './cv.module.css';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('CV'),
    description: `${SITE_NAME}’s CV: software engineer and accessibility specialist at giffgaff.`,
    path: '/cv',
  });
}

function CvSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Stack as="section" gap={4} aria-labelledby={id}>
      <Heading level={2} id={id}>
        {title}
      </Heading>
      {children}
    </Stack>
  );
}

export default function Cv() {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>CV</PageHeading>
        <div className={styles.contact}>
          <p className={styles.name}>{SITE_NAME}</p>
          <p>
            {PROFILE.headline}, <AbbrText>{PROFILE.location}</AbbrText>
          </p>
          <p>
            {PROFILE_LINKS.map((link, index) => (
              <span key={link.href}>
                {index > 0 && ', '}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
            {', or '}
            <Link to="/contact">send me a message</Link>
          </p>
        </div>
        <PlainSummary />
        <PrintOptions />
      </Stack>

      <CvSection id="profile" title="Profile">
        {CV_PROFILE.map((paragraph) => (
          <p key={paragraph}>
            <AbbrText>{paragraph}</AbbrText>
          </p>
        ))}
      </CvSection>

      <CvSection id="skills" title="Key skills">
        <SkillsList groups={SKILLS} />
      </CvSection>

      <CvSection id="experience" title="Experience">
        <WorkHistory
          companies={WORK.filter((company) => !company.earlierCareer)}
          headingLevel={3}
        />
      </CvSection>

      <CvSection id="speaking-and-recognition" title="Speaking and recognition">
        <Stack gap={3}>
          <Heading level={3}>Speaking</Heading>
          <SpeakingList talks={TALKS} withoutPages={SPEAKING_WITHOUT_PAGES} />
        </Stack>
        <Stack gap={3}>
          <Heading level={3}>Recognition</Heading>
          <RecognitionList items={RECOGNITION} />
        </Stack>
      </CvSection>

      <CvSection id="volunteering" title="Volunteering">
        <SiteList sites={VOLUNTEERING} />
      </CvSection>

      <CvSection id="earlier-career" title="Earlier career">
        <WorkHistory companies={WORK.filter((company) => company.earlierCareer)} headingLevel={3} />
      </CvSection>

      <CvSection id="education" title="Education and training">
        <QualificationList items={QUALIFICATIONS} />
        <p>
          <span className={styles.shortCoursesLabel}>Short courses:</span>{' '}
          <AbbrText>{SHORT_COURSES}</AbbrText>
        </p>
      </CvSection>

      <CvSection id="interests" title="Interests">
        {PROFILE.interests.map((interest) => (
          <p key={interest}>
            <AbbrText>{interest}</AbbrText>
          </p>
        ))}
      </CvSection>
    </Stack>
  );
}
