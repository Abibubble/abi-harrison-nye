import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ABBREVIATIONS } from '../../content/abbreviations';
import { Abbr } from './Abbr';

describe('Abbr', () => {
  it('marks up the abbreviation with its full form', () => {
    const { container } = render(<Abbr name="WCAG" />);
    const abbr = container.querySelector('abbr');

    expect(abbr).toHaveTextContent('WCAG');
    expect(abbr).toHaveAttribute('title', 'Web Content Accessibility Guidelines');
  });

  it('writes the full form out in the text when expanded, for its first use on a page', () => {
    const { container } = render(
      <p>
        <Abbr name="WCAG" expand />
      </p>,
    );

    expect(container).toHaveTextContent('Web Content Accessibility Guidelines (WCAG)');
  });

  it('has a real full form for every abbreviation, with no stray spaces', () => {
    for (const [abbreviation, fullForm] of Object.entries(ABBREVIATIONS)) {
      expect(fullForm.trim(), abbreviation).toBe(fullForm);
      expect(fullForm.length, abbreviation).toBeGreaterThan(abbreviation.length);
    }
  });
});
