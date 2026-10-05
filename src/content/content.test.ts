import { describe, expect, it } from 'vitest';

import { formatDate } from '../components/Time';
import { ABBREVIATIONS } from './abbreviations';
import { ARTICLES } from './articles';
import { PROFILE, PROFILE_LINKS } from './profile';
import { PROJECTS } from './projects';
import { RECOGNITION } from './recognition';
import { BEFORE_TECH_SUMMARY, WORK } from './work';

const ROLES = WORK.flatMap((company) => company.roles);

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
];

const ALL_LINKS = [
  ...PROFILE_LINKS.map((link) => link.href),
  ...WORK.flatMap((company) => (company.sitesWorkedOn ?? []).map((site) => site.href)),
  ...PROJECTS.flatMap((project) => [project.href, project.codeHref]),
  ...ARTICLES.map((article) => article.href),
].filter((href): href is string => href !== undefined);

describe('site content', () => {
  it('uses real dates everywhere', () => {
    const dates = [
      ...ROLES.flatMap((role) => [role.from, role.to]),
      ...ARTICLES.map((article) => article.date),
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
    const used = ALL_TEXT.flatMap((text) => text.match(/\b[A-Z][A-Z0-9]+\b/g) ?? []);

    for (const abbreviation of new Set(used)) {
      expect(Object.keys(ABBREVIATIONS), `${abbreviation} has no expansion`).toContain(
        abbreviation,
      );
    }
  });

  it('has no stray spaces in any text', () => {
    for (const text of ALL_TEXT) {
      expect(text, text).toBe(text.trim());
      expect(text, text).not.toMatch(/ {2}/);
    }
  });

  it('has alt text for the profile photo, once there is one', () => {
    if (PROFILE.photo) expect(PROFILE.photo.alt.trim()).not.toBe('');
  });
});
