import { describe, expect, it } from 'vitest';

import { formatDate } from '../components/Time';
import { ABBREVIATIONS } from './abbreviations';
import { ARTICLES } from './articles';
import { CV_PROFILE, QUALIFICATIONS, SHORT_COURSES, SKILLS, SPEAKING_WITHOUT_PAGES } from './cv';
import { GLOSSARY } from './glossary';
import { PLAIN_SUMMARY, PROFILE, PROFILE_LINKS } from './profile';
import { PROJECTS } from './projects';
import { RECOGNITION } from './recognition';
import { TALKS } from './talks';
import { BEFORE_TECH_SUMMARY, VOLUNTEERING, WORK } from './work';

const ROLES = WORK.flatMap((company) => company.roles);

/** Names written in capitals that aren't abbreviations, so have nothing to expand. */
const NAMES_IN_CAPITALS = ['LDX3'];

/** Every piece of text written for the site, for checks that apply to all of it. */
const ALL_TEXT = [
  BEFORE_TECH_SUMMARY,
  ...PROFILE.interests,
  ...WORK.flatMap((company) => [
    company.name,
    ...company.roles.flatMap((role) => [
      role.title,
      role.location ?? '',
      role.summary ?? '',
      ...role.highlightGroups.flatMap((group) => [group.heading, ...group.highlights]),
    ]),
    ...(company.sitesWorkedOn ?? []).flatMap((site) => [site.name, site.description]),
  ]),
  ...RECOGNITION.flatMap((item) => [item.award, item.result, item.awards]),
  ...PROJECTS.flatMap((project) => [project.name, project.summary]),
  ...ARTICLES.flatMap((article) => [article.title, article.publication, article.summary]),
  ...TALKS.flatMap((talk) => [talk.title, talk.event, talk.location, talk.summary]),
  ...CV_PROFILE,
  ...SKILLS.flatMap((group) => [group.category, ...group.skills]),
  ...QUALIFICATIONS.flatMap((item) => [item.title, item.provider, item.detail ?? '']),
  SHORT_COURSES,
  ...SPEAKING_WITHOUT_PAGES.flatMap((talk) => [talk.title, talk.event, talk.location]),
  ...VOLUNTEERING.flatMap((site) => [site.name, site.description]),
  PLAIN_SUMMARY,
  ...GLOSSARY.flatMap((entry) => [entry.term, entry.definition]),
];

const ALL_LINKS = [
  ...PROFILE_LINKS.map((link) => link.href),
  ...WORK.flatMap((company) => (company.sitesWorkedOn ?? []).map((site) => site.href)),
  ...VOLUNTEERING.map((site) => site.href),
  ...PROJECTS.flatMap((project) => [project.href, project.codeHref]),
  ...ARTICLES.map((article) => article.href),
  ...TALKS.flatMap((talk) => [talk.video?.href, talk.slidesHref]),
].filter((href): href is string => href !== undefined);

describe('site content', () => {
  it('uses real dates everywhere', () => {
    const dates = [
      ...ROLES.flatMap((role) => [role.from, role.to]),
      ...ARTICLES.map((article) => article.date),
      ...QUALIFICATIONS.flatMap((item) => [item.from, item.to]),
      ...SPEAKING_WITHOUT_PAGES.map((talk) => talk.date),
    ].filter((date): date is string => date !== undefined);

    for (const date of dates) {
      expect(() => formatDate(date), date).not.toThrow();
    }
  });

  it('never has a role ending before it starts', () => {
    for (const role of ROLES) {
      if (role.to) expect(role.to >= role.from, role.title).toBe(true);
    }
  });

  it('lists work newest first, with roles before tech after the rest', () => {
    const starts = WORK.map((company) => company.roles[0]?.from ?? '');
    const earlierCareer = WORK.map((company) => company.earlierCareer === true);

    expect(starts).toEqual([...starts].sort().reverse());
    expect(earlierCareer).toEqual([...earlierCareer].sort((a, b) => Number(a) - Number(b)));
  });

  it('lists articles newest first', () => {
    const dates = ARTICLES.map((article) => article.date);

    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('only links to other sites over https', () => {
    for (const href of ALL_LINKS) {
      expect(href, href).toMatch(/^https:\/\//);
    }
  });

  it('expands every abbreviation it uses, either in the text or in the glossary (WCAG 3.1.4)', () => {
    // Words in capitals, such as WCAG, including pairs like CI/CD and plurals like APIs.
    const used = ALL_TEXT.flatMap((text) =>
      [...text.matchAll(/\b([A-Z][A-Z0-9]+(?:\/[A-Z][A-Z0-9]+)*)s?\b/g)].map(
        ([, word = '']) => word,
      ),
    );

    for (const abbreviation of new Set(used.filter((word) => !NAMES_IN_CAPITALS.includes(word)))) {
      expect(Object.keys(ABBREVIATIONS), `${abbreviation} has no expansion`).toContain(
        abbreviation,
      );
    }
  });

  it('explains each glossary term once, in alphabetical order, in full sentences', () => {
    const terms = GLOSSARY.map((entry) => entry.term);

    expect(terms).toEqual([...terms].sort((a, b) => a.localeCompare(b, 'en-GB')));
    expect(new Set(terms).size).toBe(terms.length);
    for (const { term, definition } of GLOSSARY) {
      expect(definition, term).toMatch(/^[A-Z].*\.$/);
    }
  });

  it('writes glossary definitions without abbreviations, so they need no explaining themselves', () => {
    for (const { term, definition } of GLOSSARY) {
      expect(definition, term).not.toMatch(/\b[A-Z]{2,}\b/);
    }
  });

  it('has no stray spaces in any text', () => {
    for (const text of ALL_TEXT) {
      expect(text, text).toBe(text.trim());
      expect(text, text).not.toMatch(/ {2}/);
    }
  });

  it('never lists a talk on the CV as both with and without its own page', () => {
    for (const talk of SPEAKING_WITHOUT_PAGES) {
      expect(
        TALKS.map((withPage) => withPage.title),
        `${talk.title} now has a page, so remove it from SPEAKING_WITHOUT_PAGES`,
      ).not.toContain(talk.title);
    }
  });

  it('has alt text for the profile photo, once there is one', () => {
    if (PROFILE.photo) expect(PROFILE.photo.alt.trim()).not.toBe('');
  });
});
