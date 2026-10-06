import { Heading } from '../Heading';
import styles from './PageContents.module.css';

export interface PageSection {
  /** The id of the section's heading, which the link goes to. */
  id: string;
  title: string;
}

interface PageContentsProps {
  sections: readonly PageSection[];
}

const HEADING_ID = 'page-contents';

/**
 * Links to each section of a long page, so people can see what's on it and go straight to the part
 * they need (WCAG 2.4.5). The section headings should have a tabIndex of -1, so focus moves with the
 * link.
 */
export function PageContents({ sections }: PageContentsProps) {
  return (
    <nav aria-labelledby={HEADING_ID} className={styles.contents}>
      <Heading level={2} id={HEADING_ID} className={styles.heading}>
        On this page
      </Heading>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
