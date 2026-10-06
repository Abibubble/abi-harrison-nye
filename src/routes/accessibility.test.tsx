import { screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ABBREVIATIONS } from '../content/abbreviations';
import type * as Statements from '../content/statements';
import type * as Talks from '../content/talks';
import type { Talk } from '../content/talks';
import { displaySettingsStore } from '../settings/displaySettings';
import { expectNoAxeViolations } from '../test/axe';
import { renderWithRouter } from '../test/render';
import Accessibility, { meta } from './accessibility';

// The talks and manual testing shown, so each test can set up the situation it needs.
const fake = vi.hoisted(() => ({ talks: [] as Talk[], manualTesting: [] as string[] }));

vi.mock('../content/talks', async (importOriginal) => {
  const original = await importOriginal<typeof Talks>();
  return {
    ...original,
    talksWithoutCaptions: () => original.talksWithoutCaptions(fake.talks),
    talksNeedingAudioDescription: () => original.talksNeedingAudioDescription(fake.talks),
    talksWithVideos: () => original.talksWithVideos(fake.talks),
  };
});

vi.mock('../content/statements', async (importOriginal) => {
  const original = await importOriginal<typeof Statements>();
  return {
    ...original,
    get MANUAL_TESTING() {
      return fake.manualTesting;
    },
  };
});

function talk(slug: string, video?: Talk['video']): Talk {
  return {
    slug,
    title: `Talk ${slug}`,
    event: 'Event',
    location: 'Online',
    date: '2026-01',
    summary: 'A talk.',
    video,
  };
}

const UNCAPTIONED = talk('uncaptioned', {
  href: 'https://www.youtube.com/watch?v=a',
  captions: false,
  describedAloud: true,
});
const UNDESCRIBED = talk('undescribed', {
  href: 'https://www.youtube.com/watch?v=b',
  captions: true,
  describedAloud: false,
});
const NO_VIDEO = talk('no-video');

function knownIssue(title: string) {
  const issue = screen.getByRole('heading', { level: 3, name: title }).parentElement;
  if (!issue) throw new Error(`The known issue “${title}” isn’t in a container`);
  return issue;
}

afterEach(() => {
  displaySettingsStore.reset();
  fake.talks = [];
  fake.manualTesting = [];
});

describe('Accessibility page', () => {
  it('has the page heading and the display settings', () => {
    renderWithRouter(<Accessibility />);

    expect(screen.getByRole('heading', { level: 1, name: 'Accessibility' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Display settings' })).toBeInTheDocument();
  });

  it('lists every section at the top, each linking to a heading that can take focus', () => {
    renderWithRouter(<Accessibility />);

    const links = within(screen.getByRole('navigation', { name: 'On this page' })).getAllByRole(
      'link',
    );
    expect(links.length).toBeGreaterThan(5);
    for (const link of links) {
      const target = document.getElementById(link.getAttribute('href')?.slice(1) ?? '');
      expect(target?.tagName, link.textContent).toBe('H2');
      expect(target).toHaveTextContent(link.textContent);
      expect(target).toHaveAttribute('tabindex', '-1');
    }
  });

  it('writes out WCAG in full the first time', () => {
    renderWithRouter(<Accessibility />);

    expect(screen.getByRole('region', { name: 'How accessible this site is' })).toHaveTextContent(
      'Web Content Accessibility Guidelines (WCAG) version 2.2 at Level AAA',
    );
  });

  describe('without any talk videos', () => {
    it('says there are no known issues', () => {
      fake.talks = [NO_VIDEO];
      renderWithRouter(<Accessibility />);

      expect(screen.getByRole('region', { name: 'Known issues' })).toHaveTextContent(
        'There are no known issues at the moment.',
      );
      expect(screen.getByRole('region', { name: 'How accessible this site is' })).toHaveTextContent(
        'I don’t know of anything on the site that falls short of it.',
      );
    });

    it('doesn’t mention YouTube', () => {
      renderWithRouter(<Accessibility />);

      expect(screen.getByRole('region', { name: 'Content on other sites' })).not.toHaveTextContent(
        'YouTube',
      );
    });
  });

  describe('with talk videos', () => {
    it('says the site doesn’t fully meet Level AAA, linking to the known issues', () => {
      fake.talks = [UNCAPTIONED];
      renderWithRouter(<Accessibility />);

      const region = screen.getByRole('region', { name: 'How accessible this site is' });
      expect(region).toHaveTextContent('It doesn’t fully meet Level AAA yet');
      expect(within(region).getByRole('link', { name: 'known issues' })).toHaveAttribute(
        'href',
        '#known-issues',
      );
    });

    it('lists talks without captions, with who it affects, the workaround and the plan', () => {
      fake.talks = [UNCAPTIONED, UNDESCRIBED, NO_VIDEO];
      renderWithRouter(<Accessibility />);

      const issue = knownIssue('Some talk videos don’t have captions');
      expect(issue).toHaveTextContent('1.2.2 Captions (Prerecorded), Level A');
      expect(issue).toHaveTextContent('Who it affects');
      expect(issue).toHaveTextContent('How to get around it');
      expect(issue).toHaveTextContent('What I’m doing about it');
      expect(
        within(issue)
          .getAllByRole('link')
          .map((link) => link.getAttribute('href')),
      ).toEqual(['/talks/uncaptioned']);
    });

    it('lists talks that need audio description', () => {
      fake.talks = [UNCAPTIONED, UNDESCRIBED];
      renderWithRouter(<Accessibility />);

      const issue = knownIssue('Some talk videos show things that aren’t described aloud');
      expect(issue).toHaveTextContent('1.2.5 Audio Description (Prerecorded), Level AA');
      expect(issue).toHaveTextContent('1.2.7 Extended Audio Description (Prerecorded), Level AAA');
      expect(within(issue).getByRole('link', { name: 'Talk undescribed' })).toBeInTheDocument();
    });

    it('says no talk video has sign language, and why', () => {
      fake.talks = [UNCAPTIONED, UNDESCRIBED, NO_VIDEO];
      renderWithRouter(<Accessibility />);

      const issue = knownIssue('Talk videos don’t have sign language interpretation');
      expect(issue).toHaveTextContent('1.2.6 Sign Language (Prerecorded), Level AAA');
      expect(issue).toHaveTextContent('I don’t plan to add sign language interpretation.');
      expect(within(issue).getAllByRole('link')).toHaveLength(2);
    });

    it('only lists the issues that apply', () => {
      fake.talks = [UNDESCRIBED];
      renderWithRouter(<Accessibility />);

      expect(
        screen.queryByRole('heading', { name: 'Some talk videos don’t have captions' }),
      ).not.toBeInTheDocument();
    });

    it('explains that videos are on YouTube', () => {
      fake.talks = [UNCAPTIONED];
      renderWithRouter(<Accessibility />);

      expect(screen.getByRole('region', { name: 'Content on other sites' })).toHaveTextContent(
        'nothing from YouTube loads here',
      );
    });

    it('has no detectable accessibility issues', async () => {
      fake.talks = [UNCAPTIONED, UNDESCRIBED];
      const { container } = renderWithRouter(<Accessibility />);

      await expectNoAxeViolations(container, { disableRules: ['region'] });
    });
  });

  describe('testing', () => {
    it('says how the site is tested automatically, and when the statement was last checked', () => {
      renderWithRouter(<Accessibility />);

      const region = screen.getByRole('region', { name: 'How I test this site' });
      expect(region).toHaveTextContent('checked automatically with axe');
      expect(region).toHaveTextContent('This statement was last checked on 6 October 2026.');
    });

    it('only lists testing by hand that’s been done', () => {
      renderWithRouter(<Accessibility />);

      expect(
        within(screen.getByRole('region', { name: 'How I test this site' })).queryByRole('list'),
      ).not.toBeInTheDocument();
    });

    it('lists testing by hand once it’s been done', () => {
      fake.manualTesting = ['VoiceOver with Safari on macOS'];
      renderWithRouter(<Accessibility />);

      expect(
        within(screen.getByRole('region', { name: 'How I test this site' })).getByRole('listitem'),
      ).toHaveTextContent('VoiceOver with Safari on macOS');
    });
  });

  it('explains how to report a problem, linking to the contact form', () => {
    renderWithRouter(<Accessibility />);

    const region = screen.getByRole('region', { name: 'Report a problem' });
    expect(within(region).getByRole('link')).toHaveAttribute('href', '/contact');
  });

  it('lists every abbreviation used on the site, with what it stands for (WCAG 3.1.4)', () => {
    renderWithRouter(<Accessibility />);

    const glossary = within(screen.getByRole('region', { name: 'Abbreviations' }));
    const terms = glossary.getAllByRole('term').map((term) => term.textContent);
    const definitions = glossary.getAllByRole('definition').map((item) => item.textContent);
    expect(terms).toEqual(Object.keys(ABBREVIATIONS));
    expect(definitions).toEqual(Object.values(ABBREVIATIONS));
  });

  it('has a title, description and canonical address', () => {
    const tags = meta();

    expect(tags).toContainEqual({ title: 'Accessibility, Abi Harrison-Nye' });
    expect(tags).toContainEqual(expect.objectContaining({ name: 'description' }));
    expect(tags).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'http://localhost:4173/accessibility',
    });
  });

  it('has no detectable accessibility issues', async () => {
    const { container } = renderWithRouter(<Accessibility />);

    await expectNoAxeViolations(container, { disableRules: ['region'] });
  });
});
