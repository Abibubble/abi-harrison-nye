import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { nth } from '../../test/nth';
import { renderWithRouter } from '../../test/render';
import { SignpostList } from './SignpostList';

const SIGNPOSTS = [
  { title: 'Work', to: '/work', description: 'What I do at giffgaff' },
  { title: 'Talks', to: '/talks', description: 'Talks I’ve given' },
];

describe('SignpostList', () => {
  it('is a list of cards, each with its page name as a linked heading', () => {
    renderWithRouter(<SignpostList signposts={SIGNPOSTS} headingLevel={3} />);
    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(2);
    const heading = within(nth(items, 0)).getByRole('heading', { level: 3 });
    expect(within(heading).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work');
    expect(items[0]).toHaveTextContent('What I do at giffgaff');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<SignpostList signposts={SIGNPOSTS} headingLevel={3} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
