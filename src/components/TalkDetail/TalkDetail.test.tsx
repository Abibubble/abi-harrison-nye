import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Talk } from '../../content/talks';
import { renderWithRouter } from '../../test/render';
import { TalkDetail } from './TalkDetail';

const TALK: Talk = {
  slug: 'example-talk',
  title: 'Example talk',
  event: 'Example meetup',
  location: 'Online',
  date: '2025-03',
  summary: 'A talk used to test this component.',
};

describe('TalkDetail', () => {
  it('calls the section “Slides” when there are slides but no video', () => {
    renderWithRouter(
      <TalkDetail
        talk={{ ...TALK, slidesHref: 'https://example.com/slides' }}
        transcriptHtml="<p>Hello</p>"
      />,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Slides' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /on YouTube/ })).not.toBeInTheDocument();
  });

  it('leaves out the video and slides section when there are neither', () => {
    renderWithRouter(<TalkDetail talk={TALK} transcriptHtml="<p>Hello</p>" />);

    expect(screen.queryByRole('heading', { name: 'Slides' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Watch the talk' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Transcript' })).toBeInTheDocument();
  });
});
