import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import NotFound, { meta } from './not-found';

describe('Not found page', () => {
  it('says the page was not found and how to fix the address', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByText(/check you copied the whole address/)).toBeInTheDocument();
  });

  it('links back to the home page', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('link', { name: 'go to the home page' })).toHaveAttribute('href', '/');
  });

  it('has a clear title and asks search engines not to list it', () => {
    expect(meta()).toEqual([
      { title: 'Page not found, Abi Harrison-Nye' },
      { name: 'robots', content: 'noindex' },
    ]);
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<NotFound />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
