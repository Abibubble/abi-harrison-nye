import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OTHER_TALKS, TALKS, type Talk } from '../content/talks';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import { TalksPage, loader, meta } from './talks';

const EXAMPLE_TALKS: Talk[] = [
  {
    slug: 'example-talk',
    title: 'Example talk',
    event: 'Example conference',
    date: '2026-06',
    summary: 'The first one.',
  },
];

describe('Talks page', () => {
  it('lists talks without pages under “Other talks”, with no links', () => {
    renderWithRouter(
      <TalksPage
        talks={EXAMPLE_TALKS}
        otherTalks={[
          {
            slug: 'unrecorded',
            title: 'Unrecorded talk',
            event: 'Example chat',
            date: '2025-07-31',
            summary: 'A talk that wasn’t recorded.',
          },
        ]}
      />,
    );
    const section = screen.getByRole('region', { name: 'Other talks' });

    expect(within(section).getByRole('heading', { level: 3 })).toHaveTextContent('Unrecorded talk');
    expect(within(section).queryByRole('link')).not.toBeInTheDocument();
    expect(section).toHaveTextContent(
      'These weren’t recorded, so they don’t have their own pages.',
    );
  });

  it('leaves out “Other talks” when there are none', () => {
    renderWithRouter(<TalksPage talks={EXAMPLE_TALKS} />);

    expect(screen.queryByRole('heading', { name: 'Other talks' })).not.toBeInTheDocument();
  });

  it('gets only the talks that are ready, when the site is built', () => {
    expect(loader()).toEqual({ talks: TALKS, otherTalks: OTHER_TALKS });
  });

  it('has the page heading', () => {
    renderWithRouter(<TalksPage {...loader()} />);

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
      href: 'http://localhost:4173/talks/',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<TalksPage talks={EXAMPLE_TALKS} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
