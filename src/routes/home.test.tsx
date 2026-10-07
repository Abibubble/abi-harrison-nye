import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HOME_SIGNPOSTS } from '../content/home';
import { RECOGNITION } from '../content/recognition';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import { personSchema } from '../seo/person';
import Home, { meta } from './home';

describe('Home page', () => {
  it('has my name as the page heading, with my headline', () => {
    renderWithRouter(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: 'Abi Harrison-Nye' })).toBeInTheDocument();
    expect(screen.getByText('Software engineer and accessibility specialist')).toBeInTheDocument();
  });

  it('expands HAND the first time it appears (WCAG 3.1.4)', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText(/the founder and current Lead/)).toHaveTextContent(
      'the founder and current Lead for the Home of Accessibility and NeuroDiversity (HAND),',
    );
  });

  it('links to every section, with a description of each', () => {
    renderWithRouter(<Home />);
    const section = screen.getByRole('region', { name: 'Find out more' });

    for (const signpost of HOME_SIGNPOSTS) {
      expect(within(section).getByRole('link', { name: signpost.title })).toHaveAttribute(
        'href',
        signpost.to,
      );
    }
  });

  it('lists my recognition', () => {
    renderWithRouter(<Home />);
    const section = screen.getByRole('region', { name: 'Recognition' });

    expect(within(section).getAllByRole('listitem')).toHaveLength(RECOGNITION.length);
  });

  it('has a section about life outside work', () => {
    renderWithRouter(<Home />);

    expect(screen.getByRole('region', { name: 'Outside work' })).toHaveTextContent(
      'brass musician',
    );
  });

  it('has a descriptive page title and description', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Abi Harrison-Nye, Software Engineer' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4173/',
    });
  });

  it('tells search engines who the site belongs to, with structured data', () => {
    expect(meta()).toContainEqual({ 'script:ld+json': personSchema() });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<Home />);

    // The page is tested on its own here, outside the site's landmarks
    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
