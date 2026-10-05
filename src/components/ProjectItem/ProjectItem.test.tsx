import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Project } from '../../content/projects';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { ProjectItem } from './ProjectItem';

const PROJECT: Project = {
  name: 'Example project',
  summary: 'A project used to test this component.',
  tech: ['React', 'TypeScript'],
  href: 'https://example.com',
  codeHref: 'https://github.com/example/example',
};

describe('ProjectItem', () => {
  it('shows the project’s name as a heading, with its summary', () => {
    renderWithRouter(<ProjectItem project={PROJECT} headingLevel={2} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Example project' })).toBeInTheDocument();
    expect(screen.getByText('A project used to test this component.')).toBeInTheDocument();
  });

  it('lists the technologies used, named for this project', () => {
    renderWithRouter(<ProjectItem project={PROJECT} headingLevel={2} />);

    expect(
      screen.getByRole('list', { name: 'Technologies used for Example project' }),
    ).toBeInTheDocument();
  });

  it('has links that make sense on their own, naming the project (WCAG 2.4.9)', () => {
    renderWithRouter(<ProjectItem project={PROJECT} headingLevel={2} />);

    expect(
      screen.getByRole('link', { name: 'See Example project (external site)' }),
    ).toHaveAttribute('href', 'https://example.com');
    expect(
      screen.getByRole('link', { name: 'Read the code for Example project (external site)' }),
    ).toHaveAttribute('href', 'https://github.com/example/example');
  });

  it('leaves out tags and links it doesn’t have', () => {
    renderWithRouter(
      <ProjectItem
        project={{ name: 'Bare project', summary: 'Nothing else.', tech: [] }}
        headingLevel={2}
      />,
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('shows the code link on its own when there’s no live site', () => {
    renderWithRouter(<ProjectItem project={{ ...PROJECT, href: undefined }} headingLevel={2} />);

    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<ProjectItem project={PROJECT} headingLevel={2} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
