import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RECOGNITION } from '../../content/recognition';
import { expectNoAxeViolations } from '../../test/axe';
import { RecognitionList } from './RecognitionList';

describe('RecognitionList', () => {
  it('lists each award with its result, the awards and the year', () => {
    render(
      <RecognitionList
        items={[
          {
            award: 'Outstanding Diversity Network Award',
            result: 'Finalist',
            recipient: 'HAND',
            awards: 'Inclusive Awards',
            year: 2026,
          },
        ]}
      />,
    );

    expect(screen.getByRole('listitem')).toHaveTextContent(
      'Finalist: Outstanding Diversity Network Award (HAND), Inclusive Awards 2026',
    );
  });

  it('says how the winner was chosen, when it’s given', () => {
    render(
      <RecognitionList
        items={[
          {
            award: 'Most Up To Good giffgaffer',
            result: 'Winner',
            awards: 'giffgaff’s Grit & Glory Awards',
            year: 2025,
            chosenBy: 'nominated and voted for by everyone at giffgaff',
          },
        ]}
      />,
    );

    expect(screen.getByRole('listitem')).toHaveTextContent(
      'Winner: Most Up To Good giffgaffer, giffgaff’s Grit & Glory Awards 2025, nominated and voted for by everyone at giffgaff',
    );
  });

  it('has an item for every award', () => {
    render(<RecognitionList items={RECOGNITION} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(RECOGNITION.length);
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = render(<RecognitionList items={RECOGNITION} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
