import type { Recognition } from '../../content/recognition';
import { Stack } from '../Stack';
import styles from './RecognitionList.module.css';

interface RecognitionListProps {
  items: readonly Recognition[];
}

/** Awards and commendations, each with its result first, as that's what people scan for. */
export function RecognitionList({ items }: RecognitionListProps) {
  return (
    <Stack as="ul" gap={3}>
      {items.map((item) => (
        <li key={`${item.award}-${item.year}`}>
          <strong>{item.result}</strong>: {item.award}
          {item.recipient && ` (${item.recipient})`}
          <span className={styles.awards}>
            , {item.awards} {item.year}
          </span>
        </li>
      ))}
    </Stack>
  );
}
