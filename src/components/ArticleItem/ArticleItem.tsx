import type { Article } from '../../content/articles';
import { AbbrText } from '../Abbr';
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
        <p>
          <AbbrText>{article.summary}</AbbrText>
        </p>
      </Stack>
    </Card>
  );
}
