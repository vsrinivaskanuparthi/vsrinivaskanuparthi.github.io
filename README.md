# Srinivas Kanuparthi — React portfolio

A React + Vite portfolio presented as a personal engineering workspace. It includes a selectable project constellation, a technology map, searchable navigation (Cmd/Ctrl+K), project filters, an interactive Jarvis lab, a DMA case study, keyboard-accessible expertise tabs, persistent dark/light themes, and a responsive mobile menu. The production build prerenders the page so its content and navigation remain available before JavaScript loads.

## Deploy the prepared build

The finished site is in `dist/`. `portfolio-cloudflare.zip` contains the same files with `index.html` at the archive root.

For a Cloudflare Pages Direct Upload project, upload the ZIP or `dist` folder using the dashboard's drag-and-drop flow. The deployment needs no server, API keys, environment variables, or database. See [Cloudflare's Direct Upload instructions](https://developers.cloudflare.com/pages/get-started/direct-upload/).

If connecting the repository to Cloudflare Pages instead:

- Build command: `npm run build`
- Build output directory: `dist`
- Node: 22.12+ (the repository selects Node 22)

The canonical and social-sharing URLs use `https://srinivas-portfolio.pages.dev/`. The preview image is a locally hosted 2400×1260 PNG, validated during every build. To make a new Cloudflare/custom domain canonical, set `SITE_URL` to its full HTTPS URL when rebuilding, for example:

```sh
SITE_URL=https://your-portfolio.pages.dev npm run package
```

## Develop locally

Requires Node 22.12+ and npm. The Node 22.10 version originally installed on this machine is too old for the current Vite toolchain; a temporary Node runtime was used to produce the supplied build without changing the system installation.

```sh
npm ci
npm run dev
```

Use the development server URL printed in the terminal. The source `index.html` is a React entry point; opening it directly as a file is not the preview workflow.

```sh
npm run build       # Optimizes the portrait, builds React, prerenders HTML
npm run preview     # Serves the production dist locally
npm run package     # Builds and produces portfolio-cloudflare.zip (requires Python 3)
```

## Update content

- `src/data.js`: project descriptions, live URLs, career history, contact details, and technology lists.
- `src/App.jsx`: sections and interactions.
- `src/components/`: native SVG graphics, technology map, and case study.
- `src/styles.css`: core layout, themes, and responsive styles.
- `src/workspace.css`: the project constellation, Jarvis lab, and quick navigation.
- `public/`: downloadable résumé, social preview, favicon, and Cloudflare headers.
- `assets/srinivas-portrait.png`: original portrait; the build generates a smaller WebP automatically.

Jarvis is marked as a local prototype and links to its in-page lab. The two command walkthroughs are illustrative, fixed examples based on the actual project architecture: they do not connect to the local assistant, run a language model, request microphone access, or execute system actions. The actual HUD capture can be enlarged in the screen viewer.

AI Academy links to its live deployment. The Data Engineering Learning Platform has `url: null`, displays “Not yet deployed,” and offers an email link. Add its URL to `src/data.js` when it is published; the status and filter membership update automatically. The card link uses its `linkLabel` field.

The previous static portfolio is preserved in `legacy-static/`, with the original image and résumé under `assets/`.

## Validation

```sh
npm test
```

Tests use installed Google Chrome (`channel: 'chrome'`). If needed, install it with `npx playwright install chrome`. Tests start a local production preview and cover six viewport sizes, mobile navigation, project filtering, the technology map, keyboard tabs, modal focus restoration, theme persistence, email copying, the PDF, no-JavaScript content, reduced motion, the project constellation (including node visibility on small screens), quick navigation and keyboard shortcuts, Jarvis scenario selection/playback/reset, the actual HUD viewer, and automated WCAG AA checks in both themes.

The Jarvis HUD image was captured from `~/jarvis/hud-ui/dist` with runtime connections blocked. The original screenshot is `assets/jarvis/hud-original.png`; the build creates `public/jarvis-hud.webp`. It shows the real interface with the core offline and no live telemetry. The earlier LinkedIn post image was not located and is not represented as included.

The font files are self-hosted from the Manrope and DM Sans Fontsource packages. Their licenses are included in `public/font-licenses/` and in the production build.

## LinkedIn sharing preview

After redeploying the updated build, inspect `https://srinivas-portfolio.pages.dev/` with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), then add the URL to Featured again. The previous deployment pointed to a GitHub Pages preview image returning HTTP 404.

`npm run social:preview` regenerates `public/portfolio-social-v3.png` from `scripts/social-preview.html` using installed Google Chrome. This command is optional and separate from production builds; the checked-in PNG ships automatically. `npm run test:social` checks the built HTML and actual preview image.

This deployment is on Cloudflare Pages. Upload the rebuilt `dist/` folder to a new production deployment in the existing `srinivas-portfolio` Pages project.
