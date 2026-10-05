import styles from './SkipLink.module.css';

export const MAIN_CONTENT_ID = 'main-content';

/**
 * The first thing keyboard users reach on every page, so they can jump past the header. It's hidden
 * until focused, then appears in the normal flow of the page rather than covering anything.
 */
export function SkipLink() {
  return (
    <a className={styles.skipLink} href={`#${MAIN_CONTENT_ID}`} data-print="hide">
      Skip to main content
    </a>
  );
}
