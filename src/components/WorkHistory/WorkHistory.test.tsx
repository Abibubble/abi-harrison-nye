import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Company } from '../../content/work';
import { expectNoAxeViolations } from '../../test/axe';
import { nth } from '../../test/nth';
import { renderWithRouter } from '../../test/render';
import { WorkHistory } from './WorkHistory';

const COMPANIES: Company[] = [
  {
    name: 'Example Company',
    roles: [
      {
        title: 'Software Engineer',
        from: '2021-08',
        location: 'London (hybrid)',
        summary: 'Worked across several teams.',
        highlightGroups: [
          { heading: 'Engineering', highlights: ['Built things.', 'Fixed things.'] },
          { heading: 'Accessibility', highlights: ['Audited things.'] },
        ],
      },
    ],
    sitesWorkedOn: [
      { name: 'example.com', href: 'https://example.com', description: 'The main site.' },
    ],
  },
  {
    name: 'Earlier Company',
    earlierCareer: true,
    roles: [{ title: 'Shift Leader', from: '2012-02', to: '2017-04', highlightGroups: [] }],
  },
];

describe('WorkHistory', () => {
  it('gives each company a section named by its heading, at the level asked for', () => {
    renderWithRouter(<WorkHistory companies={COMPANIES} headingLevel={2} />);

    expect(screen.getByRole('region', { name: 'Example Company' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Earlier Company' })).toBeInTheDocument();
  });

  it('puts roles and highlights at the levels below, so the outline makes sense', () => {
    renderWithRouter(<WorkHistory companies={COMPANIES} headingLevel={3} />);

    expect(
      screen.getByRole('heading', { level: 4, name: 'Software Engineer' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 5, name: 'Engineering' })).toBeInTheDocument();
  });

  it('shows each role’s dates in words, with its location and summary', () => {
    renderWithRouter(<WorkHistory companies={COMPANIES} headingLevel={2} />);
    const role = nth(screen.getAllByRole('article'), 0);

    expect(role).toHaveTextContent('August 2021 to present, London (hybrid)');
    expect(role).toHaveTextContent('Worked across several teams.');
  });

  it('lists the highlights in each group', () => {
    renderWithRouter(<WorkHistory companies={COMPANIES} headingLevel={2} />);
    const role = nth(screen.getAllByRole('article'), 0);

    expect(within(role).getAllByRole('listitem')).toHaveLength(3);
  });

  it('shows a finished role’s end date, and copes with no location or highlights', () => {
    renderWithRouter(<WorkHistory companies={COMPANIES} headingLevel={2} />);
    const role = nth(screen.getAllByRole('article'), 1);

    expect(role).toHaveTextContent('February 2012 to April 2017');
    expect(within(role).queryByRole('list')).not.toBeInTheDocument();
  });

  it('links to the sites worked on, marked as external', () => {
    renderWithRouter(<WorkHistory companies={COMPANIES} headingLevel={2} />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'Sites I’ve worked on' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'example.com (external site)' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<WorkHistory companies={COMPANIES} headingLevel={2} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
