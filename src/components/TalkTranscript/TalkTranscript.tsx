import type { Talk } from '../../content/talks';
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
  transcriptHtml: string;
  sections: readonly TranscriptSection[];
}

/**
 * A talk's transcript, on its own page so the talk page stays short. The contents list lets people
 * jump to the part they want, rather than facing one long page
 */
export function TalkTranscript({ talk, transcriptHtml, sections }: TalkTranscriptProps) {
  const backToTalk = (
    <p className={styles.standalone}>
      <Link to={`/talks/${talk.slug}`}>Back to “{talk.title}”</Link>
    </p>
  );

  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Stack gap={2}>
          <PageHeading>Transcript: {talk.title}</PageHeading>
          <p className={styles.meta}>
            {talk.event}, <Time date={talk.date} />
          </p>
        </Stack>
        {backToTalk}
      </Stack>

      {sections.length > 1 && <PageContents sections={sections} />}

      <Transcript html={transcriptHtml} />

      {backToTalk}
    </Stack>
  );
}
