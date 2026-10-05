import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { displaySettingsStore } from '../settings/displaySettings';
import { expectNoAxeViolations } from '../test/axe';
import Accessibility, { meta } from './accessibility';

afterEach(() => {
  displaySettingsStore.reset();
});

describe('Accessibility page', () => {
  it('has the page heading and the display settings', () => {
    render(<Accessibility />);

    expect(screen.getByRole('heading', { level: 1, name: 'Accessibility' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Display settings' })).toBeInTheDocument();
  });

  it('has a title and description', () => {
    expect(meta()).toEqual([
      { title: 'Accessibility, Abi Harrison-Nye' },
      expect.objectContaining({ name: 'description' }),
    ]);
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<Accessibility />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
