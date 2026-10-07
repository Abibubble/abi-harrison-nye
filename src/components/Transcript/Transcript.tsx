import styles from './Transcript.module.css';

interface TranscriptProps {
  html: string;
}

/**
 * A talk's transcript. It's my own content, turned from Markdown into HTML at build time, so it's
 * safe to insert directly
 */
export function Transcript({ html }: TranscriptProps) {
  return <div className={styles.transcript} dangerouslySetInnerHTML={{ __html: html }} />;
}
