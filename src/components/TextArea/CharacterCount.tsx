import { useEffect, useState } from 'react';

import { countCharacters } from '../../utils/countCharacters';
import { cx } from '../../utils/cx';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import styles from './TextArea.module.css';

/** How long typing has to pause before screen readers hear the count, so it never talks over typing */
export const ANNOUNCE_DELAY = 1000;

/** Screen readers only hear the count once it's this close to the limit, as a share of it */
const ANNOUNCE_FROM = 0.1;

export function characterCountText(remaining: number): string {
  const amount = Math.abs(remaining);
  const characters = `${amount.toLocaleString('en-GB')} ${amount === 1 ? 'character' : 'characters'}`;
  return remaining < 0 ? `You have ${characters} too many` : `You have ${characters} remaining`;
}

interface CharacterCountProps {
  id: string;
  value: string;
  limit: number;
}

export function CharacterCount({ id, value, limit }: CharacterCountProps) {
  const remaining = limit - countCharacters(value);
  const text = characterCountText(remaining);
  const nearLimit = remaining <= limit * ANNOUNCE_FROM;
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnnouncement(nearLimit ? text : '');
    }, ANNOUNCE_DELAY);
    return () => {
      clearTimeout(timer);
    };
  }, [text, nearLimit]);

  return (
    <>
      <p id={id} className={cx(styles.count, remaining < 0 && styles.over)}>
        {text}
      </p>
      <ScreenReaderOnly>
        <span role="status">{announcement}</span>
      </ScreenReaderOnly>
    </>
  );
}
