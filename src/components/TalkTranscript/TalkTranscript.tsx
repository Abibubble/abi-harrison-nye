import type { AlsoGiven, Talk } from '../../content/talks';
import type { TranscriptSection } from '../../content/transcripts';
import { Link } from '../Link';
import { PageContents } from '../PageContents';
import { PageHeading } from '../PageHeading';
import { Stack } from '../Stack';
import { Time } from '../Time';
import { Transcript } from '../Transcript';
import styles from './TalkTranscript.module.css';

interface TalkTranscriptProps {
  talk: Talk;
  /** Another time I gave the talk, when the transcript is of that one */
  alsoGiven?: AlsoGiven | undefined;
  transcriptHtml: string;
  sections: readonly TranscriptSection[];
}

/**
 * A talk's transcript, on its own page so the talk page stays short. The contents list lets people
 * jump to the part they want, rather than facing one long page
 */
export function TalkTranscript({ talk, alsoGiven, transcriptHtml, sections }: TalkTranscriptProps) {
  const given = alsoGiven ?? talk;

  const backToTalk = (
    <p className={styles.standalone}>
      {talk.notRecorded ? (
        <Link to="/talks#other-talks">Back to other talks</Link>
      ) : (
        <Link to={`/talks/${talk.slug}`}>Back to “{talk.title}”</Link>
      )}
    </p>
  );

  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Stack gap={2}>
          <PageHeading>
            Transcript: {talk.title}
            {alsoGiven && ` (${alsoGiven.description})`}
          </PageHeading>
          <p className={styles.meta}>
            {given.event}, <Time date={given.date} />
          </p>
        </Stack>
        {talk.notRecorded && (
          <p>
            There’s no recording of this talk to share, so this transcript is my script. What I said
            on the day may be a little different.
          </p>
        )}
        {backToTalk}
      </Stack>

      {sections.length > 1 && <PageContents sections={sections} />}

      <Transcript html={transcriptHtml} />

      {backToTalk}
    </Stack>
  );
}
