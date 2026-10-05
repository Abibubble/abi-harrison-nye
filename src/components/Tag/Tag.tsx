import { Cluster } from '../Cluster';
import styles from './Tag.module.css';

interface TagProps {
  children: string;
}

/** A short label, such as a technology used on a project. Tags aren't links or buttons. */
export function Tag({ children }: TagProps) {
  return <span className={styles.tag}>{children}</span>;
}

interface TagListProps {
  tags: readonly string[];
  /** Describes the list for screen reader users, for example "Technologies used". */
  label: string;
}

/** A group of tags, as a list so screen readers say how many there are. */
export function TagList({ tags, label }: TagListProps) {
  return (
    <Cluster as="ul" gap={2} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </Cluster>
  );
}
