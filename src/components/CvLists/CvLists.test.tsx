import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { nth } from '../../test/nth';
import { renderWithRouter } from '../../test/render';
import { QualificationList, SkillsList, SpeakingList } from './CvLists';

describe('SkillsList', () => {
  const groups = [
    { category: 'Languages', skills: ['TypeScript', 'Python'] },
    { category: 'Tools', skills: ['Git'] },
  ];

  it('pairs each category with its skills', () => {
    render(<SkillsList groups={groups} />);

    expect(screen.getAllByRole('term').map((term) => term.textContent)).toEqual([
      'Languages',
      'Tools',
    ]);
    expect(screen.getAllByRole('definition')[0]).toHaveTextContent('TypeScript, Python');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<SkillsList groups={groups} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});

describe('QualificationList', () => {
  it('shows each qualification with its provider, dates and result', () => {
    render(
      <QualificationList
        items={[
          {
            title: 'Diploma',
            provider: 'Example College',
            from: '2020',
            to: '2021',
            detail: 'Merit',
          },
          { title: 'Training', provider: 'Example Trainer', from: '2025-10' },
        ]}
      />,
    );
    const items = screen.getAllByRole('listitem');

    expect(nth(items, 0)).toHaveTextContent('Diploma, Example College, 2020 to 2021 Merit');
    expect(nth(items, 1)).toHaveTextContent('Training, Example Trainer, October 2025');
  });
});

describe('SpeakingList', () => {
  const talks = [
    {
      slug: 'with-page',
      title: 'Talk with a page',
      event: 'Example conference',
      location: 'London',
      date: '2025-03',
      summary: 'A talk',
    },
  ];
  const withoutPages = [
    { title: 'Talk without a page', event: 'Example meetup', location: 'Online', date: '2026-06' },
  ];

  it('lists every talk newest first', () => {
    renderWithRouter(<SpeakingList talks={talks} withoutPages={withoutPages} />);
    const items = screen.getAllByRole('listitem');

    expect(nth(items, 0)).toHaveTextContent(
      '“Talk without a page”, Example meetup, Online, June 2026',
    );
    expect(nth(items, 1)).toHaveTextContent(
      'Talk with a page, Example conference, London, March 2025',
    );
  });

  it('links only the talks that have their own page', () => {
    renderWithRouter(<SpeakingList talks={talks} withoutPages={withoutPages} />);
    const items = screen.getAllByRole('listitem');

    expect(within(nth(items, 1)).getByRole('link', { name: 'Talk with a page' })).toHaveAttribute(
      'href',
      '/talks/with-page',
    );
    expect(within(nth(items, 0)).queryByRole('link')).not.toBeInTheDocument();
  });
});
