import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FullName } from './FullName';

describe('FullName', () => {
  it('shows my full name', () => {
    render(
      <p>
        <FullName />
      </p>,
    );

    expect(screen.getByText(/^Abi/).closest('p')).toHaveTextContent('Abi Harrison-Nye');
  });

  it('keeps my surname together, so it never splits at its hyphen', () => {
    render(<FullName />);

    expect(screen.getByText('Harrison-Nye').tagName).toBe('SPAN');
  });
});
