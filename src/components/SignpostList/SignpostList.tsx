import { Card } from '../Card';
import { type HeadingLevel, Heading } from '../Heading';
import { Link } from '../Link';
import styles from './SignpostList.module.css';

export interface Signpost {
  title: string;
  to: string;
  description: string;
}

interface SignpostListProps {
  signposts: readonly Signpost[];
  headingLevel: HeadingLevel;
}

/**
 * Cards pointing to other parts of the site. Each card's heading is the link, so the link text is
 * the page's name, and the description says what's there.
 */
export function SignpostList({ signposts, headingLevel }: SignpostListProps) {
  return (
    <ul role="list" className={styles.list}>
      {signposts.map((signpost) => (
        <Card key={signpost.to} as="li" className={styles.card}>
          <Heading level={headingLevel}>
            <Link to={signpost.to}>{signpost.title}</Link>
          </Heading>
          <p>{signpost.description}</p>
        </Card>
      ))}
    </ul>
  );
}
