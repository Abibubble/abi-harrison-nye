import type { Talk } from '../../content/talks';
import { Card } from '../Card';
import { type HeadingLevel, Heading } from '../Heading';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { Time } from '../Time';
import styles from './TalkItem.module.css';

interface TalkItemProps {
  talk: Talk;
  headingLevel: HeadingLevel;
}

function mediaSummary(talk: Talk): string {
  if (!talk.video) return 'Transcript';
  return talk.video.captions ? 'Video with captions, and transcript' : 'Video and transcript';
}

/** One talk in the list, linking to its page with the video and transcript. */
export function TalkItem({ talk, headingLevel }: TalkItemProps) {
  return (
    <Card as="article">
      <Stack gap={2}>
        <Heading level={headingLevel}>
          <Link to={`/talks/${talk.slug}`}>{talk.title}</Link>
        </Heading>
        <p className={styles.meta}>
          {talk.event}, {talk.location}, <Time date={talk.date} />
        </p>
        <p>{talk.summary}</p>
        <p className={styles.meta}>{mediaSummary(talk)}</p>
      </Stack>
    </Card>
  );
}
