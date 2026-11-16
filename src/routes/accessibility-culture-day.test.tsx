import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BAD_A11Y } from '../content/projects';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import AccessibilityCultureDay, {
  MEETING_INVITE_TEMPLATE,
  WELCOME_TALK_PATH,
  meta,
} from './accessibility-culture-day';

describe('Accessibility Culture Day page', () => {
  it('has the page heading and the date of the day', () => {
    renderWithRouter(<AccessibilityCultureDay />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Accessibility Culture Day' }),
    ).toBeInTheDocument();
    expect(screen.getByText('22 May 2025')).toHaveAttribute('datetime', '2025-05-22');
  });

  it('has a section for each part of the day, and a heading for each workshop', () => {
    renderWithRouter(<AccessibilityCultureDay />);

    for (const name of [
      'What I did',
      'The welcome talk',
      'The workshops',
      'Including everyone',
      'What changed afterwards',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    for (const name of [
      'People and personas',
      'Spot the accessibility issues',
      'Using assistive technology',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
  });

  it('links to the welcome talk, the meeting invite template and the Projects page', () => {
    renderWithRouter(<AccessibilityCultureDay />);

    expect(screen.getByRole('link', { name: 'Watch the welcome talk' })).toHaveAttribute(
      'href',
      WELCOME_TALK_PATH,
    );
    expect(
      screen.getByRole('link', {
        name: 'meeting invite template in my Inclusion Toolkit (external site)',
      }),
    ).toHaveAttribute('href', MEETING_INVITE_TEMPLATE);
    expect(screen.getByRole('link', { name: 'See all my projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
  });

  it('links to bad-a11y wherever it’s mentioned, warning that it’s inaccessible on purpose', () => {
    renderWithRouter(<AccessibilityCultureDay />);

    const links = screen.getAllByRole('link', { name: 'bad-a11y (external site)' });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute('href', BAD_A11Y.href);
    expect(screen.getByText(`Please note: ${BAD_A11Y.warning}`)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Read the code for bad-a11y (external site)' }),
    ).toHaveAttribute('href', BAD_A11Y.codeHref);
  });

  it('names no colleagues, only how many hosts there were', () => {
    const { container } = renderWithRouter(<AccessibilityCultureDay />);

    expect(container).toHaveTextContent('9 colleagues volunteered to host the workshops.');
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Accessibility Culture Day, Abi Harrison-Nye' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4174/projects/accessibility-culture-day/',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<AccessibilityCultureDay />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
