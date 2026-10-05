import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useCurrentYear } from './useCurrentYear';

function Year() {
  return <span>{useCurrentYear()}</span>;
}

describe('useCurrentYear', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('gives the visitor’s current year in the browser', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2031-06-01T12:00:00Z'));

    render(<Year />);

    expect(screen.getByText('2031')).toBeInTheDocument();
  });

  it('gives the year the site was built when prerendering, so the HTML matches', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2031-06-01T12:00:00Z'));

    expect(renderToString(<Year />)).toBe(`<span>${__BUILD_YEAR__}</span>`);
  });
});
