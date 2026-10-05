import { screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FOOTER_NAV } from '../../content/navigation';
import { PROFILE_LINKS } from '../../content/profile';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('is the content info landmark, and is left out of printed pages', () => {
    renderWithRouter(<SiteFooter />);

    expect(screen.getByRole('contentinfo')).toHaveAttribute('data-print', 'hide');
  });

  it('links to the accessibility and privacy pages', () => {
    renderWithRouter(<SiteFooter />);
    const footerNav = screen.getByRole('navigation', { name: 'Footer' });

    for (const item of FOOTER_NAV) {
      expect(within(footerNav).getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        item.to,
      );
    }
  });

  it('links to profiles on other sites, marked as external', () => {
    renderWithRouter(<SiteFooter />);

    for (const profile of PROFILE_LINKS) {
      expect(
        screen.getByRole('link', { name: `${profile.label} (external site)` }),
      ).toHaveAttribute('href', profile.href);
    }
  });

  it('shows the copyright with the current year', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2031-06-01T12:00:00Z'));

    renderWithRouter(<SiteFooter />);
    vi.useRealTimers();

    expect(screen.getByText('© 2031 Abi Harrison-Nye')).toBeInTheDocument();
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<SiteFooter />);

    await expectNoAxeViolations(container);
  });
});
