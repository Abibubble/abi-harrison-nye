import type { Qualification, SkillGroup, SpeakingEngagement } from '../../content/cv';
import type { Talk } from '../../content/talks';
import { AbbrText } from '../Abbr';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { DateRange, Time } from '../Time';
import styles from './CvLists.module.css';

export function SkillsList({ groups }: { groups: readonly SkillGroup[] }) {
  return (
    <dl className={styles.skills}>
      {groups.map((group) => (
        <div key={group.category} className={styles.skillGroup}>
          <dt className={styles.term}>{group.category}</dt>
          <dd>
            <AbbrText>{group.skills.join(', ')}</AbbrText>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function QualificationList({ items }: { items: readonly Qualification[] }) {
  return (
    <Stack as="ul" gap={3}>
      {items.map((item) => (
        <li key={item.title}>
          <span className={styles.qualificationTitle}>
            <AbbrText>{item.title}</AbbrText>
          </span>
          , <AbbrText>{item.provider}</AbbrText>,{' '}
          {item.to ? <DateRange from={item.from} to={item.to} /> : <Time date={item.from} />}
          {item.detail && (
            <span className={styles.detail}>
              {' '}
              <AbbrText>{item.detail}</AbbrText>
            </span>
          )}
        </li>
      ))}
    </Stack>
  );
}

interface SpeakingListProps {
  talks: readonly Talk[];
  withoutPages: readonly SpeakingEngagement[];
}

export function SpeakingList({ talks, withoutPages }: SpeakingListProps) {
  const items = [
    ...talks.map((talk) => ({ ...talk, href: `/talks/${talk.slug}` })),
    ...withoutPages.map((talk) => ({ ...talk, href: undefined })),
  ].sort((first, second) => second.date.localeCompare(first.date));

  return (
    <Stack as="ul" gap={3}>
      {items.map((item) => (
        <li key={item.title}>
          {item.href ? (
            <Link to={item.href}>{item.title}</Link>
          ) : (
            <>
              “<AbbrText>{item.title}</AbbrText>”
            </>
          )}
          , <AbbrText>{item.event}</AbbrText>, <AbbrText>{item.location}</AbbrText>,{' '}
          <Time date={item.date} />
        </li>
      ))}
    </Stack>
  );
}
