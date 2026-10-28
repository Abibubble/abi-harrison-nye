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
  /** False for talks that weren't recorded, which are listed without a page of their own */
  hasPage?: boolean;
}

function mediaSummary(talk: Talk): string {
  if (!talk.video) return 'Transcript';
  return talk.video.captions === 'accurate'
    ? 'Video with captions, and transcript'
    : 'Video and transcript';
}

export function TalkItem({ talk, headingLevel, hasPage = true }: TalkItemProps) {
  return (
    <Card as="article">
      <Stack gap={2}>
        <Heading level={headingLevel} className={styles.title}>
          {hasPage ? <Link to={`/talks/${talk.slug}`}>{talk.title}</Link> : talk.title}
        </Heading>
        <p className={styles.meta}>
          {talk.event}, <Time date={talk.date} />
        </p>
        <p>
          <AbbrText>{talk.summary}</AbbrText>
        </p>
        {hasPage && <p className={styles.meta}>{mediaSummary(talk)}</p>}
      </Stack>
    </Card>
  );
}
