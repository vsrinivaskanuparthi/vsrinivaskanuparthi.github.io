import sharp from 'sharp';
await sharp('assets/srinivas-portrait.png')
  .resize({ width: 780, withoutEnlargement: true })
  .webp({ quality: 86 })
  .toFile('public/srinivas-portrait.webp');

await sharp('assets/jarvis/hud-original.png')
  .webp({ quality: 92 })
  .toFile('public/jarvis-hud.webp');
