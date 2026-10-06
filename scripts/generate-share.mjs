import { readFile, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const html = await readFile('dist/index.html', 'utf8');
const head = html.slice(0, html.indexOf('</head>'));
const home = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
assert(home, 'Missing portfolio canonical URL');
const share = new URL('share/', home).href;
// Reuse the validated build metadata, without scripts or application styles.
const metadata = [...head.matchAll(/<title>[^<]*<\/title>|<meta\b[^>]*>|<link rel="canonical"[^>]*>/g)]
  .map(match => match[0].replace(`href="${home}"`, `href="${share}"`).replace(`content="${home}"`, `content="${share}"`))
  .join('\n');
const image = head.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
assert(image, 'Missing preview image');
const page = `<!doctype html>
<html lang="en"><head>${metadata}
<style>body{margin:0;background:#101713;color:#edf0e9;font:18px/1.6 system-ui,sans-serif}main{max-width:800px;margin:48px auto;padding:24px}img{display:block;width:100%;height:auto;border-radius:16px}h1{line-height:1.2}a{color:#c5f277}a:focus-visible{outline:3px solid #c5f277;outline-offset:6px}</style>
</head><body><main>
<img src="${image}" width="2400" height="1260" alt="Srinivas Kanuparthi — Engineer and Builder">
<h1>Srinivas Kanuparthi</h1>
<p>Lead Software Engineer at Airbus. Explore my engineering work, Jarvis personal AI assistant, AI Academy and Data Engineering learning platform.</p>
<p><a href="${home}">Explore my full portfolio →</a></p>
</main></body></html>`;
assert(!/<script\b/i.test(page), 'Share page must work without JavaScript');
assert(page.includes(`content="${share}"`));
await mkdir('dist/share', { recursive: true });
await writeFile('dist/share/index.html', page);
console.log(`Static sharing page generated: ${share}`);
