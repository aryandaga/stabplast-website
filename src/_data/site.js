/**
 * Global site configuration & company data.
 * SINGLE SOURCE OF TRUTH for company facts, contact details, SEO defaults.
 *
 * ⚠️  Fields marked  [VERIFY]  are placeholders — replace with real company
 *     data before launch. Nothing here should be treated as fact until confirmed.
 *
 * Confirmed 2026-07 (brand owner): founded 1988, Amravati (Maharashtra),
 * manufacturer. Call: +91 98231 66664. WhatsApp: +91 98231 08939.
 * Email: ankit@stabplastchemo.in (Zoho). Website domain: stabplast.com.
 *
 * NOTE: The Turnstile SECRET key and the form backend live OUTSIDE this repo
 * (in the Google Apps Script web app). Only the PUBLIC Turnstile site key and
 * the (non-secret) Apps Script web-app URL belong in the committed site.
 */
export default {
  // ---- Identity ----
  name: "Stabplast Chemo Industries",
  legalName: "Stabplast Chemo Industries Pvt Ltd",
  tagline: "Innovative Chemical Solutions for PVC",
  description:
    "Stabplast Chemo Industries is a PVC stabilizer manufacturer in Amravati, India, producing calcium-zinc and lead-based stabilizers, one-pack systems, metallic stearates and lead compounds for pipes, profiles, cables and plastics. Established 1988.",

  // ---- Deployment ----
  // Custom domain on Netlify (cut over from stabplastchemo.com/GitHub Pages
  // 2026-07-09, to escape the phishing-flag reputation on the old domain).
  // Email stays on stabplastchemo.in (Zoho) — website + mail are separate domains.
  url: "https://stabplast.com",
  lang: "en",
  locale: "en_IN",

  // ---- Contact ----
  contact: {
    phone: "+91 98231 66664",
    phoneHref: "tel:+919823166664",
    whatsapp: "+91 98231 08939",
    whatsappHref: "https://wa.me/919823108939",
    email: "ankit@stabplastchemo.in",
    emailHref: "mailto:ankit@stabplastchemo.in",
    salesEmail: "ankit@stabplastchemo.in",
    address: {
      street: "Tiwsa Gin, College Road, Old Cotton Market",
      locality: "Amravati",
      region: "Maharashtra",
      postalCode: "444601",
      country: "India",
      countryCode: "IN",
    },
    // Keyless Google Maps embed built from the address (no API key required).
    mapEmbed:
      "https://www.google.com/maps?q=Tiwsa+Gin,+College+Road,+Old+Cotton+Market,+Amravati,+Maharashtra+444601&output=embed",
    hours: "Mon–Sat, 9:30–18:30 IST",
    // Approx coordinates (Old Cotton Market, Amravati) for LocalBusiness schema.
    // Set a precise pin via Google Business Profile for Maps accuracy.
    geo: { latitude: "20.9333", longitude: "77.7500" },
  },

  // ---- Analytics ----
  // Paste your GA4 Measurement ID ("G-XXXXXXXXXX") to enable Google Analytics
  // site-wide. Empty = disabled (no tracking script is emitted).
  analytics: { ga4Id: "G-5KV1PL166S" },

  // ---- Forms ----
  forms: {
    // Deployed Google Apps Script web-app URL (NOT secret). Appends rows to the
    // Google Sheet + emails a notification on each submission.
    endpoint: "https://script.google.com/macros/s/AKfycbwnru5nUcFV8mENKor0QQLrfYclC7JfcVqMKIC8-b2L4K2ZVzjJ9TpXRmMzHbETZcSjaw/exec",
    // Public Cloudflare Turnstile site key (safe to expose in client HTML).
    turnstileSiteKey: "0x4AAAAAADuer7FVpo3upq8W",
  },

  // ---- Company facts ----
  facts: {
    founded: "1988",
    experienceYears: "35+",
    // Confirmed 2026-07 from the company profile (ISO 9001:2015, KVQA/NORSK-accredited).
    certifications: ["ISO 9001:2015"],
  },

  // ---- Social  [VERIFY / remove unused] ----
  social: {
    linkedin: "",
    facebook: "",
    twitter: "",
    youtube: "",
  },

  // ---- SEO defaults ----
  seo: {
    titleTemplate: "%s | Stabplast Chemo Industries",
    defaultTitle:
      "Stabplast Chemo Industries | PVC Stabilizer Manufacturer & Supplier",
    ogImage: "/assets/og-default.jpg", // [VERIFY] add a branded 1200×630 image
    twitterHandle: "",
  },

  // ---- Primary CTAs ----
  cta: {
    quote: { label: "Request a Quote", href: "/contact/" },
    call: { label: "Call Us", href: "tel:+919823166664" },
    email: { label: "Email Us", href: "mailto:ankit@stabplastchemo.in" },
  },

  buildYear: `${new Date().getFullYear()}`,

  // Cache-busting token appended to CSS/JS URLs so browsers fetch fresh assets
  // after each deploy (fixed asset URLs would otherwise be served from cache).
  buildId: `${Date.now()}`,
};
