import type { Recognition } from '../../content/recognition';
import { AbbrText } from '../Abbr';
import { Stack } from '../Stack';
import styles from './RecognitionList.module.css';

interface RecognitionListProps {
  items: readonly Recognition[];
}

export function RecognitionList({ items }: RecognitionListProps) {
  return (
    <Stack as="ul" gap={3}>
      {items.map((item) => (
        <li key={`${item.award}-${item.year}`}>
          <strong>
            <AbbrText>{item.result}</AbbrText>
          </strong>
          : <AbbrText>{item.award}</AbbrText>
          {item.recipient && (
            <>
              {' '}
              (<AbbrText>{item.recipient}</AbbrText>)
            </>
          )}
          <span className={styles.awards}>
            , <AbbrText>{item.awards}</AbbrText> {item.year}
          </span>
        </li>
      ))}
    </Stack>
  );
}
