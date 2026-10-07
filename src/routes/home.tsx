import { Abbr, AbbrText } from '../components/Abbr';
import { Heading } from '../components/Heading';
import { PageHeading } from '../components/PageHeading';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { RecognitionList } from '../components/RecognitionList';
import { SignpostList } from '../components/SignpostList';
import { Stack } from '../components/Stack';
import { HOME_SIGNPOSTS } from '../content/home';
import { PROFILE } from '../content/profile';
import { RECOGNITION } from '../content/recognition';
import { SITE_NAME } from '../content/site';
import { pageMeta } from '../seo/pageMeta';
import { personSchema } from '../seo/person';
import type { Route } from './+types/home';
import styles from './home.module.css';

export function meta(): Route.MetaDescriptors {
  return [
    ...pageMeta({
      title: `${SITE_NAME}, Software Engineer`,
      description:
        'Software engineer and accessibility specialist at giffgaff, building accessible React and TypeScript, and leading an accessibility and neurodiversity network.',
      path: '/',
    }),
    // Tells search engines who the site belongs to. It's data, not a script, so it never runs
    { 'script:ld+json': personSchema() },
  ];
}

export default function Home() {
  return (
    <Stack gap={7}>
      <div className={styles.intro}>
        <ProfilePhoto photo={PROFILE.photo} />
        <Stack gap={4}>
          <Stack gap={2}>
            <PageHeading>{SITE_NAME}</PageHeading>
            <p className={styles.headline}>{PROFILE.headline}</p>
          </Stack>
          <p>
            I’m a software engineer at giffgaff, where I’ve worked since 2021. I build the pages and
            journeys people use to buy phones, in React and TypeScript, and I built and maintained
            giffgaff’s React design system.
          </p>
          <p>
            I’m a trained accessibility auditor. I’m the founder and current Lead for the{' '}
            <Abbr name="HAND" expand />, giffgaff’s accessibility and neurodiversity employee
            network group. I also mentored apprentices into full engineering roles.
          </p>
          <p>
            In June 2026 I spoke at LeadDev LDX3 in London, with a talk titled ‘Moving accessibility
            from debt to done’.
          </p>
        </Stack>
      </div>

      <Stack as="section" gap={4} aria-labelledby="find-out-more">
        <Heading level={2} id="find-out-more">
          Find out more
        </Heading>
        <SignpostList signposts={HOME_SIGNPOSTS} headingLevel={3} />
      </Stack>

      <Stack as="section" gap={4} aria-labelledby="recognition">
        <Heading level={2} id="recognition">
          Recognition
        </Heading>
        <RecognitionList items={RECOGNITION} />
      </Stack>

      <Stack as="section" gap={4} aria-labelledby="outside-work">
        <Heading level={2} id="outside-work">
          Outside work
        </Heading>
        {PROFILE.interests.map((interest) => (
          <p key={interest}>
            <AbbrText>{interest}</AbbrText>
          </p>
        ))}
      </Stack>
    </Stack>
  );
}
