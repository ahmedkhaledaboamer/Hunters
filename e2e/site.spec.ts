import { expect, test, type Page } from '@playwright/test';

const routes = [
'/', '/about', '/history', '/services', '/services/erp-enterprise', '/solutions', '/industries', '/industries/healthcare',
'/how-we-work', '/partners', '/partners/partner-alpha', '/locations', '/news', '/book-consultation', '/contact', '/careers', '/governance'];

type Prefs = {theme?: 'dark' | 'light';locale?: 'ar' | 'en';};

/** Saves preferences before any app code runs, and records every console error / uncaught exception. */
async function setup(page: Page, prefs: Prefs = {}) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {if (m.type() === 'error') errors.push(m.text());});
  await page.addInitScript((p) => localStorage.setItem('hh:preferences', JSON.stringify({ theme: 'dark', locale: 'en', ...p })), prefs);
  // Never send real emails from tests: answer the email service with a success.
  await page.route('https://formsubmit.co/**', (route) => route.fulfill({ json: { success: 'true', message: 'ok' } }));
  return errors;
}

/** Records requests to the email service, in order. */
function captureEmails(page: Page) {
  const sent: {to: string;body: string;}[] = [];
  page.on('request', (r) => {
    if (r.url().startsWith('https://formsubmit.co/')) sent.push({ to: decodeURIComponent(r.url().split('/').pop() ?? ''), body: r.postDataBuffer()?.toString('latin1') ?? '' });
  });
  return sent;
}

for (const locale of ['en', 'ar'] as const) {
  test.describe(`every page (${locale})`, () => {
    for (const route of routes) {
      test(`${route} renders cleanly`, async ({ page }) => {
        const errors = await setup(page, { locale });
        await page.goto(route);
        await expect(page.locator('h1').first()).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
        await expect(page).toHaveTitle(/H HUNTERS/);
        expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
        expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toContain(route === '/' ? '' : route);
        expect(errors).toEqual([]);
      });
    }
  });
}

test('unknown routes show the 404 page and are kept out of search', async ({ page }) => {
  await setup(page);
  await page.goto('/this-page-does-not-exist');
  await expect(page).toHaveTitle(/^404/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test.describe('phones', () => {
  test.use({ viewport: { width: 360, height: 780 } });
  for (const locale of ['en', 'ar'] as const) {
    test(`no page scrolls sideways (${locale})`, async ({ page }) => {
      test.setTimeout(120_000); // visits every page
      await setup(page, { locale });
      for (const route of routes) {
        await page.goto(route);
        await page.locator('h1').first().waitFor();
        const shift = await page.evaluate(() => {
          const se = document.scrollingElement ?? document.documentElement;
          se.scrollLeft = -9999;const a = se.scrollLeft;
          se.scrollLeft = 9999;const b = se.scrollLeft;
          return Math.abs(a) + Math.abs(b);
        });
        expect(shift, route).toBe(0);
      }
    });
  }
});

test('theme toggle flips on every click', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  const html = page.locator('html');
  const toggle = page.locator('header').getByRole('button', { name: /^Theme/ }).first();
  await expect(html).toHaveClass(/dark/);
  await toggle.click();
  await expect(html).not.toHaveClass(/dark/);
  await toggle.click();
  await expect(html).toHaveClass(/dark/);
});

test('language toggle switches to Arabic and back', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  await page.getByRole('button', { name: /العربية/ }).first().click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1').first()).toContainText('ذكاء يصنع الفرق');
  await page.getByRole('button', { name: /^EN$|English/ }).first().click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('a service on the home page opens its details with the same image', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  const row = page.locator('section:has(#expertise-title) ol a').nth(3);
  await row.scrollIntoViewIfNeeded();
  await row.click();
  await expect(page).toHaveURL(/\/services\/erp-enterprise$/);
  await expect(page.locator('header img').first()).toHaveAttribute('src', /0dea776c.*\.webp$/);
});

test('booking a consultation end to end', async ({ page }) => {
  const errors = await setup(page);
  await page.goto('/book-consultation');
  const panel = page.locator('.glass.rounded-3xl').first();
  const next = panel.locator('div.border-t button').last();

  // Single-choice steps advance on their own once something is picked.
  await panel.getByRole('heading', { name: /which area/i }).waitFor();
  await panel.getByRole('radio').first().click(); // service → advances
  await panel.getByRole('heading', { name: /who would you like/i }).waitFor();
  await panel.getByRole('radio').first().click(); // consultant → advances
  await panel.getByRole('heading', { name: /how would you like/i }).waitFor();
  await next.click(); // meeting type keeps its defaults (this step still has Continue)

  await panel.locator('[role=gridcell]:not([disabled])').first().click();
  await panel.locator('[role=radiogroup] [role=radio]:not([disabled])').first().click(); // time → advances
  await page.locator('#fullName').waitFor();

  await page.fill('#fullName', 'Test User');
  await page.fill('#company', 'ACME');
  await page.fill('#jobTitle', 'CTO');
  await page.fill('#email', 'test@example.com');
  await page.fill('#phone', '50 978 2770');
  await page.selectOption('#companySize', { index: 1 });
  await page.fill('#challenge', 'We need to modernise our ERP and reporting stack.');
  await next.click();

  await next.click(); // confirm on the review step
  await expect(panel).toContainText(/HH-[A-Z0-9]+/);
  expect(errors).toEqual([]);
});

test('picking a service moves straight to the next step', async ({ page }) => {
  await setup(page);
  await page.goto('/book-consultation');
  const panel = page.locator('.glass.rounded-3xl').first();
  await expect(panel.getByRole('button', { name: /continue/i })).toHaveCount(0); // no Continue on choice steps
  await panel.getByRole('radio').first().click();
  await expect(panel.getByRole('heading', { name: /who would you like/i })).toBeVisible();
});

test('contact form shows errors, then sends', async ({ page }) => {
  await setup(page);
  await page.goto('/contact');
  const form = page.locator('form').first();
  await form.getByRole('button', { name: /send|submit/i }).click();
  await expect(form.locator('[aria-invalid="true"], [role="alert"], p.text-red-600, .text-red-600').first()).toBeVisible();

  await page.fill('#c-name', 'Test User');
  await page.fill('#c-email', 'test@example.com');
  await page.fill('#c-subject', 'Partnership');
  await page.fill('#c-msg', 'Hello, we would like to discuss a project with your team.');
  await form.getByRole('button', { name: /send|submit/i }).click();
  await expect(page.getByRole('status').first()).toBeVisible();
});

test('contact details are real, clickable links', async ({ page }) => {
  await setup(page);
  await page.goto('/contact');
  await expect(page.locator('a[href="mailto:info@h.hunters.ai"]').first()).toBeVisible();
  await expect(page.locator('a[href="mailto:hr.hunters2022@gmail.com"]').first()).toBeVisible();
  await expect(page.locator('a[href="tel:+971509782770"]').first()).toBeVisible();
});

test('newsletter validates the email without page errors', async ({ page }) => {
  const errors = await setup(page);
  await page.goto('/contact');
  const input = page.locator('#newsletter-email');
  await input.scrollIntoViewIfNeeded();
  await input.fill('nope');
  await input.press('Enter');
  await expect(page.locator('#newsletter-error')).not.toBeEmpty();
  await input.fill('ok@example.com');
  await input.press('Enter');
  await expect(page.locator('#newsletter-error')).not.toContainText(/valid/i);
  expect(errors).toEqual([]);
});

test('the home hero is on screen straight from the HTML, with no intro screen', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  await expect(page.locator('#preloader')).toHaveCount(0);
  await expect(page.locator('h1').first()).toContainText('Engineering the Intelligence of Business');
});

test('back-to-top appears after scrolling and returns to the top', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Back to top' });
  await page.locator('h1').first().waitFor();
  await page.evaluate(() => window.scrollTo(0, 2000));
  await expect(button).toHaveAttribute('tabindex', '0');
  await button.click();
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBeLessThan(5);
});

test.describe('forms are delivered by email', () => {
  test('contact message goes to the info inbox with the sender as reply-to', async ({ page }) => {
    await setup(page);
    const sent = captureEmails(page);
    await page.goto('/contact');
    await page.fill('#c-name', 'Test User');
    await page.fill('#c-email', 'test@example.com');
    await page.fill('#c-subject', 'Partnership');
    await page.fill('#c-msg', 'Hello, we would like to discuss a project with your team.');
    await page.locator('form').first().getByRole('button', { name: /send|submit/i }).click();
    await expect(page.getByRole('status').first()).toBeVisible();
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toBe('info@h.hunters.ai');
    expect(sent[0].body).toContain('test@example.com');
    expect(sent[0].body).toContain('_replyto');
  });

  test('a job application goes to HR with the CV attached', async ({ page }) => {
    await setup(page);
    const sent = captureEmails(page);
    await page.goto('/careers');
    await page.locator('main button:has-text("Senior Software Engineer")').first().click(); // opens the application dialog
    await expect(page.locator('#a-name')).toBeVisible();
    await page.fill('#a-name', 'Test Applicant');
    await page.fill('#a-email', 'applicant@example.com');
    await page.fill('#a-phone', '50 978 2770');
    await page.setInputFiles('#a-cv', { name: 'cv.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
    await page.locator('form:has(#a-name)').getByRole('button', { name: /send|submit/i }).click();
    await expect(page.locator('form:has(#a-name)')).toHaveCount(0);
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toBe('hr.hunters2022@gmail.com');
    expect(sent[0].body).toContain('filename="cv.pdf"');
  });

  test('a failed send shows an error instead of a fake success', async ({ page }) => {
    await setup(page);
    await page.route('https://formsubmit.co/**', (route) => route.fulfill({ status: 500, json: { success: 'false', message: 'down' } }));
    await page.goto('/contact');
    await page.fill('#c-name', 'Test User');
    await page.fill('#c-email', 'test@example.com');
    await page.fill('#c-subject', 'Partnership');
    await page.fill('#c-msg', 'Hello, we would like to discuss a project with your team.');
    await page.locator('form').first().getByRole('button', { name: /send|submit/i }).click();
    await expect(page.getByRole('alert').first()).toContainText(/couldn.t send/i);
  });
});

test('WhatsApp button opens a chat with the company number and a greeting', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  const wa = page.getByRole('link', { name: 'Chat with us on WhatsApp' });
  await expect(wa).toBeVisible();
  await expect(wa).toHaveAttribute('href', /^https:\/\/wa\.me\/971509782770\?text=Hello/);
  await expect(wa).toHaveAttribute('target', '_blank');
});

test('site search finds a service and opens it', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  await page.getByRole('button', { name: 'Search the site' }).click();
  const input = page.getByRole('searchbox');
  await input.fill('artificial intel');
  await expect(page.getByRole('option').first()).toContainText('Artificial Intelligence');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/services\/artificial-intelligence$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
