import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OTHER_TALKS, TALKS, type Talk } from '../content/talks';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter, sectionNamed } from '../test/render';
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
  it('links to the neurodiversity talks, saying how many there are, so they don’t bury the recorded talks', () => {
    renderWithRouter(<TalksPage talks={EXAMPLE_TALKS} otherTalkCount={19} />);
    const section = sectionNamed('More talks');

    expect(within(section).getByRole('link', { name: 'Neurodiversity talks' })).toHaveAttribute(
      'href',
      '/talks/neurodiversity',
    );
    expect(section).toHaveTextContent('19 short talks I’ve given at giffgaff');
  });

  it('leaves out “More talks” when there are no neurodiversity talks', () => {
    renderWithRouter(<TalksPage talks={EXAMPLE_TALKS} />);

    expect(screen.queryByRole('heading', { name: 'More talks' })).not.toBeInTheDocument();
  });

  it('gets only the talks that are ready, when the site is built', () => {
    expect(loader()).toEqual({ talks: TALKS, otherTalkCount: OTHER_TALKS.length });
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
      href: 'http://localhost:4174/talks/',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<TalksPage talks={EXAMPLE_TALKS} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
