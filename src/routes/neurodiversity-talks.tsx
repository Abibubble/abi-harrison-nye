import { useLoaderData } from 'react-router';

import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { TalkItem } from '../components/TalkItem';
import { NEURODIVERSITY_TALKS_PATH } from '../content/navigation';
import { pageTitle } from '../content/site';
import { OTHER_TALKS, type Talk } from '../content/talks';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/neurodiversity-talks';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Neurodiversity talks'),
    description:
      'Short talks I’ve given about neurodiversity at giffgaff, mostly in the monthly chats I run, with transcripts from my scripts.',
    path: NEURODIVERSITY_TALKS_PATH,
  });
}

/**
 * Talks with no recording to share. They're on their own page so the recorded talks, such as
 * LeadDev LDX3, aren't lost among them on the Talks page
 */
export function NeurodiversityTalksPage({ talks }: { talks: readonly Talk[] }) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Neurodiversity talks</PageHeading>
        <p>
          There’s no recording of these to share, so they don’t have their own pages. Where I still
          have my script or slides, you can read them. Most are neurodiversity monthly chats I run
          at giffgaff. Each one starts with a 10 to 15 minute talk from me, with no slides, followed
          by 45 minutes of safe space discussion.
        </p>
      </Stack>
      <Stack as="ul" gap={5}>
        {talks.map((talk) => (
          <li key={talk.slug}>
            <TalkItem talk={talk} headingLevel={2} hasPage={false} />
          </li>
        ))}
      </Stack>
    </Stack>
  );
}

/** Runs when the site is built, so talks that aren't ready never reach visitors */
export function loader() {
  return { talks: OTHER_TALKS };
}

export default function NeurodiversityTalks() {
  return <NeurodiversityTalksPage {...useLoaderData<typeof loader>()} />;
}
