import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PrintButton } from './PrintButton';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PrintButton', () => {
  it('opens the print dialog', async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    render(<PrintButton />);

    await user.click(screen.getByRole('button', { name: 'Print or save as PDF' }));

    expect(print).toHaveBeenCalledTimes(1);
  });

  it('is left off the printed page', () => {
    render(<PrintButton />);

    expect(screen.getByRole('button')).toHaveAttribute('data-print', 'hide');
  });
});
