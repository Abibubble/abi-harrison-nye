import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Talk } from '../content/talks';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Talks, { TalksPage, meta } from './talks';

const EXAMPLE_TALKS: Talk[] = [
  {
    slug: 'example-talk',
    title: 'Example talk',
    event: 'Example conference',
    location: 'London',
    date: '2026-06',
    summary: 'The first one.',
  },
];

describe('Talks page', () => {
  it('has the page heading', () => {
    renderWithRouter(<Talks />);

    expect(screen.getByRole('heading', { level: 1, name: 'Talks' })).toBeInTheDocument();
  });

  it('says talks are coming when there are none yet', () => {
    renderWithRouter(<TalksPage talks={[]} />);

    expect(screen.getByText('I’m adding my talks here soon.')).toBeInTheDocument();
  });

  it('lists each talk, linking to its page', () => {
    renderWithRouter(<TalksPage talks={EXAMPLE_TALKS} />);

    expect(screen.getByRole('link', { name: 'Example talk' })).toHaveAttribute(
      'href',
      '/talks/example-talk',
    );
    expect(screen.queryByText('I’m adding my talks here soon.')).not.toBeInTheDocument();
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Talks, Abi Harrison-Nye' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4173/talks',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<TalksPage talks={EXAMPLE_TALKS} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
