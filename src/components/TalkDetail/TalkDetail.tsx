import { Fragment } from 'react';

import { alsoGivenTranscriptPath, slidesPath, transcriptPath } from '../../content/talkPath';
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

export function TalkDetail({ talk, aboutHtml }: TalkDetailProps) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Stack gap={2}>
          <PageHeading>{talk.title}</PageHeading>
          <p className={styles.meta}>
            {talk.event}, <Time date={talk.date} />
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

      {(talk.video ?? talk.slidesHref ?? talk.slidesPage) && (
        <Stack as="section" gap={3}>
          <Heading level={2} id="watch">
            {talk.video ? 'Watch the talk' : 'Slides'}
          </Heading>
          {talk.video && (
            <TalkVideo video={talk.video} transcriptHref={transcriptPath(talk.slug)} />
          )}
          {talk.slidesHref && (
            <p>
              <Link href={talk.slidesHref}>Slides for “{talk.title}”</Link>
            </p>
          )}
          {talk.slidesPage && (
            <p className={styles.standalone}>
              <Link to={slidesPath(talk.slug)}>See the slides</Link>
            </p>
          )}
          {talk.alsoGiven?.map((other) => (
            <Fragment key={other.href}>
              <p>
                I also gave {other.description} of this talk at <AbbrText>{other.event}</AbbrText>,
                on <Time date={other.date} />.{' '}
                <Link href={other.href}>Watch {other.description} on YouTube</Link>
              </p>
              {other.slug && (
                <p className={styles.standalone}>
                  <Link to={alsoGivenTranscriptPath(talk.slug, other.slug)}>
                    Read the transcript of {other.description}
                  </Link>
                </p>
              )}
            </Fragment>
          ))}
        </Stack>
      )}

      <Stack as="section" gap={3}>
        <Heading level={2} id="transcript">
          Transcript
        </Heading>
        <p>The transcript has everything that was said, on its own page.</p>
        <p className={styles.standalone}>
          <Link to={transcriptPath(talk.slug)}>Read the transcript</Link>
        </p>
      </Stack>

      <p className={styles.standalone}>
        <Link to="/talks">See all my talks</Link>
      </p>
    </Stack>
  );
}
