import { transcriptPath } from '../../content/talkPath';
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

interface TalkDetailProps {
  talk: Talk;
  aboutHtml?: string | undefined;
}

const { BASE_URL } = import.meta.env;

export function TalkDetail({ talk, aboutHtml }: TalkDetailProps) {
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
        {aboutHtml && (
          <details className={styles.about}>
            <summary className={styles.summary}>More about this talk</summary>
            <Transcript html={aboutHtml} />
          </details>
        )}
      </Stack>

      {(talk.video ?? talk.slidesHref ?? talk.slidesFile) && (
        <Stack as="section" gap={3} aria-labelledby="watch">
          <Heading level={2} id="watch">
            {talk.video ? 'Watch the talk' : 'Slides'}
          </Heading>
          {talk.video && (
            <TalkVideo
              title={talk.title}
              video={talk.video}
              transcriptHref={transcriptPath(talk.slug)}
            />
          )}
          {talk.slidesHref && (
            <p>
              <Link href={talk.slidesHref}>Slides for “{talk.title}”</Link>
            </p>
          )}
          {talk.slidesFile && (
            <p>
              {/* A file rather than a page, so a plain link, which the browser downloads or opens */}
              <a href={`${BASE_URL}${talk.slidesFile.path}`}>
                Slides for “{talk.title}” (PDF, {talk.slidesFile.size})
              </a>
              . The slides aren’t fully accessible, but the transcript describes each one.
            </p>
          )}
        </Stack>
      )}

      <Stack as="section" gap={3} aria-labelledby="transcript">
        <Heading level={2} id="transcript">
          Transcript
        </Heading>
        <p>The transcript has everything that was said, on its own page.</p>
        <p className={styles.standalone}>
          <Link to={transcriptPath(talk.slug)}>Read the transcript of “{talk.title}”</Link>
        </p>
      </Stack>

      <p className={styles.standalone}>
        <Link to="/talks">See all my talks</Link>
      </p>
    </Stack>
  );
}
