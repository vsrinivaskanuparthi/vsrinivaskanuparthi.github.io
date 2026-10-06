import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [320, 390, 600, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/is-interactive/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    if (width <= 820) {
      await page.getByRole('button', { name: 'Open menu', exact: true }).click();
      await page.locator('#main-nav').getByRole('link', { name: 'Projects', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
      await expect(page).toHaveURL(/#projects$/);
    }
    await expect(page.locator('.project-card')).toHaveCount(3);
    const nodesFit = await page.locator('.constellation-space').evaluate(space => {
      const bounds = space.getBoundingClientRect();
      return [...space.querySelectorAll('.world-node')].every(node => {
        const box = node.getBoundingClientRect();
        return box.left >= bounds.left && box.right <= bounds.right;
      });
    });
    expect(nodesFit).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test('project filters and correct deployment links', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Live', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Explore AI Academy' })).toHaveAttribute('href', 'https://ai-learning-platform-3fp.pages.dev/');
  await page.getByRole('button', { name: 'Not yet deployed', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card h3')).toHaveText('Data Engineering Learning Platform');
  await expect(page.locator('.project-status')).toHaveText('Not yet deployed');
  await page.getByRole('button', { name: /All projects/ }).click();
  await expect(page.locator('.project-card')).toHaveCount(3);
});

test('technology map and keyboard-operated expertise tabs', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Technology', exact: true }).click();
  await page.getByRole('button', { name: 'Explore AWS', exact: true }).click();
  await expect(page.locator('.console-detail')).toContainText('The infrastructure');
  await page.getByRole('tab', { name: /Backend/ }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: /Cloud/ })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('AWS Lambda');
  await page.keyboard.press('End');
  await expect(page.getByRole('tabpanel')).toContainText('Team leadership');
});

test('case study focus, Escape, and native contribution details', async ({ page }) => {
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Read the case study' });
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('parallel processing');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
  await page.locator('.impact-card summary').first().click();
  await expect(page.locator('.impact-card details').first()).toHaveAttribute('open', '');
});

test('theme persists, copy email works, resume is downloadable', async ({ page, context, request }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.locator('.copy-status')).toHaveText('Email copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('srinivasdharanik@gmail.com');
  const response = await request.get('/srinivas-kanuparthi-resume.pdf');
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
});

test('prerendered content and navigation survive disabled JavaScript', async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#main-nav')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore AI Academy' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.close();
});

test('reduced motion suppresses decorative animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.universe-packets').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
});

for (const theme of ['dark', 'light']) {
  test(`accessible page in ${theme} theme`, async ({ page }) => {
    await page.goto('/');
    if (theme === 'light') await page.getByRole('button', { name: 'Switch to light theme' }).click();
    const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
    await page.getByRole('button', { name: 'Read the case study' }).click();
    const dialog = await new AxeBuilder({ page }).include('.case-dialog').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(dialog.violations).toEqual([]);
  });
}

test('project universe changes its inspector and links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.world-inspector h3')).toHaveText('JARVIS');
  await page.getByRole('button', { name: 'Explore AI Academy project' }).click();
  await expect(page.locator('.world-inspector h3')).toHaveText('AI Academy');
  await expect(page.locator('.world-open')).toHaveAttribute('href', 'https://ai-learning-platform-3fp.pages.dev/');
  await page.getByRole('button', { name: 'Explore Data Engineering project' }).click();
  await expect(page.locator('.world-status')).toHaveText('NOT YET DEPLOYED');
  await page.getByRole('button', { name: 'Local prototype', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card')).toContainText('JARVIS');
});

test('quick navigation searches, handles keyboard input, and restores focus', async ({ page }) => {
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Open quick navigation' });
  await opener.click();
  const search = page.getByRole('textbox', { name: 'Search portfolio' });
  await expect(search).toBeFocused();
  await search.fill('does-not-exist');
  await expect(page.locator('.jump-empty')).toBeVisible();
  await search.fill('jarvis');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page).toHaveURL(/#jarvis$/);
  await expect(page.locator('#jarvis')).toBeFocused();
  await opener.click();
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog', { name: 'Where would you like to go?' })).toBeVisible();
});

test('Jarvis walkthrough plays, pauses, resets, and changes routing without a backend', async ({ page }) => {
  const sockets = [];
  page.on('websocket', socket => sockets.push(socket.url()));
  await page.clock.install();
  await page.goto('/');
  await expect(page.locator('.lab-demo-label')).toContainText('No microphone, model, or device actions');
  await page.getByRole('button', { name: 'Play walkthrough', exact: true }).click();
  await page.clock.runFor(2500);
  await expect(page.locator('.lab-step-copy h3')).toHaveText('“Open Calculator.”');
  await page.getByRole('button', { name: 'Pause walkthrough' }).click();
  await page.clock.runFor(5000);
  await expect(page.locator('.lab-step-copy h3')).toHaveText('“Open Calculator.”');
  await page.getByRole('button', { name: 'Step 4: Act' }).click();
  await expect(page.locator('.reactor-center-copy strong')).toHaveText('EXECUTING');
  await page.getByRole('button', { name: 'Reset walkthrough' }).click();
  await expect(page.locator('.lab-step-copy h3')).toHaveText('“Wake up Jarvis.”');
  await page.getByRole('button', { name: /What is Node.js\?/ }).click();
  await page.getByRole('button', { name: 'Step 3: Route' }).click();
  await expect(page.locator('.lab-event')).toContainText('Fast Brain');
  expect(sockets).toEqual([]);
});

test('actual Jarvis HUD opens accessibly and loads the real capture', async ({ page }) => {
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'View the actual HUD' });
  await opener.click();
  await expect(page.getByRole('dialog', { name: 'The actual Jarvis HUD' })).toBeVisible();
  expect(await page.locator('.hud-dialog > img').evaluate(img => img.complete && img.naturalWidth === 1728)).toBeTruthy();
  const result = await new AxeBuilder({ page }).include('.hud-dialog').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});
