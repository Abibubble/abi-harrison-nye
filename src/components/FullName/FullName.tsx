import { SITE_NAME } from '../../content/site';
import styles from './FullName.module.css';

const [firstName, surname] = SITE_NAME.split(' ', 2);

/**
 * My name, with my surname never split at its hyphen. On narrow screens or with large text, it
 * wraps as "Abi", then "Harrison-Nye", rather than "Abi Harrison-", then "Nye"
 */
export function FullName() {
  return (
    <>
      {firstName} <span className={styles.surname}>{surname}</span>
    </>
  );
}
