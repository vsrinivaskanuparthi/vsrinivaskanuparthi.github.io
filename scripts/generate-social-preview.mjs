import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(new URL('./social-preview.html', import.meta.url).href);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.decode()));
  });
  await page.screenshot({ path: fileURLToPath(new URL('../public/portfolio-social-v2.png', import.meta.url)) });
  console.log('Created public/portfolio-social-v2.png (1200 × 630).');
} finally { await browser.close(); }
