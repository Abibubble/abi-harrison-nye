import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

import type { TalkPageData } from '../content/talkPage';
import { renderTranscript } from '../content/transcripts';
import { expectNoAxeViolations } from '../test/axe';
import { pageMeta } from '../seo/pageMeta';
import Talk, { loader, meta, slugFrom } from './talk';

const PAGE: TalkPageData = {
  talk: {
    slug: 'example-talk',
    title: 'Example talk',
    event: 'Example conference',
    location: 'London',
    date: '2026-06-12',
    summary: 'A talk used to test this page.',
    video: {
      href: 'https://www.youtube.com/watch?v=example',
      captions: false,
      describedAloud: false,
    },
    slidesHref: 'https://example.com/slides',
  },
  transcriptHtml: renderTranscript('### Introduction\n\nOn screen: the title slide.'),
};

function renderTalk() {
  const Stub = createRoutesStub([{ path: '/talks/:slug', Component: Talk, loader: () => PAGE }]);
  return render(<Stub initialEntries={['/talks/example-talk']} />);
}

describe('Talk page', () => {
  it('has the talk’s title as the page heading, with the event, place and date', async () => {
    renderTalk();

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Example talk' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Example conference/)).toHaveTextContent(
      'Example conference, London, 12 June 2026',
    );
  });

  it('links to the video and slides, and says captions are coming', async () => {
    renderTalk();

    expect(
      await screen.findByRole('link', { name: 'Watch “Example talk” on YouTube (external site)' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Slides for “Example talk” (external site)' }),
    ).toHaveAttribute('href', 'https://example.com/slides');
    expect(screen.getByText(/Captions aren’t available/)).toBeInTheDocument();
  });

  it('has the transcript under its own heading, which links can move focus to', async () => {
    renderTalk();
    const heading = await screen.findByRole('heading', { level: 2, name: 'Transcript' });

    expect(heading).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('region', { name: 'Transcript' })).toHaveTextContent(
      'On screen: the title slide.',
    );
  });

  it('links back to all the talks', async () => {
    renderTalk();

    expect(await screen.findByRole('link', { name: 'See all my talks' })).toHaveAttribute(
      'href',
      '/talks',
    );
  });

  it('has the talk’s title and summary as its page title and description, at its own address', () => {
    const args = { loaderData: PAGE } as Parameters<typeof meta>[0];

    expect(meta(args)).toEqual(
      pageMeta({
        title: 'Example talk, Abi Harrison-Nye',
        description: 'A talk used to test this page.',
        path: `/talks/${PAGE.talk.slug}`,
      }),
    );
  });

  it('has no page title of its own when there’s no talk, leaving it to the not found page', () => {
    const args = { loaderData: undefined } as Parameters<typeof meta>[0];

    expect(meta(args)).toEqual([]);
  });

  it.each([
    'http://localhost/talks/debt-to-done',
    'http://localhost/talks/debt-to-done/',
    'http://localhost/talks/debt-to-done.data',
  ])('finds the talk’s slug in its address: %s', (url) => {
    expect(slugFrom(url)).toBe('debt-to-done');
  });

  it.each(['http://localhost/talks/not-a-real-talk', 'http://localhost/talks/'])(
    'gives a 404 for an address that isn’t a talk: %s',
    (url) => {
      const args = { request: new Request(url) } as Parameters<typeof loader>[0];
      let thrown: unknown;
      try {
        loader(args);
      } catch (error) {
        thrown = error;
      }

      expect((thrown as { init?: { status?: number } }).init?.status).toBe(404);
    },
  );

  it('has no detectable accessibility issues', async () => {
    const { container } = renderTalk();
    await screen.findByRole('heading', { level: 1 });

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
