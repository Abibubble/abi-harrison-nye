import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Talk } from '../../content/talks';
import { renderTranscriptPage } from '../../content/transcripts';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { TalkTranscript } from './TalkTranscript';

const TALK: Talk = {
  slug: 'example-talk',
  title: 'Example talk',
  event: 'Example meetup',
  date: '2025-03-14',
  summary: 'A talk used to test this component',
};

const TWO_SECTIONS = renderTranscriptPage(
  '### Introduction\n\nHello.\n\n### Questions\n\nAny questions?',
);

function renderTranscript(content = TWO_SECTIONS) {
  return renderWithRouter(
    <TalkTranscript talk={TALK} transcriptHtml={content.html} sections={content.sections} />,
  );
}

describe('TalkTranscript', () => {
  it('has the talk’s title in the page heading, with the event, place and date', () => {
    renderTranscript();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Transcript: Example talk' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Example meetup/)).toHaveTextContent('Example meetup, 14 March 2025');
  });

  it('lists the sections, linking to each one’s heading', () => {
    renderTranscript();
    const contents = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(contents).getAllByRole('link');

    expect(links.map((link) => link.textContent)).toEqual(['Introduction', 'Questions']);
    for (const link of links) {
      const id = link.getAttribute('href')?.slice(1) ?? '';
      expect(document.getElementById(id)?.tagName).toBe('H2');
    }
  });

  it('leaves out the contents when there’s only one section', () => {
    renderTranscript(renderTranscriptPage('### Introduction\n\nHello.'));

    expect(screen.queryByRole('navigation', { name: 'On this page' })).not.toBeInTheDocument();
  });

  it('links back to the talk at the top and bottom', () => {
    renderTranscript();
    const links = screen.getAllByRole('link', { name: 'Back to “Example talk”' });

    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute('href', '/talks/example-talk');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderTranscript();

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
