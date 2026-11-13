import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ABBREVIATIONS } from '../../content/abbreviations';
import { renderWithRouter } from '../../test/render';
import { Link } from '../Link';
import { Abbr } from './Abbr';

describe('Abbr', () => {
  it('is a plain abbreviation, with nothing to focus or announce again', () => {
    expect(renderToString(<Abbr name="WCAG" />)).toBe('<abbr>WCAG</abbr>');

    render(<Abbr name="WCAG" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('stays the same once JavaScript runs, so the page doesn’t change after it loads', () => {
    const { container } = render(<Abbr name="UK" />);

    expect(container.innerHTML).toBe(renderToString(<Abbr name="UK" />));
  });

  it('can go inside a link', () => {
    renderWithRouter(
      <Link to="/cv">
        my <Abbr name="CV" />
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'my CV' }).querySelector('abbr')).toHaveTextContent(
      'CV',
    );
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
