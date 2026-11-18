import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OTHER_TALKS, TALKS, type Talk } from '../content/talks';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import { NeurodiversityTalksPage, loader, meta } from './neurodiversity-talks';

const UNRECORDED: Talk[] = [
  {
    slug: 'unrecorded',
    title: 'Unrecorded talk',
    event: 'Example chat',
    date: '2025-07-31',
    summary: 'A talk that wasn’t recorded.',
    notRecorded: true,
  },
];

describe('Neurodiversity talks page', () => {
  it('has the page heading, and explains why there are no recordings', () => {
    const { container } = renderWithRouter(<NeurodiversityTalksPage talks={UNRECORDED} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Neurodiversity talks' }),
    ).toBeInTheDocument();
    expect(container).toHaveTextContent(
      'There’s no recording of these to share, so they don’t have their own pages. Where I still have my script or slides, you can read them.',
    );
    expect(container).toHaveTextContent(
      'Each one starts with a 10 to 15 minute talk from me, with no slides, followed by 45 minutes of safe space discussion.',
    );
  });

  it('lists each talk with its own heading, with no link to a talk page', () => {
    renderWithRouter(<NeurodiversityTalksPage talks={UNRECORDED} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Unrecorded talk');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('gets only the talks that are ready, when the site is built', () => {
    expect(loader()).toEqual({ talks: OTHER_TALKS });
  });

  it('has an address no talk can take', () => {
    expect([...TALKS, ...OTHER_TALKS].map((talk) => talk.slug)).not.toContain('neurodiversity');
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Neurodiversity talks, Abi Harrison-Nye' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4174/talks/neurodiversity/',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<NeurodiversityTalksPage talks={UNRECORDED} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
