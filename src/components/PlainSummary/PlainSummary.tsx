import { GLOSSARY_PATH } from '../../content/navigation';
import { PLAIN_SUMMARY } from '../../content/profile';
import { AbbrText } from '../Abbr';
import { Link } from '../Link';
import styles from './PlainSummary.module.css';

interface PlainSummaryProps {
  /** The summary, in plain words. My work, unless it's for something else, such as a transcript */
  summary?: string;
}

/** A short version in plain words, for a page that's harder to read (WCAG 3.1.5) */
export function PlainSummary({ summary = PLAIN_SUMMARY }: PlainSummaryProps) {
  return (
    <div className={styles.summary} data-print="hide">
      <p>
        <span className={styles.label}>In short:</span> <AbbrText>{summary}</AbbrText>
      </p>
      <p>
        Some words on this page are explained in the <Link to={GLOSSARY_PATH}>glossary</Link>.
      </p>
    </div>
  );
}
