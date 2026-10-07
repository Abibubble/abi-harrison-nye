import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Article } from '../../content/articles';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { ArticleItem } from './ArticleItem';

const ARTICLE: Article = {
  title: 'An example article',
  publication: 'Example blog',
  date: '2026-04-03',
  summary: 'An article used to test this component',
  href: 'https://example.com/article',
};

describe('ArticleItem', () => {
  it('has its title as a linked heading, going to where it’s published', () => {
    renderWithRouter(<ArticleItem article={ARTICLE} headingLevel={2} />);
    const heading = screen.getByRole('heading', { level: 2 });

    expect(
      within(heading).getByRole('link', { name: 'An example article (external site)' }),
    ).toHaveAttribute('href', 'https://example.com/article');
  });

  it('shows where and when it was published, with the date in words', () => {
    renderWithRouter(<ArticleItem article={ARTICLE} headingLevel={2} />);

    expect(screen.getByText(/Example blog/)).toHaveTextContent('Example blog, 3 April 2026');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<ArticleItem article={ARTICLE} headingLevel={2} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
