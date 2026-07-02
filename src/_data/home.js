/**
 * Homepage content model (single source for the Chemid-style landing page).
 * Consumed only by src/index.njk. Copy is adapted from the Chemid demo theme
 * to Stabplast's PVC product line — edit freely.
 *
 * heroSlides: full-screen background slider (image + scrim + headline + 2 CTAs).
 * Slide 1 is the LCP image (loaded eager); the rest lazy-load.
 */
export const heroSlides = [
  {
    img: "src/assets/images/hero/hero-2-plant.jpg",
    alt: "Stainless-steel chemical processing plant with pumps and reactor vessels",
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
 * "Explore Our Expertise" — capability areas (what we do well), styled like the
 * demo's sector tiles. Kept distinct from Applications (end-uses) to avoid overlap.
 */
export const expertise = [
  {
    title: "In-house Manufacturing",
    text: "Stabilizers, metallic stearates and lead compounds produced under one roof for consistent supply.",
    icon: "factory",
  },
  {
    title: "Custom Formulation",
    text: "One-pack, single-stage and calcium-zinc systems developed to match your process and specification.",
    icon: "flask",
  },
  {
    title: "Quality Control",
    text: "Batches checked for thermal stability and consistency before dispatch.",
    icon: "shield",
  },
  {
    title: "Technical Support",
    text: "Grade selection guidance for pipes, profiles, cables, masterbatch and plastics.",
    icon: "support",
  },
  {
    title: "Export & Logistics",
    text: "Documentation and packaging suited to domestic and export shipments.",
    icon: "globe",
  },
];

/**
 * "Striving for Sustainability" — qualitative claims only. All values below are
 * true/derivable facts; do NOT add unverified environmental metrics here.
 */
export const sustainability = {
  intro:
    "We continue to expand our calcium-zinc and lead-free stabilizer range, helping customers meet evolving environmental and regulatory requirements without compromising PVC performance.",
  stats: [
    { value: "1988", label: "Established" },
    { value: "35+", label: "Years of expertise" },
    { value: "Ca–Zn", label: "Lead-free systems" },
    { value: "9", label: "Stabilizer grades" },
  ],
};

export default { heroSlides, expertise, sustainability };
