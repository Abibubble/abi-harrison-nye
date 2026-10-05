import { type RenderResult, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';

/** Renders a component that uses links, at the given URL. */
export function renderWithRouter(ui: ReactElement, { path = '/' } = {}): RenderResult {
  return render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);
}
