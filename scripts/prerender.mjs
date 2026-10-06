import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
let template = await readFile('dist/index.html', 'utf8');
if (process.env.SITE_URL) {
  const site = new URL(process.env.SITE_URL);
  if (!['https:', 'http:'].includes(site.protocol)) throw new Error('SITE_URL must be an HTTP(S) URL');
  const base = site.href.replace(/\/$/, '');
  template = template.replaceAll('https://portfolio.vsrinivas-kanuparthi.workers.dev', base);
}
if (!template.includes('<!--app-html-->')) throw new Error('Prerender placeholder is missing');
await writeFile('dist/index.html', template.replace('<!--app-html-->', render()));
await rm('.prerender', { recursive: true, force: true });
console.log('Prerendered portfolio: content is readable before JavaScript loads.');
