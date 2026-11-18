import { useLoaderData } from 'react-router';

import { Heading } from '../components/Heading';
import { PageHeading } from '../components/PageHeading';
import { SignpostList } from '../components/SignpostList';
import { Stack } from '../components/Stack';
import { TalkItem } from '../components/TalkItem';
import { NEURODIVERSITY_TALKS_PATH } from '../content/navigation';
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
  otherTalkCount = 0,
}: {
  talks: readonly Talk[];
  /** How many talks are on the Neurodiversity talks page, which this page links to */
  otherTalkCount?: number;
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
      {otherTalkCount > 0 && (
        <Stack as="section" gap={4}>
          <Heading level={2} id="more-talks">
            More talks
          </Heading>
          <SignpostList
            headingLevel={3}
            signposts={[
              {
                title: 'Neurodiversity talks',
                to: NEURODIVERSITY_TALKS_PATH,
                description: `${otherTalkCount} short talks I’ve given at giffgaff, mostly in the neurodiversity monthly chats I run. There’s no recording to share, so you can read my scripts instead.`,
              },
            ]}
          />
        </Stack>
      )}
    </Stack>
  );
}

/** Runs when the site is built, so talks that aren't ready never reach visitors */
export function loader() {
  return { talks: TALKS, otherTalkCount: OTHER_TALKS.length };
}

export default function Talks() {
  return <TalksPage {...useLoaderData<typeof loader>()} />;
}
