/**
 * One-off: illustrated "Speciality Lubricant" card — glossy prill pellets in the
 * lubricants family tint with the product name set over them. Writes the composed
 * 1600x1200 source into photos/speciality-lubricant.jpg so the normal
 * `npm run gen:images` pipeline picks it up (no more placeholder).
 *
 * Run:  node scripts/gen-prill-card.mjs   then   npm run gen:images
 */
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const W = 1600, H = 1200;
const OUT = "photos/speciality-lubricant.jpg";
const LOGO = "src/assets/static/logo.png";
const FONTS = ["scripts/fonts/Inter-Black.ttf", "scripts/fonts/Inter-Bold.ttf"].filter((f) => fs.existsSync(f));

// Deterministic scatter (LCG) so the illustration is reproducible run-to-run.
let seed = 20260709;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

// Prills scattered across the canvas, denser toward the bottom, clear of the
// top logo band (y < 260). Drawn back-to-front for natural overlap.
const beads = [];
for (let i = 0; i < 120; i++) {
  const y = 290 + Math.pow(rnd(), 0.7) * (H - 330); // bias downward → pile
  const x = 70 + rnd() * (W - 140);
  const r = 20 + rnd() * 28;
  beads.push({ x, y, r });
}
beads.sort((a, b) => a.y - b.y);

let prills = "";
for (const b of beads) {
  prills +=
    `<circle cx="${b.x.toFixed(1)}" cy="${b.y.toFixed(1)}" r="${b.r.toFixed(1)}" fill="url(#bead)" stroke="#e3d1a6" stroke-width="1"/>` +
    `<ellipse cx="${(b.x - b.r * 0.3).toFixed(1)}" cy="${(b.y - b.r * 0.34).toFixed(1)}" rx="${(b.r * 0.3).toFixed(1)}" ry="${(b.r * 0.2).toFixed(1)}" fill="#ffffff" opacity="0.75"/>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFF8EA"/>
      <stop offset="1" stop-color="#EFDFB8"/>
    </linearGradient>
    <radialGradient id="bead" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.55" stop-color="#f6edd7"/>
      <stop offset="1" stop-color="#d7c294"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#8a6b12" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g filter="url(#soft)">${prills}</g>
  <!-- legibility scrim behind the wordmark -->
  <rect x="170" y="452" width="1260" height="316" rx="30" fill="#fffaef" opacity="0.82"/>
  <rect x="170" y="452" width="1260" height="316" rx="30" fill="none" stroke="#e6d3a4" stroke-width="2"/>
  <text x="800" y="612" text-anchor="middle" font-family="Inter" font-weight="800" font-size="150" fill="#7a5c12">Speciality</text>
  <text x="800" y="742" text-anchor="middle" font-family="Inter" font-weight="800" font-size="150" fill="#7a5c12">Lubricant</text>
</svg>`;

const base = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { fontFiles: FONTS, defaultFontFamily: "Inter", loadSystemFonts: true },
}).render().asPng();

// Composite the (dark) logo top-centre, matching the badge cards.
const logo = await sharp(LOGO).resize({ width: 380 }).toBuffer();
await sharp(base)
  .composite([{ input: logo, top: 120, left: Math.round((W - 380) / 2) }])
  .jpeg({ quality: 86 })
  .toFile(OUT);

console.log(`[gen-prill-card] wrote ${path.resolve(OUT)}`);
