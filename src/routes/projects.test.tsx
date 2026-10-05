import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Projects, { ProjectsPage, meta } from './projects';

const EXAMPLE_PROJECTS = [
  { name: 'First project', summary: 'The first one.', tech: ['React'] },
  { name: 'Second project', summary: 'The second one.', tech: [] },
];

describe('Projects page', () => {
  it('has the page heading', () => {
    renderWithRouter(<Projects />);

    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
  });

  it('says projects are coming when there are none yet', () => {
    renderWithRouter(<ProjectsPage projects={[]} />);

    expect(screen.getByText('I’m adding my projects here soon.')).toBeInTheDocument();
  });

  it('lists each project with its own heading', () => {
    renderWithRouter(<ProjectsPage projects={EXAMPLE_PROJECTS} />);

    expect(screen.getByRole('heading', { level: 2, name: 'First project' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Second project' })).toBeInTheDocument();
    expect(screen.queryByText('I’m adding my projects here soon.')).not.toBeInTheDocument();
  });

  it('has a title and description', () => {
    expect(meta()).toEqual([
      { title: 'Projects, Abi Harrison-Nye' },
      expect.objectContaining({ name: 'description' }),
    ]);
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<ProjectsPage projects={EXAMPLE_PROJECTS} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
