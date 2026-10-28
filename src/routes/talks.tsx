import { useLoaderData } from 'react-router';

import { Heading } from '../components/Heading';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { TalkItem } from '../components/TalkItem';
import { pageTitle } from '../content/site';
import { OTHER_TALKS, type Talk, TALKS } from '../content/talks';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/talks';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Talks'),
    description: 'Talks I’ve given, with full transcripts, and videos where they were recorded.',
    path: '/talks',
  });
}

export function TalksPage({
  talks,
  otherTalks = [],
}: {
  talks: readonly Talk[];
  otherTalks?: readonly Talk[];
}) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Talks</PageHeading>
        <p>
          Talks I’ve given. Each one has a full, checked transcript. Where I still have the slides,
          the transcript describes them too.
        </p>
      </Stack>
      {talks.length > 0 ? (
        <Stack as="ul" gap={5}>
          {talks.map((talk) => (
            <li key={talk.slug}>
              <TalkItem talk={talk} headingLevel={2} />
            </li>
          ))}
        </Stack>
      ) : (
        <p>I’m adding my talks here soon.</p>
      )}
      {otherTalks.length > 0 && (
        <Stack as="section" gap={4} aria-labelledby="other-talks">
          <Heading level={2} id="other-talks">
            Other talks
          </Heading>
          <p>These weren’t recorded, so they don’t have their own pages.</p>
          <Stack as="ul" gap={5}>
            {otherTalks.map((talk) => (
              <li key={talk.slug}>
                <TalkItem talk={talk} headingLevel={3} hasPage={false} />
              </li>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

/** Runs when the site is built, so talks that aren't ready never reach visitors */
export function loader() {
  return { talks: TALKS, otherTalks: OTHER_TALKS };
}

export default function Talks() {
  return <TalksPage {...useLoaderData<typeof loader>()} />;
}
