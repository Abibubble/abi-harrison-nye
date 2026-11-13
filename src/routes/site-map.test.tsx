import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FOOTER_NAV, MAIN_NAV } from '../content/navigation';
import { OTHER_TALKS, TALKS, type Talk } from '../content/talks';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter, sectionNamed } from '../test/render';
import { SiteMapPage, loader, meta } from './site-map';

const RECORDED: Talk = {
  slug: 'debt-to-done',
  title: 'Debt to done',
  event: 'Example conference',
  date: '2026-06-10',
  summary: 'A recorded talk',
  slidesPage: true,
  alsoGiven: [
    {
      description: 'a shorter version',
      event: 'Example meetup',
      date: '2025-07-10',
      href: 'https://example.com',
      slug: 'shorter-version',
    },
  ],
};

const SCRIPT_ONLY: Talk = {
  slug: 'masking',
  title: 'Masking',
  event: 'Monthly chat',
  date: '2025-01-01',
  summary: 'A talk with only my script',
  notRecorded: true,
  transcriptFromScript: true,
};

const SLIDES_ONLY: Talk = {
  slug: 'ocd',
  title: 'OCD',
  event: 'Monthly chat',
  date: '2025-02-01',
  summary: 'A talk with slides but no transcript',
  notRecorded: true,
  slidesPage: true,
};

function renderSiteMap() {
  return renderWithRouter(
    <SiteMapPage talks={[RECORDED]} otherTalks={[SCRIPT_ONLY, SLIDES_ONLY]} />,
  );
}

const linksIn = (section: string) =>
  within(sectionNamed(section))
    .getAllByRole('link')
    .map((link) => [link.textContent, link.getAttribute('href')]);

describe('Site map page', () => {
  it('lists every page in the main navigation', () => {
    renderSiteMap();

    expect(linksIn('Main pages')).toEqual(MAIN_NAV.map(({ label, to }) => [label, to]));
  });

  it('lists each talk with its transcripts and slides, each named in full (WCAG 2.4.9)', () => {
    renderSiteMap();

    expect(linksIn('Talks')).toEqual([
      ['Debt to done', '/talks/debt-to-done'],
      ['Transcript: Debt to done', '/talks/debt-to-done/transcript'],
      [
        'Transcript: Debt to done (a shorter version)',
        '/talks/debt-to-done/shorter-version/transcript',
      ],
      ['Slides: Debt to done', '/talks/debt-to-done/slides'],
      ['Transcript: Masking', '/talks/masking/transcript'],
      ['Slides: OCD', '/talks/ocd/slides'],
    ]);
  });

  it('lists the pages about the site, apart from itself', () => {
    renderSiteMap();

    expect(linksIn('About this site')).toEqual(
      FOOTER_NAV.filter(({ to }) => to !== '/site-map').map(({ label, to }) => [label, to]),
    );
  });

  it('leaves out the CV, which is unlisted', () => {
    renderSiteMap();

    expect(screen.queryByRole('link', { name: /CV/ })).not.toBeInTheDocument();
  });

  it('gets every ready talk when the site is built', () => {
    expect(loader()).toEqual({ talks: TALKS, otherTalks: OTHER_TALKS });
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Site map, Abi Harrison-Nye' });
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4174/site-map/',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderSiteMap();

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
