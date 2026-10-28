import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { Talk } from '../../content/talks';
import { renderWithRouter } from '../../test/render';
import { TalkDetail } from './TalkDetail';

const TALK: Talk = {
  slug: 'example-talk',
  title: 'Example talk',
  event: 'Example meetup',
  date: '2025-03',
  summary: 'A talk used to test this component',
};

describe('TalkDetail', () => {
  it('mentions other times the talk was given, linking to each recording', () => {
    renderWithRouter(
      <TalkDetail
        talk={{
          ...TALK,
          video: { href: 'https://youtu.be/first', captions: 'accurate', describedAloud: true },
          alsoGiven: [
            {
              description: 'a shorter version',
              event: 'Example demo day',
              date: '2025-07-10',
              href: 'https://youtu.be/second',
            },
          ],
        }}
      />,
    );

    expect(screen.getByText(/I also gave a shorter version/)).toHaveTextContent(
      'I also gave a shorter version of this talk at Example demo day, on 10 July 2025.',
    );
    expect(
      screen.getByRole('link', {
        name: 'Watch a shorter version of “Example talk” on YouTube (external site)',
      }),
    ).toHaveAttribute('href', 'https://youtu.be/second');
  });

  it('links to the transcript on its own page, rather than showing it all', () => {
    renderWithRouter(<TalkDetail talk={TALK} />);

    expect(
      screen.getByRole('link', { name: 'Read the transcript of “Example talk”' }),
    ).toHaveAttribute('href', '/talks/example-talk/transcript');
  });

  it('calls the section “Slides” when there are slides but no video', () => {
    renderWithRouter(<TalkDetail talk={{ ...TALK, slidesHref: 'https://example.com/slides' }} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Slides' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /on YouTube/ })).not.toBeInTheDocument();
  });

  it('leaves out the video and slides section when there are neither', () => {
    renderWithRouter(<TalkDetail talk={TALK} />);

    expect(screen.queryByRole('heading', { name: 'Slides' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Watch the talk' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Transcript' })).toBeInTheDocument();
  });

  it('links to a slides file, saying its type and size, and that the transcript describes them', () => {
    renderWithRouter(
      <TalkDetail
        talk={{ ...TALK, slidesFile: { path: 'talks/example-slides.pdf', size: '5.8MB' } }}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'Slides for “Example talk” (PDF, 5.8MB)' }),
    ).toHaveAttribute('href', '/talks/example-slides.pdf');
    expect(screen.getByText(/the transcript describes each one/)).toBeInTheDocument();
  });

  it('puts the longer description in a section people can open', async () => {
    const user = userEvent.setup();
    renderWithRouter(<TalkDetail talk={TALK} aboutHtml="<p>All about it</p>" />);
    const more = screen.getByText('More about this talk');

    expect(screen.getByText('All about it')).not.toBeVisible();
    await user.click(more);
    expect(screen.getByText('All about it')).toBeVisible();
  });

  it('leaves out the longer description when there isn’t one', () => {
    renderWithRouter(<TalkDetail talk={TALK} />);

    expect(screen.queryByText('More about this talk')).not.toBeInTheDocument();
  });
});
