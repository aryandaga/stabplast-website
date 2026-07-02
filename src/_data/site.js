/**
 * Global site configuration & company data.
 * SINGLE SOURCE OF TRUTH for company facts, contact details, SEO defaults.
 *
 * ⚠️  Fields marked  [VERIFY]  are placeholders — replace with real company
 *     data before launch. Nothing here should be treated as fact until confirmed.
 *
 * Confirmed 2026-07 (brand owner): founded 1988, Amravati (Maharashtra),
 * manufacturer & exporter. Call: +91 98231 66664. WhatsApp: +91 98231 08939.
 * Email: sales@stabplastchemo.com.
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
    "Stabplast Chemo Industries manufactures and exports high-performance PVC stabilizers, metallic stearates and lead compounds for pipes, profiles, cables and plastics. Established 1988, Amravati, India.",

  // ---- Deployment ----
  // GitHub Pages project site. Includes the /stabplast-website/ sub-path so
  // canonical/OG/JSON-LD/sitemap URLs resolve correctly (see absoluteUrl filter).
  // When a custom domain is attached later, change this to e.g. https://stabplastchemo.com
  // and drop the pathPrefix in .eleventy.js.
  url: "https://aryandaga.github.io/stabplast-website",
  lang: "en",
  locale: "en_IN",

  // ---- Contact ----
  contact: {
    phone: "+91 98231 66664",
    phoneHref: "tel:+919823166664",
    whatsapp: "+91 98231 08939",
    whatsappHref: "https://wa.me/919823108939",
    email: "sales@stabplastchemo.com",
    emailHref: "mailto:sales@stabplastchemo.com",
    salesEmail: "sales@stabplastchemo.com",
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
  },

  // ---- Forms ----
  forms: {
    // [VERIFY] Paste the deployed Google Apps Script web-app URL here (NOT secret).
    // Until set, the contact form does not submit. See the Apps Script setup notes.
    endpoint: "",
    // Public Cloudflare Turnstile site key (safe to expose in client HTML).
    turnstileSiteKey: "0x4AAAAAADuer7FVpo3upq8W",
  },

  // ---- Company facts ----
  facts: {
    founded: "1988",
    experienceYears: "35+",
    certifications: [], // [VERIFY] e.g. ["ISO 9001:2015"] — leave empty until confirmed
    exportMarkets: "[VERIFY] confirmed exporter; list markets once known",
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
    email: { label: "Email Us", href: "mailto:sales@stabplastchemo.com" },
  },

  buildYear: `${new Date().getFullYear()}`,
};
