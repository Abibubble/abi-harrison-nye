import type { Talk } from '../../content/talks';
import { AbbrText } from '../Abbr';
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
        <p>
          <AbbrText>{talk.summary}</AbbrText>
        </p>
        <p className={styles.meta}>{mediaSummary(talk)}</p>
      </Stack>
    </Card>
  );
}
