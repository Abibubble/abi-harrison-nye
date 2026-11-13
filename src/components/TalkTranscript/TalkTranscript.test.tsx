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

  it('names another time the talk was given in the heading, with that event and date', () => {
    renderWithRouter(
      <TalkTranscript
        talk={TALK}
        alsoGiven={{
          description: 'a shorter version',
          event: 'Example demo day',
          date: '2025-07-10',
          href: 'https://youtu.be/example',
        }}
        transcriptHtml={TWO_SECTIONS.html}
        sections={TWO_SECTIONS.sections}
      />,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Transcript: Example talk (a shorter version)',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Example demo day/)).toHaveTextContent(
      'Example demo day, 10 July 2025',
    );
    expect(screen.getAllByRole('link', { name: 'Back to “Example talk”' })[0]).toHaveAttribute(
      'href',
      '/talks/example-talk',
    );
  });

  it('says a talk that wasn’t recorded has my script as its transcript, linking back to other talks', () => {
    renderWithRouter(
      <TalkTranscript
        talk={{ ...TALK, notRecorded: true, transcriptFromScript: true }}
        transcriptHtml={TWO_SECTIONS.html}
        sections={TWO_SECTIONS.sections}
      />,
    );

    expect(screen.getByText(/no recording of this talk/)).toHaveTextContent(
      'There’s no recording of this talk to share, so this transcript is my script. What I said on the day may be a little different.',
    );
    expect(screen.getAllByRole('link', { name: 'Back to other talks' })[0]).toHaveAttribute(
      'href',
      '/talks#other-talks',
    );
  });

  it('starts with a summary in plain words, when the talk has one (WCAG 3.1.5)', () => {
    renderWithRouter(
      <TalkTranscript
        talk={{ ...TALK, plainSummary: 'This talk is about examples.' }}
        transcriptHtml={TWO_SECTIONS.html}
        sections={TWO_SECTIONS.sections}
      />,
    );

    expect(screen.getByText('In short:').parentElement).toHaveTextContent(
      'In short: This talk is about examples.',
    );
  });

  it('has no plain summary when the talk has none', () => {
    renderTranscript();

    expect(screen.queryByText('In short:')).not.toBeInTheDocument();
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
