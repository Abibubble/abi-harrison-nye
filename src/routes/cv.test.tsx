import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SKILLS } from '../content/cv';
import { WORK } from '../content/work';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Cv, { meta } from './cv';

const section = (name: string) => screen.getByRole('region', { name });

describe('CV page', () => {
  it('has the page heading, and my name, headline and location', () => {
    renderWithRouter(<Cv />);

    expect(screen.getByRole('heading', { level: 1, name: 'CV' })).toBeInTheDocument();
    expect(screen.getByText('Abi Harrison-Nye')).toBeInTheDocument();
    expect(
      screen.getByText('Software engineer and accessibility specialist, Hertfordshire, UK'),
    ).toBeInTheDocument();
  });

  it('never shows a phone number or email address', () => {
    const { container } = renderWithRouter(<Cv />);

    expect(container.textContent).not.toMatch(/\d{5} ?\d{3} ?\d{3}/);
    expect(container.textContent).not.toMatch(/@/);
  });

  it('links to my profiles and the contact form instead', () => {
    renderWithRouter(<Cv />);

    expect(screen.getByRole('link', { name: 'GitHub (external site)' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'send me a message' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('can be printed or saved as a PDF', () => {
    renderWithRouter(<Cv />);

    expect(screen.getByRole('button', { name: 'Print or save as PDF' })).toBeInTheDocument();
  });

  it('has its sections in the same order as the CV', () => {
    renderWithRouter(<Cv />);

    expect(
      screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
    ).toEqual([
      'Profile',
      'Key skills',
      'Experience',
      'Speaking and recognition',
      'Earlier career',
      'Education and training',
      'Interests',
    ]);
  });

  it('writes HAND out in full in the profile, where it first appears', () => {
    renderWithRouter(<Cv />);

    expect(section('Profile')).toHaveTextContent('Home of Accessibility and NeuroDiversity (HAND)');
  });

  it('lists every skill group', () => {
    renderWithRouter(<Cv />);

    expect(within(section('Key skills')).getAllByRole('term')).toHaveLength(SKILLS.length);
  });

  it('puts tech roles under experience and earlier roles in their own section', () => {
    renderWithRouter(<Cv />);

    for (const company of WORK) {
      const sectionName = company.earlierCareer ? 'Earlier career' : 'Experience';
      expect(
        within(section(sectionName)).getByRole('heading', { level: 3, name: company.name }),
      ).toBeInTheDocument();
    }
  });

  it('lists the LDX3 talk under speaking', () => {
    renderWithRouter(<Cv />);

    expect(section('Speaking and recognition')).toHaveTextContent(
      'Moving accessibility from debt to done at giffgaff',
    );
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'CV, Abi Harrison-Nye' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4173/cv',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<Cv />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
