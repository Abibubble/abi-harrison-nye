import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { slidePicturePath } from '../src/content/talkPath';
import { TALK_RECORDS } from '../src/content/talks';
import { ROUTES } from './support/routes';
import { type Page, expect, test, waitLikeAPerson } from './support/test';

async function recordViolations(page: Page): Promise<() => Promise<string[]>> {
  await page.addInitScript(() => {
    const blocked: string[] = [];
    Object.assign(window, { blockedByPolicy: blocked });
    document.addEventListener('securitypolicyviolation', (event) => {
      blocked.push(`${event.violatedDirective}: ${event.blockedURI || 'inline'}`);
    });
  });
  return () =>
    page.evaluate(() => (window as unknown as { blockedByPolicy: string[] }).blockedByPolicy);
}

test.describe('Content Security Policy', () => {
  for (const { name, path } of ROUTES) {
    test(`${name} runs everything it needs, with nothing blocked`, async ({ page }) => {
      const violations = await recordViolations(page);
      await page.goto(path);

      await expect(page.locator('html')).toHaveAttribute('data-js', '');
      await expect(page.getByRole('combobox', { name: 'Theme' })).toBeEnabled();
      expect(await violations()).toEqual([]);
    });
  }

  test('allows moving between pages, and sending a message to EmailJS', async ({
    page,
    emailJs,
  }) => {
    emailJs.answerWith(200);
    const violations = await recordViolations(page);
    await page.goto('/');

    await page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Contact' })
      .click();
    await page.getByRole('textbox', { name: 'Your name' }).fill('Sam');
    await page.getByRole('textbox', { name: 'Your email address' }).fill('sam@example.com');
    await page.getByRole('textbox', { name: 'Your message' }).fill('Hello!');
    await waitLikeAPerson(page);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('alert', { name: 'Message sent' })).toBeVisible();
    expect(emailJs.requests).toHaveLength(1);
    expect(await violations()).toEqual([]);
  });

  test('blocks a script the policy doesn’t know about', async ({ page }) => {
    const violations = await recordViolations(page);
    await page.goto('/');

    await page.evaluate(() => {
      const script = document.createElement('script');
      script.textContent = 'window.injected = true;';
      document.body.append(script);
    });

    expect(await page.evaluate(() => 'injected' in window)).toBe(false);
    expect(await violations()).toEqual(['script-src-elem: inline']);
  });
});

function readIfThere(path: string): string {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return '';
  }
}

/** The files a talk's text is written in: its transcript, slide descriptions and longer description */
function talkTextFiles(slug: string): string[] {
  return ['', 'slides/', 'about/'].map((folder) => `src/content/talks/${folder}${slug}.md`);
}

/** The first long line of a file, if it exists, to check it isn't public */
function readFirstLine(path: string): string | undefined {
  return readIfThere(path)
    .split('\n')
    .find((line) => line.length > 60 && !line.startsWith('#'));
}

test.describe('Talks that aren’t ready', () => {
  test.skip(
    ({ browserName }) => browserName !== 'chromium',
    'This checks files, so once is enough',
  );

  test('are nowhere in the built site, and neither is what I’m tracking for each talk', () => {
    const files = readdirSync('build/client', { recursive: true, withFileTypes: true })
      .filter((file) => file.isFile() && /\.(html|js|css|data|json|xml|txt)$/.test(file.name))
      .map((file) => join(file.parentPath, file.name));
    const site = files.map((file) => readFileSync(file, 'utf8')).join('\n');

    // A ready talk can mention one that isn't, such as a slide listing other talks in a series
    const readyText = TALK_RECORDS.filter((talk) => talk.ready)
      .flatMap((talk) => talkTextFiles(talk.slug).map(readIfThere))
      .join('\n');

    expect(files.length).toBeGreaterThan(10);
    for (const talk of TALK_RECORDS) {
      const lines = talkTextFiles(talk.slug)
        .map(readFirstLine)
        .filter((line) => line !== undefined);
      const hidden = talk.ready
        ? talk.todo
        : [talk.slug, talk.title, talk.summary, ...talk.todo, ...lines].filter(
            (text) => !readyText.includes(text),
          );
      for (const text of hidden) {
        expect(site.includes(text), `${talk.slug}: “${text}”`).toBe(false);
      }
    }
  });

  test('don’t have their slide pictures in the built site, but ready talks do', () => {
    const slides = TALK_RECORDS.filter((talk) => talk.has.slideText !== 'none');

    expect(slides.some((talk) => !talk.ready)).toBe(true);
    for (const { slug, ready } of slides) {
      expect(existsSync(join('build/client', slidePicturePath(slug, 1))), slug).toBe(ready);
      expect(existsSync(join('build/client', 'talks', slug, 'slides.pdf')), slug).toBe(false);
    }
  });
});
