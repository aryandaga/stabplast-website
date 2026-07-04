/**
 * Homepage content model (single source for the Chemid-style landing page).
 * Consumed only by src/index.njk.
 *
 * heroSlides: full-screen background slider (image + scrim + headline + 2 CTAs).
 * Slide 1 is the LCP image (loaded eager); the rest lazy-load.
 */
export const heroSlides = [
  {
    img: "src/assets/images/hero/hero-lab.jpg",
    alt: "Chemist testing a PVC additive sample in the Stabplast laboratory",
    eyebrow: "PVC Stabilizers · Since 1988",
    title: "Precision & Consistency You Can Trust",
    text: "One-pack, calcium-zinc and lead-based PVC stabilizers, manufactured in India since 1988.",
    ctas: [
      { label: "View Our Products", href: "/products/", class: "btn--accent" },
      { label: "Contact Our Experts", href: "/contact/", class: "btn--ghost btn--on-dark" },
    ],
  },
  {
    // Product-range infographic (light artwork) — rendered with the
    // `light: true` treatment: dark text + white wash scrim (hero-slide--light).
    img: "src/assets/images/hero/hero-5-range.png",
    alt: "Stabplast product range: calcium-zinc and Ca-organic stabilizers, lead-based and CPVC one-pack stabilizers, individual PVC stabilizers, metallic stearates and speciality lubricants",
    light: true,
    eyebrow: "Our Product Range",
    title: "One Range, Every PVC Need",
    text: "Calcium-zinc, lead-based and CPVC one-packs, individual stabilizers, metallic stearates and speciality lubricants.",
    ctas: [
      { label: "View Our Products", href: "/products/", class: "btn--accent" },
      { label: "Request a Quote", href: "/contact/", class: "btn--ghost" },
    ],
  },
  {
    img: "src/assets/images/hero/hero-3-granules.jpg",
    alt: "Close-up of blue PVC polymer granules",
    eyebrow: "Tailored Chemistry",
    title: "Additives Tailored to Your Process",
    text: "Stabilizer and stearate grades matched to your formulation, throughput and end-use.",
    ctas: [
      { label: "Explore Solutions", href: "/products/", class: "btn--accent" },
      { label: "Request a Quote", href: "/contact/", class: "btn--ghost btn--on-dark" },
    ],
  },
  {
    img: "src/assets/images/hero/hero-1-pipes.jpg",
    alt: "Stacks of industrial pipes ready for dispatch",
    eyebrow: "Proven Performance",
    title: "Proven PVC Stabilizer Chemistry",
    text: "35+ years supplying pipe, profile, cable and plastics manufacturers across India and for export.",
    ctas: [
      { label: "See Applications", href: "/applications/", class: "btn--accent" },
      { label: "Talk to Us", href: "/contact/", class: "btn--ghost btn--on-dark" },
    ],
  },
  {
    img: "src/assets/images/hero/hero-4-pipes.jpg",
    alt: "Network of white PVC pipes against a dark background",
    eyebrow: "Reliable Supply",
    title: "Dependable, Cleaner Formulations",
    text: "Calcium-zinc systems and metallic stearates engineered for modern PVC processing.",
    ctas: [
      { label: "Learn More", href: "/about/", class: "btn--accent" },
      { label: "Request a Quote", href: "/contact/", class: "btn--ghost btn--on-dark" },
    ],
  },
];

/**
 * Company stats band (shown directly under the hero). Items with `count` animate
 * 0→count on scroll; items with `text` render as static labels.
 * Figures are brand-owner supplied and approved for publication.
 */
export const stats = [
  { count: 35, suffix: "+", label: "Years" },
  { count: 20, suffix: "+", label: "Countries" },
  { count: 500, suffix: "+", label: "Formulations" },
  { text: "ISO 9001", label: "Certified" },
  { text: "1988", label: "Established" },
  { count: 24000, suffix: "", label: "MT Annual Capacity" },
];

/**
 * "Technical Services" — 4 capability cards (image-backed tiles, dark overlay).
 * Images reuse existing repo assets.
 */
export const services = [
  {
    title: "Formulation Optimisation",
    text: "Fine-tuning your stabiliser and lubricant package for stability, output and surface finish.",
    image: "src/assets/images/hero/hero-lab.jpg",
  },
  {
    title: "Custom Cost Reduction",
    text: "Re-engineering formulations to cut cost per kg without compromising performance.",
    image: "src/assets/images/hero/hero-3-granules.jpg",
  },
  {
    title: "Lead → Calcium-Zinc Migration",
    text: "Helping you switch from lead to non-toxic Ca-Zn systems smoothly and safely.",
    image: "src/assets/images/hero/hero-2-plant.jpg",
  },
  {
    title: "We Love Your Problems",
    text: "Custom problem-solving for your process — bring us your toughest PVC challenge.",
    image: "src/assets/images/hero/hero-1-pipes.jpg",
  },
];

export default { heroSlides, stats, services };
