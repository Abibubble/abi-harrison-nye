import { type Page, expect, test } from './support/test';

// EmailJS is blocked in every test. Tests that send plan its answer with emailJs.answerWith().

async function fillIn(page: Page) {
  await page.getByRole('textbox', { name: 'Your name' }).fill('Sam');
  await page.getByRole('textbox', { name: 'Your email address' }).fill('sam@example.com');
  await page.getByRole('textbox', { name: 'Your message' }).fill('Hello!\nSecond line.');
}

test.describe('Contact form', () => {
  test('sends a message after checking it, with nothing sent until then', async ({
    page,
    emailJs,
  }) => {
    emailJs.answerWith(200);
    const { requests } = emailJs;
    await page.goto('/contact');
    await fillIn(page);

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Check your message' })).toBeFocused();
    expect(requests).toHaveLength(0);

    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('alert', { name: 'Message sent' })).toBeVisible();
    expect(requests).toEqual([
      {
        service_id: 'e2e-service',
        template_id: 'e2e-template',
        user_id: 'e2e-public-key',
        template_params: {
          from_name: 'Sam',
          reply_to: 'sam@example.com',
          message: 'Hello!\nSecond line.',
        },
      },
    ]);
  });

  test('can be completed with the keyboard alone', async ({ page, browserName, emailJs }) => {
    emailJs.answerWith(200);
    await page.goto('/contact');
    await page.getByRole('textbox', { name: 'Your name' }).focus();
    const next = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';

    await page.keyboard.type('Sam');
    await page.keyboard.press('Tab');
    await page.keyboard.type('sam@example.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello!');
    await page.keyboard.press(next);
    await expect(page.getByRole('button', { name: 'Continue' })).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: 'Check your message' })).toBeFocused();
    await page.keyboard.press(next);
    await page.keyboard.press(next);
    await expect(page.getByRole('button', { name: 'Send message' })).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('alert', { name: 'Message sent' })).toBeVisible();
  });

  test('lists problems at the top, linking to each field', async ({ page, emailJs }) => {
    const { requests } = emailJs;
    await page.goto('/contact');

    await page.getByRole('button', { name: 'Continue' }).click();

    const summary = page.getByRole('alert', { name: 'There’s a problem' });
    await expect(summary).toBeVisible();
    await summary.getByRole('link', { name: 'Enter your message' }).click();
    await expect(page.getByRole('textbox', { name: 'Your message' })).toBeFocused();
    expect(requests).toHaveLength(0);
  });

  test('counts characters, and stops a message over the limit without cutting it off', async ({
    page,
    emailJs,
  }) => {
    const { requests } = emailJs;
    await page.goto('/contact');
    await fillIn(page);
    const message = page.getByRole('textbox', { name: 'Your message' });
    await expect(page.getByText('You have 4,981 characters remaining')).toBeVisible();

    await message.fill('a'.repeat(5003));
    await expect(page.getByText('You have 3 characters too many')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('alert', { name: 'There’s a problem' })).toContainText(
      'Your message must be 5,000 characters or fewer',
    );
    await expect(message).toHaveValue('a'.repeat(5003));
    expect(requests).toHaveLength(0);
  });

  test('keeps everything when sending fails, and can try again', async ({ page, emailJs }) => {
    emailJs.answerWith(500, 200);
    await page.goto('/contact');
    await fillIn(page);
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('alert', { name: 'Your message wasn’t sent' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Check your message' })).toContainText(
      'Second line.',
    );

    await page.getByRole('button', { name: 'Try sending again' }).click();
    await expect(page.getByRole('alert', { name: 'Message sent' })).toBeVisible();
  });
});
