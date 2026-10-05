import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../test/axe';
import Home, { meta } from './home';

describe('Home page', () => {
  it('shows the site owner as the page heading', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: 'Abi Harrison-Nye' })).toBeInTheDocument();
  });

  it('puts the content in a main landmark', () => {
    render(<Home />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has a descriptive page title and description', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Abi Harrison-Nye, Software Engineer' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<Home />);

    await expectNoAxeViolations(container);
  });
});
