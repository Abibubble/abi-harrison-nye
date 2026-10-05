import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('is the banner landmark', () => {
    renderWithRouter(<SiteHeader />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('links the site name to the home page, saying so for screen reader users', () => {
    renderWithRouter(<SiteHeader />);

    expect(
      within(screen.getByRole('banner')).getByRole('link', {
        name: 'Abi Harrison-Nye home page',
      }),
    ).toHaveAttribute('href', '/');
  });

  it('contains the main navigation', () => {
    renderWithRouter(<SiteHeader />);

    expect(
      within(screen.getByRole('banner')).getByRole('navigation', { name: 'Main' }),
    ).toBeInTheDocument();
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<SiteHeader />);

    await expectNoAxeViolations(container);
  });
});
