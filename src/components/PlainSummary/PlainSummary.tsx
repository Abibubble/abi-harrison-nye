import { PLAIN_SUMMARY } from '../../content/profile';
import { Link } from '../Link';
import styles from './PlainSummary.module.css';

export const GLOSSARY_PATH = '/accessibility#glossary';

export function PlainSummary() {
  return (
    <div className={styles.summary} data-print="hide">
      <p>
        <span className={styles.label}>In short:</span> {PLAIN_SUMMARY}
      </p>
      <p>
        Some words on this page are explained in the <Link to={GLOSSARY_PATH}>glossary</Link>.
      </p>
    </div>
  );
}
