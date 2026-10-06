import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { PlainSummary } from './PlainSummary';

describe('PlainSummary', () => {
  it('sums up my work in plain words', () => {
    renderWithRouter(<PlainSummary />);

    expect(screen.getByText('In short:').parentElement).toHaveTextContent(
      'In short: I’m a software engineer at giffgaff.',
    );
  });

  it('keeps every sentence short (WCAG 3.1.5)', () => {
    renderWithRouter(<PlainSummary />);

    const text = screen.getByText('In short:').parentElement?.textContent ?? '';
    for (const sentence of text.split(/(?<=\.)\s+/)) {
      expect(sentence.split(' ').length, sentence).toBeLessThanOrEqual(18);
    }
  });

  it('links to the glossary for the technical words (WCAG 3.1.3)', () => {
    renderWithRouter(<PlainSummary />);

    expect(screen.getByRole('link', { name: 'glossary' })).toHaveAttribute(
      'href',
      '/accessibility#glossary',
    );
  });

  it('isn’t printed', () => {
    const { container } = renderWithRouter(<PlainSummary />);

    expect(container.firstElementChild).toHaveAttribute('data-print', 'hide');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<PlainSummary />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
