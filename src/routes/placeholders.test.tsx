import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';

import * as Privacy from './privacy';

// Sections that are still placeholders. Each moves to its own test file when it's built.
const PLACEHOLDERS: [string, { default: ComponentType; meta: () => unknown }][] = [
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
