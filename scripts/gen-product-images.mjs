#!/usr/bin/env node
/**
 * Product card image generator.
 *
 * Produces ONE canonical source image per product — 1600x1200 JPEG, quality
 * 82 — written to src/assets/images/products/cards/{slug}.jpg. The Eleventy
 * `{% image %}` shortcode (src/_config/image-shortcode.js) derives the
 * 400/800/1200 responsive AVIF/WebP/JPEG variants from that single source at
 * build time, so nothing else needs to change downstream.
 *
 * Three image kinds, declared per-slug in MANIFEST below:
 *   - "badge"  → family-tinted background + logo + big abbreviation text
 *   - "photo"  → normalizes a real photo dropped in photos/{slug}.{jpg,jpeg,png}
 *   - "hybrid" → real photo, darkened scrim, big white abbreviation text
 *
 * For "photo"/"hybrid" entries, if the raw file is absent, a family-tinted
 * placeholder badge is generated instead (using the item's `shortName` from
 * src/_data/products.js) so the Eleventy build never breaks on a missing image.
 *
 * Run: npm run gen:images
 */
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";
import { items as productItems } from "../src/_data/products.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PHOTOS_DIR = path.join(ROOT, "photos");
const OUT_DIR = path.join(ROOT, "src/assets/images/products/cards");
const LOGO_PATH = path.join(ROOT, "src/assets/static/logo.png");
const FONT_DIR = path.join(__dirname, "fonts");

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 1200;
const JPEG_QUALITY = 82;
const MAX_TEXT_WIDTH = 1180;
const MAX_FONT_SIZE = 360;
const MIN_FONT_SIZE = 40;
const TEXT_BASELINE_Y = 680;
const LOGO_TARGET_WIDTH = 380;
const LOGO_TOP = 150;

// ---------------------------------------------------------------------------
// Family tints — (bg, text) pairs, light bg / dark on-brand text
// ---------------------------------------------------------------------------
const FAMILY_TINTS = {
  lead: { bg: "#ECEFF3", text: "#33404F" },
  cazn: { bg: "#E6F7EF", text: "#0B7D57" },
  caorg: { bg: "#E3F4F4", text: "#0C7573" },
  individual: { bg: "#F3EFE7", text: "#6F5C30" },
  lubricants: { bg: "#FFF5DF", text: "#8A6B12" },
  stearates: { bg: "#E9F1FF", text: "#0F4FD6" },
  cpvc: { bg: "#EEF2FF", text: "#1668F5" },
  aids: { bg: "#FBEEDE", text: "#9A5B12" },
};

// ---------------------------------------------------------------------------
// Manifest — one entry per src/_data/products.js item (26 total).
// `label` is only used for "badge" kind; "photo"/"hybrid" fall back to the
// item's `shortName` when no raw photo is present.
// ---------------------------------------------------------------------------
const MANIFEST = [
  // Lead based stabilizers
  { slug: "one-pack-stabilizer", family: "lead", kind: "badge", label: "Pb" },
  { slug: "lead-organic-stabilizer", family: "lead", kind: "badge", label: "Pb-OBS" },
  { slug: "non-lubricated-lead-stabilizer", family: "lead", kind: "photo" },
  { slug: "lead-fitting-stabilizer", family: "lead", kind: "hybrid", label: "Pb" },

  // Calcium-zinc stabilizers
  { slug: "calcium-zinc-stabilizer", family: "cazn", kind: "badge", label: "Ca-Zn" },
  { slug: "calcium-zinc-fitting-stabilizer", family: "cazn", kind: "badge", label: "Ca-Zn" },
  { slug: "calcium-zinc-profile-stabilizer", family: "cazn", kind: "badge", label: "Ca-Zn" },
  { slug: "calcium-zinc-cable-stabilizer", family: "cazn", kind: "badge", label: "Ca-Zn" },

  // Calcium-organic stabilizers
  { slug: "calcium-organic-opvc", family: "caorg", kind: "badge", label: "Ca-OBS" },
  { slug: "calcium-organic-large-diameter", family: "caorg", kind: "badge", label: "Ca-OBS" },

  // Individual stabilizers
  { slug: "tribasic-lead-sulphate", family: "individual", kind: "badge", label: "TBLS" },
  { slug: "lead-stearate", family: "individual", kind: "badge", label: "LS" },
  { slug: "dibasic-lead-stearate", family: "individual", kind: "badge", label: "DBLS" },
  { slug: "dibasic-lead-phosphite", family: "individual", kind: "badge", label: "DBLP" },
  { slug: "dibasic-lead-phthalate", family: "individual", kind: "photo" },

  // Lubricants & waxes
  { slug: "stearic-acid", family: "lubricants", kind: "photo" },
  { slug: "pvc-wax", family: "lubricants", kind: "photo" },
  { slug: "speciality-lubricant", family: "lubricants", kind: "photo" },

  // Metallic stearates
  { slug: "calcium-stearate", family: "stearates", kind: "badge", label: "CS" },
  { slug: "zinc-stearate", family: "stearates", kind: "badge", label: "ZS" },
  { slug: "magnesium-stearate", family: "stearates", kind: "badge", label: "MS" },
  { slug: "barium-stearate", family: "stearates", kind: "badge", label: "BS" },

  // CPVC one-pack
  { slug: "cpvc-pipe-stabilizer", family: "cpvc", kind: "photo" },
  { slug: "cpvc-fitting-stabilizer", family: "cpvc", kind: "photo" },

  // Processing aids & impact modifiers
  { slug: "processing-aid", family: "aids", kind: "badge", label: "PA" },
  { slug: "impact-modifier", family: "aids", kind: "badge", label: "IM" },
];

// ---------------------------------------------------------------------------
// Fonts — Inter Black / Bold, downloaded into scripts/fonts/. Falls back to
// system fonts (no hard failure) if they are missing.
// ---------------------------------------------------------------------------
function resolveFontFiles() {
  const black = path.join(FONT_DIR, "Inter-Black.ttf");
  const bold = path.join(FONT_DIR, "Inter-Bold.ttf");
  const files = [black, bold].filter((f) => existsSync(f));
  return { files, haveBlack: existsSync(black), haveBold: existsSync(bold) };
}

const { files: FONT_FILES, haveBlack: HAVE_INTER_BLACK } = resolveFontFiles();
if (FONT_FILES.length < 2) {
  console.warn(
    "[gen-product-images] Inter-Black.ttf / Inter-Bold.ttf not found in scripts/fonts/ — falling back to system fonts for badge text."
  );
}

// Inter's static "Black" instance registers under the family name "Inter Black"
// (not "Inter" at weight 900) — confirmed from the downloaded font's name table.
// The family has only one face, so fontdb resolves it regardless of the
// requested weight; 900 is kept for semantic accuracy (and as the correct
// value for the system-font fallback path).
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
function fitFontSize(text) {
  const probeSize = 100;
  const measuredWidth = measureTextWidth(text, probeSize);
  const scaled = Math.floor((MAX_TEXT_WIDTH / measuredWidth) * probeSize);
  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, scaled));
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
async function isLogoDark() {
  const stats = await sharp(LOGO_PATH).stats();
  const [r, g, b] = stats.channels;
  const meanBrightness = (r.mean + g.mean + b.mean) / 3;
  return meanBrightness < 200; // near-white logos would not read on a light tint
}

async function buildResizedLogo() {
  return sharp(LOGO_PATH).resize({ width: LOGO_TARGET_WIDTH }).toBuffer();
}

// ---------------------------------------------------------------------------
// Raw photo lookup
// ---------------------------------------------------------------------------
function findRawPhoto(slug) {
  for (const ext of ["jpg", "jpeg", "png"]) {
    const candidate = path.join(PHOTOS_DIR, `${slug}.${ext}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function getShortName(slug) {
  const item = productItems.find((i) => i.slug === slug);
  if (!item) {
    throw new Error(`No src/_data/products.js item found for slug "${slug}"`);
  }
  return item.shortName;
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------
let logoIsDarkCache;
let logoBufferCache;

async function getLogoOverlay() {
  if (logoIsDarkCache === undefined) {
    logoIsDarkCache = await isLogoDark();
    if (logoIsDarkCache) {
      logoBufferCache = await buildResizedLogo();
    } else {
      console.warn("[gen-product-images] Logo does not read as dark against light tints — skipping logo overlay.");
    }
  }
  return logoIsDarkCache ? logoBufferCache : null;
}

async function generateBadge({ slug, family, label }) {
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

  const fontSize = fitFontSize(label);
  const { data: textPng, info: textInfo } = await renderTrimmedTextPng({
    text: label,
    fill: tint.text,
    fontSize,
  });
  composites.push({
    input: textPng,
    left: Math.round((CANVAS_WIDTH - textInfo.width) / 2),
    top: Math.round(TEXT_BASELINE_Y - textInfo.height / 2),
  });

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

  await writeFile(path.join(OUT_DIR, `${slug}.jpg`), outBuffer);
}

async function generatePlainPhoto(rawPath, slug) {
  const outBuffer = await sharp(rawPath)
    .resize(CANVAS_WIDTH, CANVAS_HEIGHT, { fit: "cover", position: "centre" })
    .flatten({ background: "#FFFFFF" })
    .jpeg({ quality: JPEG_QUALITY })
    .toBuffer();
  await writeFile(path.join(OUT_DIR, `${slug}.jpg`), outBuffer);
}

async function generateHybrid({ slug, family, label, rawPath }) {
  const baseBuffer = await sharp(rawPath)
    .resize(CANVAS_WIDTH, CANVAS_HEIGHT, { fit: "cover", position: "centre" })
    .flatten({ background: "#000000" })
    .toBuffer();

  const scrimSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}"><rect width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" fill="black" fill-opacity="0.35"/></svg>`;
  const scrimBuffer = await sharp(Buffer.from(scrimSvg)).png().toBuffer();

  const fontSize = fitFontSize(label);
  const { data: textPng, info: textInfo } = await renderTrimmedTextPng({
    text: label,
    fill: "#FFFFFF",
    fontSize,
  });

  const outBuffer = await sharp(baseBuffer)
    .composite([
      { input: scrimBuffer },
      {
        input: textPng,
        left: Math.round((CANVAS_WIDTH - textInfo.width) / 2),
        top: Math.round(TEXT_BASELINE_Y - textInfo.height / 2),
      },
    ])
    .jpeg({ quality: JPEG_QUALITY })
    .toBuffer();

  await writeFile(path.join(OUT_DIR, `${slug}.jpg`), outBuffer);
}

async function processEntry(entry) {
  const { slug, family, kind, label } = entry;

  if (kind === "badge") {
    await generateBadge({ slug, family, label });
    return { slug, kind, placeholder: false };
  }

  if (kind === "photo") {
    const rawPath = findRawPhoto(slug);
    if (rawPath) {
      await generatePlainPhoto(rawPath, slug);
      return { slug, kind, placeholder: false };
    }
    await generateBadge({ slug, family, label: getShortName(slug) });
    return { slug, kind, placeholder: true };
  }

  if (kind === "hybrid") {
    const rawPath = findRawPhoto(slug);
    if (rawPath) {
      await generateHybrid({ slug, family, label, rawPath });
      return { slug, kind, placeholder: false };
    }
    await generateBadge({ slug, family, label: getShortName(slug) });
    return { slug, kind, placeholder: true };
  }

  throw new Error(`Unknown manifest kind "${kind}" for slug "${slug}"`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  if (MANIFEST.length !== 26) {
    throw new Error(`Expected 26 manifest entries, found ${MANIFEST.length}`);
  }

  const results = [];
  for (const entry of MANIFEST) {
    const result = await processEntry(entry);
    results.push(result);
    console.log(`[gen-product-images] ${result.slug}: ${result.placeholder ? "PLACEHOLDER" : "ok"}`);
  }

  const placeholders = results.filter((r) => r.placeholder);
  console.log(
    `\n[gen-product-images] Done — ${results.length} images written, ${placeholders.length} placeholder(s).`
  );
  if (placeholders.length) {
    console.log(`[gen-product-images] Placeholder slugs: ${placeholders.map((r) => r.slug).join(", ")}`);
  }
}

main().catch((err) => {
  console.error("[gen-product-images] FAILED:", err);
  process.exitCode = 1;
});
