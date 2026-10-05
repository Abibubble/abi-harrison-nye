import type { Qualification, SkillGroup, SpeakingEngagement } from '../../content/cv';
import type { Talk } from '../../content/talks';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { DateRange, Time } from '../Time';
import styles from './CvLists.module.css';

/** Skills grouped by category, as a description list: each category followed by its skills. */
export function SkillsList({ groups }: { groups: readonly SkillGroup[] }) {
  return (
    <dl className={styles.skills}>
      {groups.map((group) => (
        <div key={group.category} className={styles.skillGroup}>
          <dt className={styles.term}>{group.category}</dt>
          <dd>{group.skills.join(', ')}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Qualifications and training, each with where, when and any result. */
export function QualificationList({ items }: { items: readonly Qualification[] }) {
  return (
    <Stack as="ul" gap={3}>
      {items.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong>, {item.provider},{' '}
          {item.to ? <DateRange from={item.from} to={item.to} /> : <Time date={item.from} />}
          {item.detail && <span className={styles.detail}> {item.detail}</span>}
        </li>
      ))}
    </Stack>
  );
}

interface SpeakingListProps {
  /** Talks with their own page, which are linked. */
  talks: readonly Talk[];
  /** Talks without a page yet, listed as plain text. */
  withoutPages: readonly SpeakingEngagement[];
}

/** Every talk I've given, newest first, linking to the ones with their own page. */
export function SpeakingList({ talks, withoutPages }: SpeakingListProps) {
  const items = [
    ...talks.map((talk) => ({ ...talk, href: `/talks/${talk.slug}` })),
    ...withoutPages.map((talk) => ({ ...talk, href: undefined })),
  ].sort((first, second) => second.date.localeCompare(first.date));

  return (
    <Stack as="ul" gap={3}>
      {items.map((item) => (
        <li key={item.title}>
          {item.href ? <Link to={item.href}>{item.title}</Link> : `“${item.title}”`}, {item.event},{' '}
          {item.location}, <Time date={item.date} />
        </li>
      ))}
    </Stack>
  );
}
