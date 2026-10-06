import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Privacy, { meta } from './privacy';

const region = (name: string) => screen.getByRole('region', { name });

describe('Privacy page', () => {
  it('has the page heading, and sums up what’s collected first', () => {
    renderWithRouter(<Privacy />);

    expect(screen.getByRole('heading', { level: 1, name: 'Privacy' })).toBeInTheDocument();
    expect(
      screen.getByText(/the only personal information it collects is what you choose to send/),
    ).toHaveTextContent('There’s no tracking, analytics or advertising, and no cookies.');
  });

  it('lists every section at the top, each linking to a heading that can take focus', () => {
    renderWithRouter(<Privacy />);

    const links = within(screen.getByRole('navigation', { name: 'On this page' })).getAllByRole(
      'link',
    );
    for (const link of links) {
      const target = document.getElementById(link.getAttribute('href')?.slice(1) ?? '');
      expect(target?.tagName, link.textContent).toBe('H2');
      expect(target).toHaveTextContent(link.textContent);
    }
  });

  it('has the contact form’s section where the form links to', () => {
    renderWithRouter(<Privacy />);

    expect(document.getElementById('contact-form')).toHaveTextContent('The contact form');
  });

  it('explains what the contact form collects, why, who delivers it and how long it’s kept', () => {
    renderWithRouter(<Privacy />);

    const section = region('The contact form');
    expect(section).toHaveTextContent('your name');
    expect(section).toHaveTextContent('your email address');
    expect(section).toHaveTextContent('legitimate interests');
    expect(section).toHaveTextContent('up to 12 months after my last reply');
    expect(within(section).getByRole('link', { name: /EmailJS’s privacy policy/ })).toHaveAttribute(
      'href',
      'https://www.emailjs.com/legal/privacy-policy/',
    );
  });

  it('writes out abbreviations in full the first time', () => {
    renderWithRouter(<Privacy />);

    expect(region('Who’s responsible for your information')).toHaveTextContent(
      'United Kingdom (UK) data protection law',
    );
    expect(region('The contact form')).toHaveTextContent(
      'General Data Protection Regulation (GDPR)',
    );
  });

  it('explains people’s rights, and how to complain', () => {
    renderWithRouter(<Privacy />);

    const section = region('Your rights');
    expect(within(section).getByRole('link', { name: 'contact form' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(
      within(section).getByRole('link', { name: /Information Commissioner’s Office/ }),
    ).toHaveAttribute('href', 'https://ico.org.uk/make-a-complaint/');
  });

  it('explains what the display settings store, linking to them', () => {
    renderWithRouter(<Privacy />);

    const section = region('Display settings');
    expect(section).toHaveTextContent('never sent to me or anyone else');
    expect(within(section).getByRole('link', { name: 'display settings' })).toHaveAttribute(
      'href',
      '/accessibility#display-settings',
    );
  });

  it('covers tracking, other sites and hosting, and says when it was last updated', () => {
    renderWithRouter(<Privacy />);

    expect(region('No tracking')).toHaveTextContent(
      'doesn’t use cookies, analytics or advertising',
    );
    expect(region('Other sites')).toHaveTextContent('Nothing from YouTube loads here');
    expect(region('Hosting')).toHaveTextContent('hosted by Vercel');
    expect(region('Changes to this notice')).toHaveTextContent(
      'It was last updated on 6 October 2026.',
    );
  });

  it('never shows an email address, as the form is the only way to get in touch', () => {
    const { container } = renderWithRouter(<Privacy />);

    expect(container.textContent).not.toMatch(/\S+@\S+\.\S+/);
  });

  it('has a title and description', () => {
    expect(meta()).toEqual([
      { title: 'Privacy, Abi Harrison-Nye' },
      expect.objectContaining({ name: 'description' }),
    ]);
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<Privacy />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
