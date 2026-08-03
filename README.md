# Stabplast Chemo Industries — Website

Static corporate website for **Stabplast Chemo Industries Pvt Ltd**, a manufacturer of PVC stabilizers and additives.

Built with **[Eleventy 3](https://www.11ty.dev/)** and deployed on **Netlify**, with a serverless contact form (`netlify/functions/contact.mjs`).

## Development

```bash
npm install
npm run dev      # serve locally with live reload
npm run build    # build to _site/
```

## Asset generation

Product and category card images are generated from source photos:

```bash
npm run gen:images       # product images
npm run gen:categories   # category images
```

## Structure

- `src/` — Eleventy templates, data files (`src/_data/`), and config (`src/_config/`)
- `photos/` — source product photography
- `scripts/` — image-generation scripts (`@11ty/eleventy-img`, `resvg`)
- `netlify.toml` — build and deploy configuration
