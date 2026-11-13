import { type RenderResult, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';

export function renderWithRouter(ui: ReactElement, { path = '/' } = {}): RenderResult {
  return render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);
}

/**
 * The section a heading starts, found by the heading's name. Sections aren't landmarks, so they
 * can't be found by role, but their heading is how people find them
 */
export function sectionNamed(name: string | RegExp): HTMLElement {
  const section = screen.getByRole('heading', { name }).closest('section');
  if (!section) throw new Error(`The heading “${String(name)}” isn’t at the start of a section.`);

  return section;
}
