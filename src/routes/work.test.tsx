import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WORK } from '../content/work';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Work, { meta } from './work';

describe('Work page', () => {
  it('has the page heading', () => {
    renderWithRouter(<Work />);

    expect(screen.getByRole('heading', { level: 1, name: 'Work' })).toBeInTheDocument();
  });

  it('shows tech roles in full, but not the roles before tech', () => {
    renderWithRouter(<Work />);

    for (const company of WORK) {
      const heading = screen.queryByRole('heading', { level: 2, name: company.name });
      if (company.earlierCareer) {
        expect(heading).not.toBeInTheDocument();
      } else {
        expect(heading).toBeInTheDocument();
      }
    }
  });

  it('summarises the roles before tech, linking to the CV for the full detail', () => {
    renderWithRouter(<Work />);

    expect(screen.getByRole('region', { name: 'Before tech' })).toHaveTextContent('hospitality');
    expect(screen.getByRole('link', { name: 'my CV' })).toHaveAttribute('href', '/cv');
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Work, Abi Harrison-Nye' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4173/work/',
    });
  });

  it('lists the sites I’ve volunteered on, in their own section', () => {
    renderWithRouter(<Work />);

    const section = within(screen.getByRole('region', { name: 'Volunteering' }));
    expect(section.getByRole('link', { name: /attractionsource\.com/ })).toHaveAttribute(
      'href',
      'https://attractionsource.com',
    );
    expect(section.getByRole('link', { name: /towerstimes\.co\.uk/ })).toBeInTheDocument();
  });

  it('lists every giffgaff site I’ve worked on under giffgaff', () => {
    renderWithRouter(<Work />);

    const giffgaff = within(screen.getByRole('region', { name: 'giffgaff' }));
    for (const name of [/giffgaff\.com/, /giffgaff Inclusion Toolkit/, /giffgaff\.design/]) {
      expect(giffgaff.getByRole('link', { name })).toBeInTheDocument();
    }
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<Work />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
