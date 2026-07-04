/**
 * PRODUCT CATALOG — typed data model (single source of truth for product pages).
 *
 * Consumed by:
 *   - /products/ index and /products/{categorySlug}/ category pages
 *   - /products/{slug}/ detail pages (via pagination) + Product JSON-LD
 *   - contact form "Product of interest" select
 *
 * Taxonomy = the Stabplast "Product Range" (8 system categories). Three
 * categories (Calcium Organic, Lubricants & Processing Aids, Impact Modifiers)
 * are `descOnly` — shown as a category page with description + enquiry CTA until
 * specific grades are supplied.
 *
 * ⚠️  Product technical copy is DRAFT (`verified:false`, "[verify]" markers).
 *     Do NOT publish specification numbers until the company confirms them.
 *     (Application-level figures in applications.js ARE company-approved.)
 *
 * Product shape:
 *   { slug, name, shortName, category, categorySlug, image, alt,
 *     summary, description, keyProperties[], applications[], packaging,
 *     forms[], featured, verified }
 */

export const categories = [
  {
    slug: "lead-based-stabilizers",
    name: "Lead Based Stabilizers",
    summary:
      "Proven, economical lead-based heat stabilizer systems delivering excellent long-term thermal stability and electrical properties for pipes, profiles, cables and foam boards.",
    image: "src/assets/images/products/lead-based-complex-stabilizer.jpg",
  },
  {
    slug: "calcium-zinc-stabilizers",
    name: "Calcium-Zinc (Ca-Zn) Stabilizers",
    summary:
      "Lead-free, non-toxic calcium-zinc stabilizer systems for applications with stringent safety and environmental requirements — potable water, food-contact and consumer PVC.",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
  },
  {
    slug: "calcium-organic-stabilizers",
    name: "Calcium Organic Stabilizers",
    summary:
      "Next-generation calcium-organic (OBS-type) heavy-metal-free stabilizers for high-transparency and high-performance PVC. Grades developed to customer requirements.",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
    descOnly: true,
  },
  {
    slug: "individual-stabilizers",
    name: "Individual Stabilizers",
    summary:
      "Single-compound lead stabilizers and co-stabilizers — tribasic lead sulphate (TBLS), dibasic lead phosphite (DBLP) and single-stage systems — for custom in-house formulation.",
    image: "src/assets/images/products/tribasic-lead-sulphate.jpg",
  },
  {
    slug: "lubricants-processing-aids",
    name: "Lubricants & Processing Aids",
    summary:
      "Internal and external lubricants and acrylic processing aids that fine-tune flow, fusion and surface finish across PVC extrusion and moulding. Grades to suit your line.",
    image: "src/assets/images/products/lead-stearate.jpg",
  },
  {
    slug: "metallic-stearates",
    name: "Metallic Stearates",
    summary:
      "Multi-functional metallic soaps — calcium, lead and dibasic lead stearate — used as lubricants, acid scavengers and co-stabilizers across PVC, rubber, paints and plastics.",
    image: "src/assets/images/products/calcium-stearate.jpg",
  },
  {
    slug: "impact-modifiers",
    name: "Impact Modifiers",
    summary:
      "Impact-modifier additives that raise toughness and durability in rigid PVC profiles, pipes and boards without compromising processing. Grades developed to customer requirements.",
    image: "src/assets/images/hero/hero-3-granules.jpg",
    descOnly: true,
  },
  {
    slug: "one-pack-systems",
    name: "One-Pack PVC Additive Systems",
    summary:
      "All-in-one stabilizer-lubricant packages that combine heat stabilizer, lubricants and co-stabilizers in a single addition for consistent, error-free compounding.",
    image: "src/assets/images/products/one-pack-stabilizer.jpg",
  },
];

export const items = [
  // ---------------- ONE-PACK PVC ADDITIVE SYSTEMS ----------------
  {
    slug: "one-pack-stabilizer",
    name: "One-Pack Stabilizer",
    shortName: "One-Pack",
    category: "One-Pack PVC Additive Systems",
    categorySlug: "one-pack-systems",
    image: "src/assets/images/products/one-pack-stabilizer.jpg",
    alt: "One-pack PVC stabilizer for pipe and profile extrusion",
    summary:
      "All-in-one stabilizer-lubricant system that simplifies dosing and delivers consistent thermal stability in a single addition.",
    description:
      "Our one-pack stabilizers combine heat stabilizer, internal and external lubricants and co-stabilizers in a single, ready-to-use powder. Designed to streamline the compounding process, they reduce weighing errors and ensure batch-to-batch consistency for rigid and flexible PVC applications.",
    keyProperties: [
      "Single-addition convenience [verify]",
      "Excellent long-term heat stability [verify]",
      "Balanced internal/external lubrication [verify]",
      "Consistent colour hold [verify]",
    ],
    applications: ["Pipes", "Profiles", "PVC fittings"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },

  // ---------------- CALCIUM-ZINC (Ca-Zn) STABILIZERS ----------------
  {
    slug: "calcium-zinc-stabilizer",
    name: "Calcium-Zinc Stabilizer",
    shortName: "Ca-Zn",
    category: "Calcium-Zinc (Ca-Zn) Stabilizers",
    categorySlug: "calcium-zinc-stabilizers",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
    alt: "Calcium-zinc (Ca-Zn) non-toxic PVC stabilizer",
    summary:
      "Non-toxic, heavy-metal-free stabilizer system suited to applications with stringent safety and environmental requirements.",
    description:
      "Calcium-zinc stabilizers offer a lead-free alternative for PVC applications where low toxicity is essential, including potable water pipes, food-contact and consumer products. They deliver reliable heat stability while meeting modern regulatory expectations.",
    keyProperties: [
      "Lead-free / non-toxic [verify]",
      "Suitable for potable-water and food-contact PVC [verify]",
      "Good initial colour and clarity [verify]",
      "Eco-friendly profile [verify]",
    ],
    applications: ["Potable water pipes", "Foam boards", "Consumer products"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },

  // ---------------- LEAD BASED STABILIZERS ----------------
  {
    slug: "lead-based-complex-stabilizer",
    name: "Lead-Based Complex Stabilizer",
    shortName: "Lead Complex",
    category: "Lead Based Stabilizers",
    categorySlug: "lead-based-stabilizers",
    image: "src/assets/images/products/lead-based-complex-stabilizer.jpg",
    alt: "Lead-based complex PVC stabilizer",
    summary:
      "High-performance lead-based complex stabilizer for cost-effective, high-output rigid and flexible PVC processing.",
    description:
      "Lead-based complex stabilizers remain a proven, economical choice for many industrial PVC applications, offering excellent long-term heat stability and electrical properties. Commonly specified for pipes, cables, foam boards and profiles where permitted.",
    keyProperties: [
      "Excellent long-term heat stability [verify]",
      "Good electrical insulation properties [verify]",
      "Cost-effective for high output [verify]",
    ],
    applications: ["Pipes", "Wires & cables", "Foam boards"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },
  {
    slug: "single-stage-stabilizer",
    name: "Single-Stage Stabilizer",
    shortName: "Single-Stage",
    category: "Lead Based Stabilizers",
    categorySlug: "lead-based-stabilizers",
    image: "src/assets/images/products/single-stage-stabilizer.jpg",
    alt: "Single-stage PVC stabilizer powder",
    summary:
      "Simplified stabilizer package engineered for single-stage mixing processes and predictable throughput.",
    description:
      "Single-stage stabilizers are formulated for processors who require a straightforward, robust stabilizer system without complex multi-component dosing. They provide dependable processing stability across a range of rigid PVC products.",
    keyProperties: [
      "Optimised for single-stage mixing [verify]",
      "Good thermal stability [verify]",
      "Easy dispersion [verify]",
    ],
    applications: ["Pipes", "Rigid PVC products"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },

  // ---------------- INDIVIDUAL STABILIZERS ----------------
  {
    slug: "dibasic-lead-phosphite",
    name: "Dibasic Lead Phosphite (DBLP)",
    shortName: "DBLP",
    category: "Individual Stabilizers",
    categorySlug: "individual-stabilizers",
    image: "src/assets/images/products/dibasic-lead-phosphite.jpg",
    alt: "Dibasic lead phosphite (DBLP) heat and light stabilizer",
    summary:
      "Heat and light stabilizer with strong weathering resistance for outdoor and long-life PVC products.",
    description:
      "Dibasic lead phosphite (DBLP) is a co-stabilizer prized for its light stability and weathering resistance, making it well suited to outdoor PVC applications such as profiles and sheets exposed to sunlight.",
    keyProperties: [
      "Excellent light / weathering stability [verify]",
      "Long-term heat stability [verify]",
      "Antioxidant character [verify]",
    ],
    applications: ["Profiles", "PVC sheets", "Roofing sheets"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },
  {
    slug: "tribasic-lead-sulphate",
    name: "Tribasic Lead Sulphate (TBLS)",
    shortName: "TBLS",
    category: "Individual Stabilizers",
    categorySlug: "individual-stabilizers",
    image: "src/assets/images/products/tribasic-lead-sulphate.jpg",
    alt: "Tribasic lead sulphate (TBLS) primary heat stabilizer",
    summary:
      "Primary heat stabilizer delivering outstanding long-term thermal stability and electrical insulation for PVC.",
    description:
      "Tribasic lead sulphate (TBLS) is a workhorse primary heat stabilizer offering excellent long-term thermal stability and dielectric properties. It is widely used in wire and cable insulation and rigid PVC where high heat stability is required.",
    keyProperties: [
      "Outstanding long-term heat stability [verify]",
      "Excellent electrical insulation [verify]",
      "High efficiency primary stabilizer [verify]",
    ],
    applications: ["Wires & cables", "Pipes", "Rigid profiles"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },

  // ---------------- METALLIC STEARATES ----------------
  {
    slug: "calcium-stearate",
    name: "Calcium Stearate",
    shortName: "Ca Stearate",
    category: "Metallic Stearates",
    categorySlug: "metallic-stearates",
    image: "src/assets/images/products/calcium-stearate.jpg",
    alt: "Calcium stearate fine white powder",
    summary:
      "Versatile lubricant, acid scavenger and co-stabilizer used across PVC, plastics, rubber, paints and construction.",
    description:
      "Calcium stearate is a fine white powder valued as a costabilizer and lubricant in PVC, an anti-caking and release agent in plastics, and a processing aid in numerous industries. It improves flow and surface finish while scavenging trace acids.",
    keyProperties: [
      "Effective co-stabilizer and lubricant [verify]",
      "Acid scavenging [verify]",
      "Low free-fatty-acid grade available [verify]",
      "Fine, free-flowing powder [verify]",
    ],
    applications: ["PVC processing", "Masterbatch", "Paints", "Construction chemicals"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },
  {
    slug: "lead-stearate",
    name: "Lead Stearate",
    shortName: "Pb Stearate",
    category: "Metallic Stearates",
    categorySlug: "metallic-stearates",
    image: "src/assets/images/products/lead-stearate.jpg",
    alt: "Lead stearate lubricant and co-stabilizer",
    summary:
      "Lubricating co-stabilizer that boosts heat stability and processing performance in lead-stabilized PVC systems.",
    description:
      "Lead stearate acts as both a lubricant and a co-stabilizer in PVC, enhancing thermal stability and improving flow during extrusion and moulding. Frequently paired with tribasic and dibasic lead stabilizers.",
    keyProperties: [
      "Lubricating co-stabilizer [verify]",
      "Improves heat stability [verify]",
      "Good dispersion [verify]",
    ],
    applications: ["Wires & cables", "Pipes", "Footwear"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },
  {
    slug: "dibasic-lead-stearate",
    name: "Dibasic Lead Stearate (DBLS)",
    shortName: "DBLS",
    category: "Metallic Stearates",
    categorySlug: "metallic-stearates",
    image: "src/assets/images/products/dibasic-lead-stearate.jpg",
    alt: "Dibasic lead stearate (DBLS) co-stabilizer",
    summary:
      "Co-stabilizer and lubricant combining heat stability with strong lubricating performance for rigid PVC.",
    description:
      "Dibasic lead stearate (DBLS) provides a balance of costabilization and lubrication, supporting long-term heat stability and smooth processing in rigid PVC compounds, particularly for cables and profiles.",
    keyProperties: [
      "Dual co-stabilizer / lubricant action [verify]",
      "Strong long-term heat stability [verify]",
      "Good electrical properties [verify]",
    ],
    applications: ["Wires & cables", "Rigid profiles", "Pipes"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },

  // ---------------- LUBRICANTS & PROCESSING AIDS ----------------
  {
    slug: "pvc-lubricant",
    name: "PVC Lubricant",
    shortName: "PVC Lubricant",
    category: "Lubricants & Processing Aids",
    categorySlug: "lubricants-processing-aids",
    // [verify] placeholder image — replace with a real PVC lubricant photo
    image: "src/assets/images/products/lead-stearate.jpg",
    alt: "PVC lubricant for extrusion and moulding",
    summary:
      "Internal and external lubricant systems that control fusion, flow and metal release for smooth, high-output PVC processing.",
    description:
      "Our PVC lubricants balance internal and external lubrication to fine-tune gelation, reduce plate-out and improve surface finish across pipe, profile and fittings production. Supplied as stand-alone grades or built into one-pack systems.",
    keyProperties: [
      "Balanced internal / external lubrication [verify]",
      "Controls fusion and flow [verify]",
      "Reduces plate-out and improves surface finish [verify]",
    ],
    applications: ["Pipes", "Profiles", "PVC fittings"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },
];

export default { categories, items };
