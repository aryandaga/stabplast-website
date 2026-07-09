# Stabplast Chemo Industries — corporate website

Static marketing site for Stabplast Chemo Industries Pvt Ltd (PVC stabilizer
manufacturer, Amravati, India). Built with **Eleventy 3** (ESM), deployed to
**Netlify** (site `unique-hotteok-7bf2b2`) at the custom domain
**https://stabplast.com** (remote: `github.com/aryandaga/stabplast-website`,
branch `main` — Netlify CI builds directly from GitHub on every push).

## Stack

- **Eleventy ^3.0** (`"type": "module"` — all config/data files are ESM)
- **Nunjucks** templates (`.njk`), Markdown also wired through njk
- **@11ty/eleventy-img ^5** — responsive `{% image %}` shortcode (AVIF/WebP/JPEG)
- **html-minifier-terser** — HTML minified only when `ELEVENTY_RUN_MODE === "build"`
- Plain hand-written CSS (no framework/preprocessor) + one vanilla-JS
  progressive-enhancement file. No client framework, no bundler, no tests, no linter.
- npm is the package manager (`package-lock.json`).

## Commands

```
npm run dev     # eleventy --serve (localhost:8080)
npm start       # same, --quiet
npm run build   # eleventy → _site/ (minifies HTML)
npm run clean   # rimraf _site
```

Deploy = push to `main`; Netlify (build config in `netlify.toml`) runs
`npm run build` and publishes `_site/`. No manual deploy step. GitHub Pages is
retired; `.github/workflows/deploy.yml` was deleted.

## Layout

```
netlify.toml              Netlify build config + security headers (HSTS, CSP, etc.) +
                          /api/contact → Netlify Function rewrite + long-cache headers
netlify/functions/contact.mjs  same-origin contact-form proxy (forwards to Apps Script
                          URL held in the FORM_ENDPOINT Netlify env var, not in repo)
.eleventy.js              config: HtmlBasePlugin, passthroughs, filters, collections,
                          dirs (src → _site) — no pathPrefix (root domain)
src/
  _config/image-shortcode.js   responsive <picture> shortcode (alt text REQUIRED — throws)
  _data/                  ALL site content lives here as JS modules:
    site.js               company facts, contact, SEO defaults, form endpoint,
                          Turnstile site key, buildId cache-buster  ← single source of truth
    nav.js                header nav; Products/Applications dropdowns derived from data below
    products.js           exports { categories, items } — 8 categories, product records
    applications.js       application records; `detail: true` ⇒ gets own page
    appDetails.js         = applications.filter(a => a.detail) (feeds pagination)
    home.js               homepage content: heroSlides, stats, services, sustainability
  _includes/
    layouts/base.njk      HTML shell: SEO/OG/JSON-LD, fonts, CSS/JS with ?v=buildId,
                          WhatsApp float, to-top button
    partials/             header.njk (nav + dropdowns), footer.njk, product-card.njk
  index.njk               homepage (hero slider, stats band, categories, apps, services)
  about.njk, contact.njk, products.njk, applications.njk
  products-category.njk   paginates products.categories → /products/{categorySlug}/
  product.njk             paginates products.items (size 1) → /products/{slug}/
  application.njk         paginates appDetails → /applications/{slug}/
  sitemap.njk, robots.txt, favicon.svg
  styles/                 tokens.css (design tokens) → global.css → home.css
  assets/images/          source images consumed by the image shortcode
  assets/static/          passthrough-copied to /assets/ (logo.png, site.js)
chemid/                   ⚠ gitignored REFERENCE ONLY — premium "Chemid" WordPress theme
                          used as the visual reference. Do not edit, ship, or redistribute.
website/                  ⚠ gitignored original image dump from the old site. Reference only.
_site/                    build output (gitignored; CI rebuilds it)
```

## How it renders

Pure static SSG — no server, no client-side data fetching. Data-file JS modules
(`src/_data/*.js`) are evaluated at build time and exposed globally to Nunjucks
(`site`, `nav`, `products`, `applications`, `home`…). Detail pages are generated
with Eleventy pagination over those arrays. `src/assets/static/site.js` adds
progressive enhancement only (mobile nav, hero slider autoplay 4800 ms, overlay
header, count-up stats, to-top, contact-form submit); every page works without JS.

## URL rules

Deployed at the root of the custom domain (no pathPrefix), so:
- Templates use **root-relative URLs** (`/products/`, `/styles/global.css`);
  `HtmlBasePlugin` is kept as a safety net so these keep working if the site
  is ever served under a sub-path again.
- Absolute URLs (canonical, OG, JSON-LD, sitemap) are built with the custom
  `absoluteUrl` filter + `site.url` — it preserves any sub-path where
  `new URL()` would drop it.

## Conventions

- **Content lives in `_data`, not templates.** To change copy/products/nav,
  edit the JS data modules; templates are dumb renderers.
- Data files carry heavy doc comments explaining provenance; **`[verify]` /
  `[VERIFY]` markers = unconfirmed placeholder copy** — don't present those as
  fact or remove the markers without brand-owner confirmation.
  (`product.njk` strips ` [verify]` from rendered output.)
- Images go through `{% image %}` (never raw `<img>` for content images);
  alt text is mandatory (shortcode throws). Hero slide 1 loads eager +
  `fetchpriority=high` (LCP); everything else lazy.
- CSS: BEM-ish naming (`block__element--modifier`), design tokens only from
  `tokens.css` (`--color-*`, `--space-*`, `--fs-*`). Comment-banner section
  headers in CSS and templates.
- Client JS: single IIFE, `data-*` attribute hooks (`[data-nav]`,
  `[data-slider]`…), respects `prefers-reduced-motion`, a11y attributes
  maintained (aria-expanded, roles on carousel/tabs).
- Accessibility is deliberate: skip-link, aria-current nav, breadcrumbs,
  form `aria-live` status. Keep it that way.
- Commits: conventional (`feat:`, `fix:`, `chore:`).

## External services

- **Contact form** → browser POSTs same-origin to `/api/contact`, which Netlify
  rewrites (200, not a redirect) to the `contact` Netlify Function
  (`netlify/functions/contact.mjs`). The function forwards server-side to a
  Google Apps Script web app (URL held in the `FORM_ENDPOINT` Netlify env var,
  not in this repo), which appends to a Google Sheet + emails a notification.
  The Apps Script URL never appears in HTML/page source — this same-origin
  proxy replaced a direct client-side POST that had been flagged as a
  phishing signature. Turnstile SECRET also lives outside this repo.
- **Cloudflare Turnstile** — public site key in `site.forms.turnstileSiteKey`;
  honeypot field `_gotcha` as backup.
- **Google Maps** keyless embed; **Google Fonts** (Inter); **wa.me** WhatsApp link.
- Site email is `ankit@stabplastchemo.in` (Zoho); the `stabplastchemo.com`
  identity domain still exists for mail only.
- Nothing is required locally beyond `npm install` — form/captcha degrade gracefully.
  Netlify env vars (e.g. `FORM_ENDPOINT`) are only needed for the deployed function.

## Known gaps / debt (as of 2026-07)

- Many product specs in `products.js` still `[verify]` drafts (`verified:false`).
- `descOnly` categories (Calcium Organic, Lubricants, Impact Modifiers) have no
  product records yet.
- No tests, no linting/formatting config.
