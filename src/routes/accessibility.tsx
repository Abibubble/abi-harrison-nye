import type { ReactNode } from 'react';

import { Abbr } from '../components/Abbr';
import { DISPLAY_SETTINGS_ID, DisplaySettings } from '../components/DisplaySettings';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { PageContents, PageContentsSection, type PageSection } from '../components/PageContents';
import { PageHeading } from '../components/PageHeading';
import { Stack } from '../components/Stack';
import { Time } from '../components/Time';
import { ABBREVIATIONS, type Abbreviation } from '../content/abbreviations';
import { GLOSSARY } from '../content/glossary';
import { pageTitle } from '../content/site';
import { ACCESSIBILITY_REVIEWED, MANUAL_TESTING } from '../content/statements';
import {
  type Talk,
  talksNeedingAudioDescription,
  talksWithVideos,
  talksWithoutCaptions,
} from '../content/talks';
import styles from './accessibility.module.css';
import { pageMeta } from '../seo/pageMeta';
import type { Route } from './+types/accessibility';

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: pageTitle('Accessibility'),
    description:
      'How accessible this site is, what doesn’t work yet, how to report a problem, and display settings to make it work for you.',
    path: '/accessibility',
  });
}

const SECTIONS = {
  displaySettings: { id: DISPLAY_SETTINGS_ID, title: 'Display settings' },
  howAccessible: { id: 'how-accessible', title: 'How accessible this site is' },
  whatIveDone: { id: 'what-ive-done', title: 'What I’ve done to make it accessible' },
  knownIssues: { id: 'known-issues', title: 'Known issues' },
  otherSites: { id: 'other-sites', title: 'Content on other sites' },
  testing: { id: 'testing', title: 'How I test this site' },
  reportAProblem: { id: 'report-a-problem', title: 'Report a problem' },
  glossary: { id: 'glossary', title: 'Glossary' },
  abbreviations: { id: 'abbreviations', title: 'Abbreviations' },
} satisfies Record<string, PageSection>;

interface KnownIssueProps {
  title: string;
  /** The success criteria it fails, such as "1.2.2 Captions (Prerecorded), Level A" */
  criteria: string[];
  affects: string;
  workaround: ReactNode;
  plan: string;
  talks: Talk[];
}

function KnownIssue({ title, criteria, affects, workaround, plan, talks }: KnownIssueProps) {
  return (
    <Stack gap={3}>
      <Heading level={3}>{title}</Heading>
      <dl className={styles.details}>
        <div>
          <dt>{criteria.length === 1 ? 'Success criterion' : 'Success criteria'}</dt>
          {criteria.map((criterion) => (
            <dd key={criterion}>{criterion}</dd>
          ))}
        </div>
        <div>
          <dt>Who it affects</dt>
          <dd>{affects}</dd>
        </div>
        <div>
          <dt>How to get around it</dt>
          <dd>{workaround}</dd>
        </div>
        <div>
          <dt>What I’m doing about it</dt>
          <dd>{plan}</dd>
        </div>
        <div>
          <dt>{talks.length === 1 ? 'Talk affected' : 'Talks affected'}</dt>
          <dd>
            <ul>
              {talks.map((talk) => (
                <li key={talk.slug}>
                  <Link to={`/talks/${talk.slug}`}>{talk.title}</Link>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </Stack>
  );
}

const ABBREVIATION_NAMES = Object.keys(ABBREVIATIONS) as Abbreviation[];

export default function Accessibility() {
  const withoutCaptions = talksWithoutCaptions();
  const needingDescription = talksNeedingAudioDescription();
  const withVideos = talksWithVideos();
  const hasKnownIssues = withVideos.length > 0;

  return (
    <Stack gap={6}>
      <Stack gap={5}>
        <PageHeading>Accessibility</PageHeading>
        <p>
          I want everyone to be able to use this site. This page explains how accessible it is, what
          doesn’t work yet, and how to tell me about a problem. You can also change how the site
          looks, to make it easier for you to use.
        </p>
        <PageContents sections={Object.values(SECTIONS)} />
      </Stack>

      <DisplaySettings />

      <PageContentsSection section={SECTIONS.howAccessible}>
        <p>
          This site aims to meet the <Abbr name="WCAG" expand /> version 2.2 at Level AAA. That’s
          the highest level, and goes further than the Level AA most sites aim for.
        </p>
        {hasKnownIssues ? (
          <p>
            It doesn’t fully meet Level AAA yet, because of the talk videos. The{' '}
            <a href={`#${SECTIONS.knownIssues.id}`}>known issues</a> list everything I know of that
            falls short, and how to get around it.
          </p>
        ) : (
          <p>
            I don’t know of anything on the site that falls short of it. If you find something,
            please <a href={`#${SECTIONS.reportAProblem.id}`}>tell me about it</a>.
          </p>
        )}
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.whatIveDone}>
        <ul className={styles.list}>
          <li>
            Text has a contrast ratio of at least 7 to 1 against its background, in every theme.
          </li>
          <li>
            You can change the theme, text size, spacing, font and motion in the{' '}
            <a href={`#${DISPLAY_SETTINGS_ID}`}>display settings</a>.
          </li>
          <li>The font is Atkinson Hyperlegible, which is designed to be easy to read.</li>
          <li>
            Everything works with a keyboard alone, and shows a clear outline around what’s focused.
          </li>
          <li>
            Pages fit screens as narrow as 320 pixels without scrolling sideways, so you can zoom in
            up to 400%.
          </li>
          <li>Nothing flashes, moves on its own or has a time limit.</li>
          <li>
            Abbreviations in the text of each page are written out in full the first time they’re
            used, apart from a few most people know, such as <Abbr name="UK" />. Every abbreviation
            is <a href={`#${SECTIONS.abbreviations.id}`}>listed on this page</a>.
          </li>
          <li>
            Technical words are explained in the{' '}
            <a href={`#${SECTIONS.glossary.id}`}>glossary on this page</a>, and the Work and{' '}
            <Abbr name="CV" /> pages start with a short summary in plain words.
          </li>
          <li>
            Every talk has a full transcript, which describes the slides and anything else shown on
            screen.
          </li>
          <li>
            The contact form lets you check your message before you send it, and keeps everything
            you wrote if something goes wrong.
          </li>
        </ul>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.knownIssues}>
        {hasKnownIssues ? (
          <>
            <p>These are the parts of the site I know don’t meet Level AAA yet.</p>
            {withoutCaptions.length > 0 && (
              <KnownIssue
                title="Some talk videos don’t have captions"
                criteria={['1.2.2 Captions (Prerecorded), Level A']}
                affects="People who are deaf or hard of hearing, and anyone watching without sound."
                workaround="Each talk’s page has a full transcript of everything that’s said."
                plan="I’m adding captions to each of these videos."
                talks={withoutCaptions}
              />
            )}
            {needingDescription.length > 0 && (
              <KnownIssue
                title="Some talk videos show things that aren’t described aloud"
                criteria={[
                  '1.2.5 Audio Description (Prerecorded), Level AA',
                  '1.2.7 Extended Audio Description (Prerecorded), Level AAA',
                ]}
                affects="People who are blind or have low vision."
                workaround="Each talk’s transcript describes the slides and anything else shown on screen."
                plan="I describe everything on screen aloud in new talks. Older videos won’t change, but their transcripts cover it."
                talks={needingDescription}
              />
            )}
            <KnownIssue
              title="Talk videos don’t have sign language interpretation"
              criteria={['1.2.6 Sign Language (Prerecorded), Level AAA']}
              affects="People whose first language is a sign language, such as British Sign Language."
              workaround="Each talk’s page has a full transcript, and captions where the video has them."
              plan="I don’t plan to add sign language interpretation. It isn’t affordable for a personal site, so I’m putting that effort into captions and transcripts instead."
              talks={withVideos}
            />
          </>
        ) : (
          <p>There are no known issues at the moment.</p>
        )}
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.otherSites}>
        <p>
          Some links go to other sites, such as GitHub and LinkedIn
          {withVideos.length > 0 && ', and YouTube for talk videos'}. They’re marked with an arrow
          icon, and screen readers hear “external site”. I can’t control how accessible other sites
          are.
        </p>
        {withVideos.length > 0 && (
          <p>
            Talk videos are linked rather than played on this site, so nothing from YouTube loads
            here. Every talk has a transcript on this site instead.
          </p>
        )}
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.testing}>
        <p>
          Every page and component is checked automatically with axe, an accessibility testing tool,
          each time the site changes. Pages are checked in the browser engines behind Chrome,
          Firefox and Safari, on wide and narrow screens, and with the largest text and widest
          spacing in the display settings.
        </p>
        {MANUAL_TESTING.length > 0 ? (
          <>
            <p>Automated tools only find some problems, so I also test the site by hand, using:</p>
            <ul className={styles.list}>
              {MANUAL_TESTING.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Automated tools only find some problems, so I’m also testing the site by hand with
            screen readers and other assistive technology. I’ll list what I’ve used here.
          </p>
        )}
        <p>
          This statement was last checked on <Time date={ACCESSIBILITY_REVIEWED} />.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.reportAProblem}>
        <p>
          If something on this site doesn’t work for you, or you need something in a different
          format, please <Link to="/contact">tell me using the contact form</Link>. I’ll reply by
          email.
        </p>
        <p>
          It helps to know which page you were on and what you were trying to do. If you’re happy to
          share it, it also helps to know what you were using, such as your browser or screen
          reader.
        </p>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.glossary}>
        <p>These are technical words used on this site, explained in plain words.</p>
        <dl className={styles.definitions}>
          {GLOSSARY.map(({ term, definition }) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{definition}</dd>
            </div>
          ))}
        </dl>
      </PageContentsSection>

      <PageContentsSection section={SECTIONS.abbreviations}>
        <p>These are the abbreviations used on this site, and what they stand for.</p>
        <dl className={styles.glossary}>
          {ABBREVIATION_NAMES.map((name) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{ABBREVIATIONS[name]}</dd>
            </div>
          ))}
        </dl>
      </PageContentsSection>
    </Stack>
  );
}
