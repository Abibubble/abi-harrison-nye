import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';

import * as Accessibility from './accessibility';
import * as Articles from './articles';
import * as Contact from './contact';
import * as Cv from './cv';
import * as Privacy from './privacy';
import * as Projects from './projects';
import * as Talks from './talks';
import * as Work from './work';

// Sections that are still placeholders. Each moves to its own test file when it's built.
const PLACEHOLDERS: [string, { default: ComponentType; meta: () => unknown }][] = [
  ['Work', Work],
  ['Projects', Projects],
  ['Talks', Talks],
  ['Articles', Articles],
  ['CV', Cv],
  ['Contact', Contact],
  ['Accessibility', Accessibility],
  ['Privacy', Privacy],
];

describe.each(PLACEHOLDERS)('%s page', (title, page) => {
  it('has the section name as its heading', () => {
    const Page = page.default;
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  });

  it('has a page title that leads with the section name', () => {
    expect(page.meta()).toEqual([{ title: `${title}, Abi Harrison-Nye` }]);
  });
});
