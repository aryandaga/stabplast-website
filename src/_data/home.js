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
    img: "src/assets/images/hero/hero-cables.jpg",
    alt: "Bundles of colourful PVC-insulated wires and cables",
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
  { count: 35, suffix: "+", label: "Years", icon: "clock" },
  { count: 20, suffix: "+", label: "Countries", icon: "globe" },
  { count: 500, suffix: "+", label: "Formulations", icon: "flask" },
  { count: 24000, suffix: "", label: "MT Annual Capacity", icon: "factory" },
  { text: "1988", label: "Established", icon: "calendar" },
  { text: "ISO 9001", label: "Certified", icon: "award" },
];

/**
 * "Technical Services" — 4 capability cards (image-backed tiles, dark overlay).
 * `slug` doubles as the tile's anchor id (#service-{slug}) for the nav dropdown.
 */
export const services = [
  {
    slug: "formulation-optimisation",
    title: "Formulation Optimisation",
    text: "Fine-tuning your stabiliser and lubricant package for stability, output and surface finish.",
    image: "src/assets/images/services/formulation-lab.jpg",
  },
  {
    slug: "cost-reduction",
    title: "Custom Cost Reduction",
    text: "Re-engineering formulations to cut cost per kg without compromising performance.",
    image: "src/assets/images/services/cost-optimisation.jpg",
  },
  {
    slug: "lead-free-migration",
    title: "Lead → Calcium-Zinc Migration",
    text: "Helping you switch from lead to non-toxic Ca-Zn systems smoothly and safely.",
    image: "src/assets/images/services/lead-free-migration.jpg",
  },
  {
    slug: "technical-support",
    title: "We Love Your Problems",
    text: "Custom problem-solving for your process — bring us your toughest PVC challenge.",
    image: "src/assets/images/services/technical-support.jpg",
  },
];

export default { heroSlides, stats, services };
