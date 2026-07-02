/**
 * Global site configuration & company data.
 * SINGLE SOURCE OF TRUTH for company facts, contact details, SEO defaults.
 *
 * ⚠️  Fields marked  [VERIFY]  are placeholders — replace with real company
 *     data before launch. Nothing here should be treated as fact until confirmed.
 *
 * Confirmed 2026-07 from the company's own site (stabplast.com) and its
 * IndiaMART profile (indiamart.com/stabplastchemo): founded 1988, Nagpur
 * (Maharashtra), manufacturer & exporter, phone +91 98231 66664,
 * sales@stabplastchemo.com. Street address & PIN still unverified.
 */
export default {
  // ---- Identity ----
  name: "Stabplast Chemo Industries",
  legalName: "Stabplast Chemo Industries Pvt Ltd",
  tagline: "Innovative Chemical Solutions for PVC",
  description:
    "Stabplast Chemo Industries manufactures and exports high-performance PVC stabilizers, metallic stearates and lead compounds for pipes, profiles, cables and plastics. Established 1988, Nagpur, India.",

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
    whatsapp: "+91 98231 66664", // [VERIFY] confirm this mobile is on WhatsApp
    whatsappHref: "https://wa.me/919823166664",
    email: "sales@stabplastchemo.com",
    emailHref: "mailto:sales@stabplastchemo.com",
    salesEmail: "sales@stabplastchemo.com",
    address: {
      street: "[VERIFY] street / building (directory lists 301 Swami Samarth Complex, North Bazaar Rd, Dharampeth)",
      locality: "Nagpur",
      region: "Maharashtra",
      postalCode: "[VERIFY] 440010",
      country: "India",
      countryCode: "IN",
    },
    // [VERIFY] Google Maps embed URL or lat/lng
    mapEmbed: "",
    hours: "Mon–Sat, 9:30–18:30 IST",
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
