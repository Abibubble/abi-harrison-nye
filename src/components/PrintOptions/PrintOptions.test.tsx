import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { PrintOptions } from './PrintOptions';

const root = document.documentElement;

describe('PrintOptions', () => {
  it('offers clear and compact layouts, with clear chosen to start with', () => {
    render(<PrintOptions />);

    expect(screen.getByRole('group', { name: 'Print layout' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Clear' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Compact' })).not.toBeChecked();
    expect(root).not.toHaveAttribute('data-print-layout');
  });

  it('applies the compact layout as soon as it’s chosen, so browser printing uses it too', async () => {
    const user = userEvent.setup();
    render(<PrintOptions />);

    await user.click(screen.getByRole('radio', { name: 'Compact' }));

    expect(root).toHaveAttribute('data-print-layout', 'compact');
  });

  it('goes back to the clear layout when it’s chosen again', async () => {
    const user = userEvent.setup();
    render(<PrintOptions />);

    await user.click(screen.getByRole('radio', { name: 'Compact' }));
    await user.click(screen.getByRole('radio', { name: 'Clear' }));

    expect(root).not.toHaveAttribute('data-print-layout');
  });

  it('stops applying the compact layout after leaving the page', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<PrintOptions />);
    await user.click(screen.getByRole('radio', { name: 'Compact' }));

    unmount();

    expect(root).not.toHaveAttribute('data-print-layout');
  });

  it('says both layouts include everything', () => {
    render(<PrintOptions />);

    expect(screen.getByRole('radio', { name: 'Compact' })).toHaveAccessibleDescription(
      'Smaller text with less space, on fewer pages. Nothing is left out.',
    );
  });

  it('has a print button, and is left off the printed page itself', () => {
    const { container } = render(<PrintOptions />);

    expect(screen.getByRole('button', { name: 'Print or save as PDF' })).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute('data-print', 'hide');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<PrintOptions />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
