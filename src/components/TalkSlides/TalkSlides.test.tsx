import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Talk } from '../../content/talks';
import { renderSlides } from '../../content/transcripts';
import { expectNoAxeViolations } from '../../test/axe';
import { renderWithRouter } from '../../test/render';
import { TalkSlides } from './TalkSlides';

const TALK: Talk = {
  slug: 'example-talk',
  title: 'Example talk',
  event: 'Example meetup',
  date: '2025-03-14',
  summary: 'A talk used to test this component',
  slidesPage: true,
};

const SLIDES = renderSlides(
  '### Slide 1\n\nThe title slide. It reads “Example talk”.\n\n### Slide 2\n\n“Questions?”, with a [link to my site](https://example.com).',
);

function renderTalkSlides(talk = TALK) {
  return renderWithRouter(<TalkSlides talk={talk} slides={SLIDES} />);
}

describe('TalkSlides', () => {
  it('has the talk’s title in the page heading, with the event and date', () => {
    renderTalkSlides();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Slides: Example talk' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Example meetup/)).toHaveTextContent('Example meetup, 14 March 2025');
  });

  it('gives each slide a heading, a picture, and its description as text', () => {
    renderTalkSlides();

    expect(screen.getByText(/There are 2 slides/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Slide 1' })).toHaveAttribute(
      'id',
      'slide-1',
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Slide 2' })).toBeInTheDocument();
    expect(screen.getByText('The title slide. It reads “Example talk”.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /link to my site/ })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('shows each slide’s picture, in two sizes, with an empty alt as the text follows it', () => {
    const { container } = renderTalkSlides();
    const pictures = [...container.querySelectorAll('img')];

    expect(pictures).toHaveLength(2);
    expect(pictures[0]).toHaveAttribute('src', '/talks/example-talk/slide-01-small.webp');
    expect(pictures[0]).toHaveAttribute(
      'srcset',
      '/talks/example-talk/slide-01-small.webp 800w, /talks/example-talk/slide-01.webp 1600w',
    );
    expect(pictures[1]).toHaveAttribute('src', '/talks/example-talk/slide-02-small.webp');
    for (const picture of pictures) {
      expect(picture).toHaveAttribute('alt', '');
      expect(picture).toHaveAttribute('width', '1600');
      expect(picture).toHaveAttribute('height', '900');
    }
  });

  it('only loads the first picture straight away', () => {
    const { container } = renderTalkSlides();
    const pictures = [...container.querySelectorAll('img')];

    expect(pictures.map((picture) => picture.getAttribute('loading'))).toEqual(['eager', 'lazy']);
  });

  it('has no PDF to download, as the page has everything the slides do', () => {
    renderTalkSlides();

    expect(screen.queryByRole('link', { name: /PDF/ })).not.toBeInTheDocument();
  });

  it('links back to the talk at the top and bottom', () => {
    renderTalkSlides();
    const links = screen.getAllByRole('link', { name: 'Back to “Example talk”' });

    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute('href', '/talks/example-talk');
  });

  it('links back to other talks for a talk that wasn’t recorded, as it has no page of its own', () => {
    renderTalkSlides({ ...TALK, notRecorded: true });
    const links = screen.getAllByRole('link', { name: 'Back to other talks' });

    expect(links).toHaveLength(2);
    for (const link of links) expect(link).toHaveAttribute('href', '/talks#other-talks');
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderTalkSlides();

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
