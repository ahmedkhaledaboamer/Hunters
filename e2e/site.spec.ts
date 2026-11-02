import { expect, test, type Page } from '@playwright/test';

const routes = [
'/', '/about', '/history', '/services', '/services/erp-enterprise', '/solutions', '/industries', '/industries/healthcare',
'/how-we-work', '/partners', '/partners/partner-alpha', '/locations', '/news', '/book-consultation', '/contact', '/careers', '/governance'];

type Prefs = {theme?: 'dark' | 'light';locale?: 'ar' | 'en';};

/** Saves preferences before any app code runs, and records every console error / uncaught exception. */
async function setup(page: Page, prefs: Prefs = {}, intro = false) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {if (m.type() === 'error') errors.push(m.text());});
  await page.addInitScript(({ p, intro }) => {
    localStorage.setItem('hh:preferences', JSON.stringify({ theme: 'dark', locale: 'en', ...p }));
    // Skip the once-per-session intro unless a test is about it.
    if (!intro) sessionStorage.setItem('hh:intro', '1');
  }, { p: prefs, intro });
  return errors;
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
  await expect(page.locator('h1').first()).toContainText('نعيد هندسة');
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

  await panel.getByRole('radio').first().click(); // service
  await next.click();
  await panel.getByRole('radio').first().click(); // consultant
  await next.click();
  await next.click(); // meeting type keeps its defaults

  await panel.locator('[role=gridcell]:not([disabled])').first().click();
  await panel.locator('[role=radiogroup] [role=radio]:not([disabled])').first().click();
  await next.click();

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

test('booking details are validated', async ({ page }) => {
  await setup(page);
  await page.goto('/book-consultation');
  const panel = page.locator('.glass.rounded-3xl').first();
  const next = panel.locator('div.border-t button').last();
  await expect(next).toBeDisabled(); // nothing chosen yet
  await panel.getByRole('radio').first().click();
  await expect(next).toBeEnabled();
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

test.describe('preloader', () => {
  test('plays once per session, then gets out of the way', async ({ page }) => {
    await setup(page, {}, true);
    await page.goto('/');
    await expect(page.locator('#preloader')).toBeVisible();
    await expect(page.locator('#preloader')).toHaveCount(0, { timeout: 8000 });
    await expect(page.locator('html')).not.toHaveClass(/pl-active/);
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/pl-off/);
    await expect(page.locator('#preloader')).toHaveCount(0);
  });
});

test('back-to-top appears after scrolling and returns to the top', async ({ page }) => {
  await setup(page);
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Back to top' });
  await page.evaluate(() => window.scrollTo(0, 2000));
  await expect(button).toHaveAttribute('tabindex', '0');
  await button.click();
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBeLessThan(5);
});
