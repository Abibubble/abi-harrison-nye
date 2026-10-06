import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { TalkItem } from '../components/TalkItem';
import { pageTitle } from '../content/site';
import { type Talk, TALKS } from '../content/talks';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/talks';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Talks'),
    description: 'Talks I’ve given, each with a video and a full transcript.',
    path: '/talks',
  });
}

export function TalksPage({ talks }: { talks: readonly Talk[] }) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Talks</PageHeading>
        <p>
          Talks I’ve given. Each one has a full transcript, which also describes everything shown on
          screen.
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
    </Stack>
  );
}

export default function Talks() {
  return <TalksPage talks={TALKS} />;
}
