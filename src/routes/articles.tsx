import { ArticleItem } from '../components/ArticleItem';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { type Article, ARTICLES } from '../content/articles';
import { pageTitle } from '../content/site';
import type { Route } from './+types/articles';

export function meta(): Route.MetaDescriptors {
  return [
    { title: pageTitle('Articles') },
    { name: 'description', content: 'Things I’ve written, with links to where they’re published.' },
  ];
}

export function ArticlesPage({ articles }: { articles: readonly Article[] }) {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <PageHeading>Articles</PageHeading>
        <p>Things I’ve written. Each link goes to where the article is published.</p>
      </Stack>
      {articles.length > 0 ? (
        <Stack as="ul" gap={5}>
          {articles.map((article) => (
            <li key={article.href}>
              <ArticleItem article={article} headingLevel={2} />
            </li>
          ))}
        </Stack>
      ) : (
        <p>I’m adding my articles here soon.</p>
      )}
    </Stack>
  );
}

export default function Articles() {
  return <ArticlesPage articles={ARTICLES} />;
}
