import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Contact, { meta } from './contact';

describe('Contact page', () => {
  it('has the page heading and the form', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Your message' })).toBeInTheDocument();
  });

  it('says up front that every field is needed, and that the message can be checked first', () => {
    renderWithRouter(<Contact />);

    expect(screen.getByText(/All fields are required/)).toHaveTextContent(
      'You’ll be able to check your message before it’s sent.',
    );
  });

  it('never shows an email address, as the form is the only way to get in touch', () => {
    const { container } = renderWithRouter(<Contact />);

    expect(container.textContent).not.toMatch(/\S+@\S+\.\S+/);
  });

  it('has a title and description', () => {
    expect(meta()).toEqual([
      { title: 'Contact, Abi Harrison-Nye' },
      expect.objectContaining({ name: 'description' }),
    ]);
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<Contact />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
