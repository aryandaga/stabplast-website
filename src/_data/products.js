/**
 * PRODUCT CATALOG — typed data model (single source of truth for product pages).
 *
 * Consumed by:
 *   - /products/ index and category pages (M3)
 *   - /products/{slug}/ detail pages generated via 11ty pagination (M4)
 *   - Product JSON-LD in the product layout
 *
 * ⚠️  All technical copy is DRAFT, reverse-engineered from the supplied product
 *     images. Every product has `verified: false`. Do NOT publish specification
 *     numbers until the company confirms them. `keyProperties` values marked with
 *     "[verify]" are illustrative placeholders, not measured data.
 *
 * Product shape:
 *   { slug, name, shortName, category, categorySlug, image, alt,
 *     summary, description, keyProperties[], applications[], packaging,
 *     forms[], featured, verified }
 */

export const categories = [
  {
    slug: "pvc-stabilizers",
    name: "PVC Stabilizers",
    summary:
      "Heat stabilizer systems that protect PVC from thermal degradation during processing — available as one-pack, single-stage, calcium-zinc and lead-based complex grades.",
    image: "src/assets/images/products/one-pack-stabilizer.jpg",
  },
  {
    slug: "metallic-stearates",
    name: "Metallic Stearates",
    summary:
      "Multi-functional metallic soaps used as lubricants, acid scavengers and co-stabilizers across PVC, rubber and plastics processing.",
    image: "src/assets/images/products/calcium-stearate.jpg",
  },
  {
    slug: "lead-compounds",
    name: "Lead Compounds",
    summary:
      "Lead-based heat stabilizers and co-stabilizers for demanding PVC applications such as pipes, cables and rigid profiles.",
    image: "src/assets/images/products/dibasic-lead-phosphite.jpg",
  },
];

export const items = [
  // ---------------- PVC STABILIZERS ----------------
  {
    slug: "one-pack-stabilizer",
    name: "One-Pack Stabilizer",
    shortName: "One-Pack",
    category: "PVC Stabilizers",
    categorySlug: "pvc-stabilizers",
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
    applications: ["PVC pipes", "UPVC profiles", "Fittings"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },
  {
    slug: "single-stage-stabilizer",
    name: "Single-Stage Stabilizer",
    shortName: "Single-Stage",
    category: "PVC Stabilizers",
    categorySlug: "pvc-stabilizers",
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
    applications: ["PVC pipes", "Rigid PVC products"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },
  {
    slug: "calcium-zinc-stabilizer",
    name: "Calcium-Zinc Stabilizer",
    shortName: "Ca-Zn",
    category: "PVC Stabilizers",
    categorySlug: "pvc-stabilizers",
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
    applications: ["Potable water pipes", "Food-contact PVC", "Consumer products"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },
  {
    slug: "lead-based-complex-stabilizer",
    name: "Lead-Based Complex Stabilizer",
    shortName: "Lead Complex",
    category: "PVC Stabilizers",
    categorySlug: "pvc-stabilizers",
    image: "src/assets/images/products/lead-based-complex-stabilizer.jpg",
    alt: "Lead-based complex PVC stabilizer",
    summary:
      "High-performance lead-based complex stabilizer for cost-effective, high-output rigid and flexible PVC processing.",
    description:
      "Lead-based complex stabilizers remain a proven, economical choice for many industrial PVC applications, offering excellent long-term heat stability and electrical properties. Commonly specified for pipes, cables and profiles where permitted.",
    keyProperties: [
      "Excellent long-term heat stability [verify]",
      "Good electrical insulation properties [verify]",
      "Cost-effective for high output [verify]",
    ],
    applications: ["PVC pipes", "Wires & cables", "Rigid profiles"],
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
      "Versatile lubricant, acid scavenger and co-stabilizer used across PVC, plastics, rubber, pharmaceuticals and construction.",
    description:
      "Calcium stearate is a fine white powder valued as a costabilizer and lubricant in PVC, an anti-caking and release agent in plastics, and a processing aid in numerous industries. It improves flow and surface finish while scavenging trace acids.",
    keyProperties: [
      "Effective co-stabilizer and lubricant [verify]",
      "Acid scavenging [verify]",
      "Low free-fatty-acid grade available [verify]",
      "Fine, free-flowing powder [verify]",
    ],
    applications: ["PVC processing", "Masterbatch", "Rubber", "Construction chemicals"],
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
    applications: ["Wires & cables", "PVC pipes", "Rigid PVC"],
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
    applications: ["Wires & cables", "Rigid profiles", "PVC pipes"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },

  // ---------------- LEAD COMPOUNDS ----------------
  {
    slug: "dibasic-lead-phosphite",
    name: "Dibasic Lead Phosphite (DBLP)",
    shortName: "DBLP",
    category: "Lead Compounds",
    categorySlug: "lead-compounds",
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
    applications: ["UPVC profiles", "PVC sheets", "Outdoor PVC"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: true,
    verified: false,
  },
  {
    slug: "tribasic-lead-sulphate",
    name: "Tribasic Lead Sulphate (TBLS)",
    shortName: "TBLS",
    category: "Lead Compounds",
    categorySlug: "lead-compounds",
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
    applications: ["Wires & cables", "PVC pipes", "Rigid profiles"],
    packaging: "25 kg bags [verify]",
    forms: ["Powder"],
    featured: false,
    verified: false,
  },
];

export default { categories, items };
