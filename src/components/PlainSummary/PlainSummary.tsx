import { PLAIN_SUMMARY } from '../../content/profile';
import { Link } from '../Link';
import styles from './PlainSummary.module.css';

export const GLOSSARY_PATH = '/accessibility#glossary';

/**
 * A short summary in plain words, for pages with detailed or technical writing (WCAG 3.1.5), and a
 * link to the glossary for the technical words (WCAG 3.1.3). It's a help on screen, so it isn't
 * printed.
 */
export function PlainSummary() {
  return (
    <div className={styles.summary} data-print="hide">
      <p>
        <strong>In short:</strong> {PLAIN_SUMMARY}
      </p>
      <p>
        Some words on this page are explained in the <Link to={GLOSSARY_PATH}>glossary</Link>.
      </p>
    </div>
  );
}
