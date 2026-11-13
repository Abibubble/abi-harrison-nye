import { useLoaderData } from 'react-router';

import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { FOOTER_NAV, MAIN_NAV, SITE_MAP_PATH } from '../content/navigation';
import { pageTitle } from '../content/site';
import { alsoGivenTranscriptPath, slidesPath, transcriptPath } from '../content/talkPath';
import { OTHER_TALKS, TALKS, type Talk } from '../content/talks';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/site-map';
import styles from './site-map.module.css';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Site map'),
    description: 'Every page on this site, including each talk’s transcript and slides.',
    path: SITE_MAP_PATH,
  });
}

/** Runs when the site is built, so talks that aren't ready never reach visitors */
export function loader() {
  return { talks: TALKS, otherTalks: OTHER_TALKS };
}

interface SiteMapPageProps {
  talks: readonly Talk[];
  otherTalks: readonly Talk[];
}

/**
 * Each of a talk's pages, named in full so every link makes sense on its own, such as in a screen
 * reader's list of links (WCAG 2.4.9)
 */
function talkPages(talk: Talk): { name: string; to: string }[] {
  // Talks that weren't recorded only have a transcript if it's made from my script
  const hasTranscript = !talk.notRecorded || talk.transcriptFromScript;

  return [
    ...(hasTranscript
      ? [{ name: `Transcript: ${talk.title}`, to: transcriptPath(talk.slug) }]
      : []),
    ...(talk.alsoGiven ?? []).flatMap((other) =>
      other.slug
        ? [
            {
              name: `Transcript: ${talk.title} (${other.description})`,
              to: alsoGivenTranscriptPath(talk.slug, other.slug),
            },
          ]
        : [],
    ),
    ...(talk.slidesPage ? [{ name: `Slides: ${talk.title}`, to: slidesPath(talk.slug) }] : []),
  ];
}

/**
 * Every page on the site, so there's more than one way to find each one, such as a talk's
 * transcript (WCAG 2.4.5). It's built from the same lists as the site, so new talks appear here
 * by themselves. The CV is unlisted, so it isn't here
 */
export function SiteMapPage({ talks, otherTalks }: SiteMapPageProps) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Site map</PageHeading>
        <p>Every page on this site.</p>
      </Stack>

      <Stack as="section" gap={4}>
        <Heading level={2}>Main pages</Heading>
        <ul className={styles.list}>
          {MAIN_NAV.map(({ label, to }) => (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </Stack>

      <Stack as="section" gap={4}>
        <Heading level={2}>Talks</Heading>
        <ul className={styles.list}>
          {talks.map((talk) => (
            <li key={talk.slug}>
              <Link to={`/talks/${talk.slug}`}>{talk.title}</Link>
              <ul className={styles.list}>
                {talkPages(talk).map(({ name, to }) => (
                  <li key={to}>
                    <Link to={to}>{name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {/* Talks that weren't recorded have no talk page, so their pages are listed on their own */}
          {otherTalks.flatMap((talk) =>
            talkPages(talk).map(({ name, to }) => (
              <li key={to}>
                <Link to={to}>{name}</Link>
              </li>
            )),
          )}
        </ul>
      </Stack>

      <Stack as="section" gap={4}>
        <Heading level={2}>About this site</Heading>
        <ul className={styles.list}>
          {FOOTER_NAV.filter(({ to }) => to !== SITE_MAP_PATH).map(({ label, to }) => (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </Stack>
    </Stack>
  );
}

export default function SiteMap() {
  return <SiteMapPage {...useLoaderData<typeof loader>()} />;
}
