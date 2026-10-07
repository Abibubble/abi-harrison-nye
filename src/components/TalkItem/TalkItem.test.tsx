import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Talk } from '../../content/talks';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { TalkItem } from './TalkItem';

const TALK: Talk = {
  slug: 'example-talk',
  title: 'Example talk',
  event: 'Example conference',
  location: 'London',
  date: '2026-06',
  summary: 'A talk used to test this component',
  video: { href: 'https://www.youtube.com/watch?v=example', captions: true, describedAloud: true },
};

describe('TalkItem', () => {
  it('has the talk’s title as a linked heading, going to its page', () => {
    renderWithRouter(<TalkItem talk={TALK} headingLevel={2} />);
    const heading = screen.getByRole('heading', { level: 2 });

    expect(within(heading).getByRole('link', { name: 'Example talk' })).toHaveAttribute(
      'href',
      '/talks/example-talk',
    );
  });

  it('shows the event, place and date in words, with the summary', () => {
    renderWithRouter(<TalkItem talk={TALK} headingLevel={2} />);

    expect(screen.getByText(/Example conference/)).toHaveTextContent(
      'Example conference, London, June 2026',
    );
    expect(screen.getByText('A talk used to test this component')).toBeInTheDocument();
  });

  it.each([
    [
      { href: 'https://www.youtube.com/watch?v=a', captions: true, describedAloud: true },
      'Video with captions, and transcript',
    ],
    [
      { href: 'https://www.youtube.com/watch?v=a', captions: false, describedAloud: false },
      'Video and transcript',
    ],
    [undefined, 'Transcript'],
  ])('says what’s available: %o gives “%s”', (video, summary) => {
    renderWithRouter(<TalkItem talk={{ ...TALK, video }} headingLevel={2} />);

    expect(screen.getByText(summary, { exact: true })).toBeInTheDocument();
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<TalkItem talk={TALK} headingLevel={2} />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
