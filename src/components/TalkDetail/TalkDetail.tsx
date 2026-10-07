import type { Talk } from '../../content/talks';
import { AbbrText } from '../Abbr';
import { Heading } from '../Heading';
import { Link } from '../Link';
import { PageHeading } from '../PageHeading';
import { Stack } from '../Stack';
import { TalkVideo } from '../TalkVideo';
import { Time } from '../Time';
import { Transcript } from '../Transcript';
import styles from './TalkDetail.module.css';

const TRANSCRIPT_ID = 'transcript';

interface TalkDetailProps {
  talk: Talk;
  transcriptHtml: string;
}

export function TalkDetail({ talk, transcriptHtml }: TalkDetailProps) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Stack gap={2}>
          <PageHeading>{talk.title}</PageHeading>
          <p className={styles.meta}>
            {talk.event}, {talk.location}, <Time date={talk.date} />
          </p>
        </Stack>
        <p>
          <AbbrText>{talk.summary}</AbbrText>
        </p>
      </Stack>

      {(talk.video ?? talk.slidesHref) && (
        <Stack as="section" gap={3} aria-labelledby="watch">
          <Heading level={2} id="watch">
            {talk.video ? 'Watch the talk' : 'Slides'}
          </Heading>
          {talk.video && (
            <TalkVideo title={talk.title} video={talk.video} transcriptId={TRANSCRIPT_ID} />
          )}
          {talk.slidesHref && (
            <p>
              <Link href={talk.slidesHref}>Slides for “{talk.title}”</Link>
            </p>
          )}
        </Stack>
      )}

      <Stack as="section" gap={4} aria-labelledby={TRANSCRIPT_ID}>
        <Heading level={2} id={TRANSCRIPT_ID} tabIndex={-1}>
          Transcript
        </Heading>
        <Transcript html={transcriptHtml} />
      </Stack>

      <p>
        <Link to="/talks">See all my talks</Link>
      </p>
    </Stack>
  );
}
