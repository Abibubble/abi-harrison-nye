import type { Article } from '../../content/articles';
import { Card } from '../Card';
import { type HeadingLevel, Heading } from '../Heading';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { Time } from '../Time';
import styles from './ArticleItem.module.css';

interface ArticleItemProps {
  article: Article;
  headingLevel: HeadingLevel;
}

/** One article, linking to where it's published. The link is its title, so it makes sense alone. */
export function ArticleItem({ article, headingLevel }: ArticleItemProps) {
  return (
    <Card as="article">
      <Stack gap={2}>
        <Heading level={headingLevel}>
          <Link href={article.href}>{article.title}</Link>
        </Heading>
        <p className={styles.meta}>
          {article.publication}, <Time date={article.date} />
        </p>
        <p>{article.summary}</p>
      </Stack>
    </Card>
  );
}
