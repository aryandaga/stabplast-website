#!/usr/bin/env node
/**
 * Category-tile image generator.
 *
 * Produces ONE canonical source image per product category (7 of the 8 —
 * CPVC reuses an existing product photo, see MANIFEST note below) — 1600x1200
 * JPEG, quality 86 — written to src/assets/images/products/cards/cat-{slug}.jpg.
 * The Eleventy `{% image %}` shortcode (src/_config/image-shortcode.js) derives
 * the 400/800/1200 responsive AVIF/WebP/JPEG variants from that single source
 * at build time, so nothing else needs to change downstream.
 *
 * Visual style intentionally mirrors scripts/gen-product-images.mjs badges
 * (same family tints, same Inter Black text via resvg, same logo compositing)
 * so category tiles and product badges read as one system. The one addition
 * here is multi-line word-wrapping for long category labels — short labels
 * ("Pb", "Ca-Zn", "Ca-OBS", "PA & IM") stay on one line; long labels ("Heat
 * Stabilizers", "Lubricants & Waxes", "Metallic Stearate") wrap to two lines.
 *
 * Run: npm run gen:categories
 */
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "src/assets/images/products/cards");
const LOGO_PATH = path.join(ROOT, "src/assets/static/logo.png");
const FONT_DIR = path.join(__dirname, "fonts");

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 1200;
const JPEG_QUALITY = 86;
const MAX_TEXT_WIDTH = 1180;
const MAX_FONT_SIZE_SINGLE_LINE = 360;
const MAX_FONT_SIZE_TWO_LINE = 170;
const MIN_FONT_SIZE = 40;
const TEXT_BASELINE_Y = 680; // single-line vertical center
const TWO_LINE_TOP_Y = 600; // first line vertical center
const TWO_LINE_BOTTOM_Y = 780; // second line vertical center
const LOGO_TARGET_WIDTH = 380;
const LOGO_TOP = 150;

// ---------------------------------------------------------------------------
// Family tints — (bg, text) pairs, identical to gen-product-images.mjs
// ---------------------------------------------------------------------------
const FAMILY_TINTS = {
  lead: { bg: "#ECEFF3", text: "#33404F" },
  cazn: { bg: "#E6F7EF", text: "#0B7D57" },
  caorg: { bg: "#E3F4F4", text: "#0C7573" },
  individual: { bg: "#F3EFE7", text: "#6F5C30" },
  lubricants: { bg: "#FFF5DF", text: "#8A6B12" },
  stearates: { bg: "#E9F1FF", text: "#0F4FD6" },
  aids: { bg: "#FBEEDE", text: "#9A5B12" },
};

// ---------------------------------------------------------------------------
// Manifest — 7 of the 8 categories (CPVC One-Pack reuses an existing product
// photo, src/assets/images/products/cards/cpvc-fitting-stabilizer.jpg, and is
// wired directly in src/_data/products.js instead of being generated here).
// `lines` is the pre-decided word wrap: one array entry = one rendered line.
// ---------------------------------------------------------------------------
const MANIFEST = [
  { slug: "lead-based-stabilizers", family: "lead", lines: ["Pb"] },
  { slug: "calcium-zinc-stabilizers", family: "cazn", lines: ["Ca-Zn"] },
  { slug: "calcium-organic-stabilizers", family: "caorg", lines: ["Ca-OBS"] },
  { slug: "individual-stabilizers", family: "individual", lines: ["Heat", "Stabilizers"] },
  { slug: "lubricants-waxes", family: "lubricants", lines: ["Lubricants &", "Waxes"] },
  { slug: "metallic-stearates", family: "stearates", lines: ["Metallic", "Stearate"] },
  { slug: "processing-aids-impact-modifiers", family: "aids", lines: ["PA & IM"] },
];

// ---------------------------------------------------------------------------
// Fonts — Inter Black / Bold, same files as gen-product-images.mjs
// ---------------------------------------------------------------------------
function resolveFontFiles() {
  const black = path.join(FONT_DIR, "Inter-Black.ttf");
  const bold = path.join(FONT_DIR, "Inter-Bold.ttf");
  const files = [black, bold].filter((f) => existsSync(f));
  return { files, haveBlack: existsSync(black) };
}

const { files: FONT_FILES, haveBlack: HAVE_INTER_BLACK } = resolveFontFiles();
if (FONT_FILES.length < 2) {
  console.warn(
    "[gen-category-images] Inter-Black.ttf / Inter-Bold.ttf not found in scripts/fonts/ — falling back to system fonts for tile text."
  );
}

const TEXT_FONT_FAMILY = HAVE_INTER_BLACK ? "Inter Black" : "sans-serif";
const TEXT_FONT_WEIGHT = 900;

const RESVG_FONT_OPTIONS = {
  fontFiles: FONT_FILES,
  defaultFontFamily: "Inter",
  loadSystemFonts: true,
};

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

// ---------------------------------------------------------------------------
// Text rendering via resvg (so we control the exact font files used)
// ---------------------------------------------------------------------------
function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildTextSvg({ text, fontSize, fill, width = 4000, height = 900 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <text x="0" y="${height / 2}" font-family="${TEXT_FONT_FAMILY}" font-weight="${TEXT_FONT_WEIGHT}" font-size="${fontSize}" fill="${fill}" text-anchor="start" dominant-baseline="middle">${escapeXml(text)}</text>
</svg>`;
}

/** Measures the rendered glyph width of `text` at a probe font size using resvg's own bbox math. */
function measureTextWidth(text, probeFontSize = 100) {
  const svg = buildTextSvg({ text, fontSize: probeFontSize, fill: "#000000" });
  const resvg = new Resvg(svg, { font: RESVG_FONT_OPTIONS });
  const bbox = resvg.getBBox();
  if (!bbox || !bbox.width) {
    throw new Error(`Could not measure text bbox for "${text}"`);
  }
  return bbox.width;
}

/** Auto-fits a font size so the rendered text width stays under maxWidth, capped at maxSize. */
function fitFontSize(text, maxSize) {
  const probeSize = 100;
  const measuredWidth = measureTextWidth(text, probeSize);
  const scaled = Math.floor((MAX_TEXT_WIDTH / measuredWidth) * probeSize);
  return Math.max(MIN_FONT_SIZE, Math.min(maxSize, scaled));
}

/** Renders `text` to a transparent PNG buffer, trimmed tightly to its ink bounding box. */
async function renderTrimmedTextPng({ text, fill, fontSize }) {
  const svg = buildTextSvg({ text, fontSize, fill });
  const resvg = new Resvg(svg, { font: RESVG_FONT_OPTIONS, background: "rgba(0,0,0,0)" });
  const png = resvg.render().asPng();
  return sharp(png).trim().toBuffer({ resolveWithObject: true });
}

// ---------------------------------------------------------------------------
// Logo — decide once whether it reads on the light family tints
// ---------------------------------------------------------------------------
let logoIsDarkCache;
let logoBufferCache;

async function isLogoDark() {
  const stats = await sharp(LOGO_PATH).stats();
  const [r, g, b] = stats.channels;
  const meanBrightness = (r.mean + g.mean + b.mean) / 3;
  return meanBrightness < 200; // near-white logos would not read on a light tint
}

async function buildResizedLogo() {
  return sharp(LOGO_PATH).resize({ width: LOGO_TARGET_WIDTH }).toBuffer();
}

async function getLogoOverlay() {
  if (logoIsDarkCache === undefined) {
    logoIsDarkCache = await isLogoDark();
    if (logoIsDarkCache) {
      logoBufferCache = await buildResizedLogo();
    } else {
      console.warn("[gen-category-images] Logo does not read as dark against light tints — skipping logo overlay.");
    }
  }
  return logoIsDarkCache ? logoBufferCache : null;
}

// ---------------------------------------------------------------------------
// Tile generator
// ---------------------------------------------------------------------------
async function generateTile({ slug, family, lines }) {
  const tint = FAMILY_TINTS[family];
  const composites = [];

  const logoBuffer = await getLogoOverlay();
  if (logoBuffer) {
    const logoMeta = await sharp(logoBuffer).metadata();
    composites.push({
      input: logoBuffer,
      left: Math.round((CANVAS_WIDTH - logoMeta.width) / 2),
      top: LOGO_TOP,
    });
  }

  if (lines.length === 1) {
    const fontSize = fitFontSize(lines[0], MAX_FONT_SIZE_SINGLE_LINE);
    const { data: textPng, info: textInfo } = await renderTrimmedTextPng({
      text: lines[0],
      fill: tint.text,
      fontSize,
    });
    composites.push({
      input: textPng,
      left: Math.round((CANVAS_WIDTH - textInfo.width) / 2),
      top: Math.round(TEXT_BASELINE_Y - textInfo.height / 2),
    });
  } else {
    // Two lines share one font size — the smaller of each line's own fit —
    // so both stay under MAX_TEXT_WIDTH and read as a single balanced block.
    const fontSize = Math.min(
      fitFontSize(lines[0], MAX_FONT_SIZE_TWO_LINE),
      fitFontSize(lines[1], MAX_FONT_SIZE_TWO_LINE)
    );
    const lineCenters = [TWO_LINE_TOP_Y, TWO_LINE_BOTTOM_Y];
    for (let i = 0; i < lines.length; i++) {
      const { data: textPng, info: textInfo } = await renderTrimmedTextPng({
        text: lines[i],
        fill: tint.text,
        fontSize,
      });
      composites.push({
        input: textPng,
        left: Math.round((CANVAS_WIDTH - textInfo.width) / 2),
        top: Math.round(lineCenters[i] - textInfo.height / 2),
      });
    }
  }

  const outBuffer = await sharp({
    create: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      channels: 3,
      background: hexToRgb(tint.bg),
    },
  })
    .composite(composites)
    .jpeg({ quality: JPEG_QUALITY })
    .toBuffer();

  await writeFile(path.join(OUT_DIR, `cat-${slug}.jpg`), outBuffer);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  if (MANIFEST.length !== 7) {
    throw new Error(`Expected 7 manifest entries, found ${MANIFEST.length}`);
  }

  for (const entry of MANIFEST) {
    await generateTile(entry);
    console.log(`[gen-category-images] cat-${entry.slug}: ok`);
  }

  console.log(`\n[gen-category-images] Done — ${MANIFEST.length} images written.`);
}

main().catch((err) => {
  console.error("[gen-category-images] FAILED:", err);
  process.exitCode = 1;
});
