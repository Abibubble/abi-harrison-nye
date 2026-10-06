import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Articles, { ArticlesPage, meta } from './articles';

const EXAMPLE_ARTICLES = [
  {
    title: 'First article',
    publication: 'Example blog',
    date: '2026-04-03',
    summary: 'The first one.',
    href: 'https://example.com/first',
  },
];

describe('Articles page', () => {
  it('has the page heading', () => {
    renderWithRouter(<Articles />);

    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument();
  });

  it('says articles are coming when there are none yet', () => {
    renderWithRouter(<ArticlesPage articles={[]} />);

    expect(screen.getByText('I’m adding my articles here soon.')).toBeInTheDocument();
  });

  it('lists each article, linking to where it’s published', () => {
    renderWithRouter(<ArticlesPage articles={EXAMPLE_ARTICLES} />);

    expect(screen.getByRole('link', { name: 'First article (external site)' })).toHaveAttribute(
      'href',
      'https://example.com/first',
    );
    expect(screen.queryByText('I’m adding my articles here soon.')).not.toBeInTheDocument();
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Articles, Abi Harrison-Nye' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4173/articles/',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<ArticlesPage articles={EXAMPLE_ARTICLES} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
