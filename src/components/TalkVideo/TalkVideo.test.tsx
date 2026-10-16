import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { TalkVideo } from './TalkVideo';

const href = 'https://www.youtube.com/watch?v=example';

describe('TalkVideo', () => {
  it('links to the video on YouTube, naming the talk so the link makes sense alone', () => {
    renderWithRouter(
      <TalkVideo
        title="Example talk"
        video={{ href, captions: 'accurate', describedAloud: true }}
        transcriptId="transcript"
      />,
    );

    expect(
      screen.getByRole('link', { name: 'Watch “Example talk” on YouTube (external site)' }),
    ).toHaveAttribute('href', href);
  });

  it('says when the video has captions', () => {
    renderWithRouter(
      <TalkVideo
        title="Example talk"
        video={{ href, captions: 'accurate', describedAloud: true }}
        transcriptId="transcript"
      />,
    );

    expect(screen.getByText('The video has captions.')).toBeInTheDocument();
  });

  it('says when the captions are automatic, as they may have mistakes', () => {
    renderWithRouter(
      <TalkVideo
        title="Example talk"
        video={{ href, captions: 'automatic', describedAloud: true }}
        transcriptId="transcript"
      />,
    );

    expect(
      screen.getByText(/only has automatic captions, which may have mistakes/),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'full transcript' })).toHaveAttribute(
      'href',
      '/#transcript',
    );
  });

  it('says when captions aren’t available yet, linking to the transcript instead', () => {
    renderWithRouter(
      <TalkVideo
        title="Example talk"
        video={{ href, captions: 'none', describedAloud: false }}
        transcriptId="transcript"
      />,
    );

    expect(screen.getByText(/Captions aren’t available for this video yet/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read the full transcript' })).toHaveAttribute(
      'href',
      '/#transcript',
    );
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(
      <TalkVideo
        title="Example talk"
        video={{ href, captions: 'none', describedAloud: false }}
        transcriptId="transcript"
      />,
    );

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
