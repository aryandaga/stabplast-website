/**
 * APPLICATIONS — end-uses served by the Stabplast range.
 *
 * Consumed by:
 *   - /applications/ index page
 *   - /applications/{slug}/ detail pages (via appDetails.js → application.njk) for apps with `detail: true`
 *   - homepage applications strip
 *   - product cross-links (relatedProducts by slug)
 *
 * Technical figures below (VST, temperature grades, L* whiteness, SRT) are
 * company-supplied and approved for publication (not draft placeholders).
 * Pipe variants (PVC/CPVC/OPVC/MPVC) are consolidated under "Pipes" and
 * uPVC/PVC profiles under "Profiles" per the brand owner's instruction.
 */
export default [
  {
    slug: "pipes",
    name: "Pipes",
    image: "src/assets/images/applications/pvc-pipes.jpg",
    alt: "PVC pipes manufactured with Stabplast heat stabilizers",
    summary:
      "Stabilizer systems for the full range of PVC piping — pressure, plumbing, drainage, agriculture and conduit — including CPVC, OPVC and MPVC.",
    detail: true,
    intro:
      "Stabilizer systems suitable for a wide range of pipe applications, including CPVC, OPVC and MPVC variants.",
    systems: ["Lead Based", "Calcium-Zinc One Pack"],
    subApplications: [
      "SWR Pipes", "Drain Pipes", "Column Pipes", "Conduit Pipes",
      "Casing & Duct Pipes", "Agricultural Pipes", "Plumbing Pipes",
      "Garden Hose Pipes", "Suction Pipes", "CPVC Pipes", "OPVC Pipes", "MPVC Pipes",
    ],
    benefits: [
      "Non-lubricated stabilizer systems available where required",
      "Consistent output at high extrusion speeds",
      "Wide processing window",
    ],
    relatedProducts: ["one-pack-stabilizer", "tribasic-lead-sulphate", "calcium-zinc-stabilizer"],
  },
  {
    slug: "profiles",
    name: "Profiles",
    image: "src/assets/images/applications/upvc-profiles.jpg",
    alt: "Coloured uPVC window and door profiles",
    summary:
      "Specially formulated stabilizers for uPVC and PVC profiles with outstanding whiteness, surface finish and weathering.",
    detail: true,
    intro: "Specially formulated stabilizers for uPVC and PVC profiles.",
    features: [
      "Can achieve L* values up to approximately 100 (target whiteness)",
      "Excellent surface finish",
      "No line vibration",
      "Excellent impact performance",
      "Outstanding weathering properties",
    ],
    systems: ["Lead Based", "Calcium-Zinc Based"],
    benefits: [
      "Wide processing window",
      "Consistent colour throughout production",
      "Reduced line marks on profiles",
    ],
    performance: [
      "Conventional profiles: excellent surface quality with no pinholes or surface defects",
      "Complex profiles: suitable for complex dies and narrow processing windows",
    ],
    relatedProducts: ["dibasic-lead-phosphite", "one-pack-stabilizer", "calcium-zinc-stabilizer"],
  },
  {
    slug: "pvc-fittings",
    name: "PVC Fittings",
    image: "src/assets/images/applications/pvc-fittings.jpg",
    alt: "PVC pressure fittings and valves",
    summary:
      "Specially developed stabilizer systems for pressure fittings, engineered for optimum VST and SRT performance.",
    detail: true,
    intro: "Specially developed stabilizer systems for pressure fittings.",
    systems: ["Lead Pack", "Calcium-Zinc One Pack", "Lead Based Systems"],
    performance: ["VST: 80°C", "SRT passed for different moulds"],
    benefits: [
      "Wide processing window",
      "Suitable for multi-cavity moulds",
      "Custom formulations as per customer requirements",
      "Specially designed lubrication package for optimum VST & SRT performance",
      "No silver streaks",
      "No butterfly marks",
      "No dry marks",
      "Lower cycle time",
    ],
    relatedProducts: ["lead-based-complex-stabilizer", "calcium-zinc-stabilizer", "one-pack-stabilizer"],
  },
  {
    slug: "foam-boards",
    name: "Foam Boards",
    image: "src/assets/images/applications/foam-boards.jpg",
    alt: "White PVC foam board",
    summary:
      "Designed for premium PVC foam board manufacturing with excellent whiteness and thickness control.",
    detail: true,
    intro: "Designed for premium PVC foam board manufacturing.",
    features: [
      "Excellent whiteness",
      "Superior white colour development",
      "High stability",
      "Ease of processing",
      "Suitable for premium window and furniture applications",
      "Proven formulation technology",
    ],
    systems: ["Lead Based", "Calcium-Zinc Based"],
    benefits: [
      "Excellent thickness control",
      "Can achieve required Lab values",
      "Superior surface finish",
    ],
    relatedProducts: ["lead-based-complex-stabilizer", "calcium-zinc-stabilizer"],
  },
  {
    slug: "wires-cables",
    name: "Wires & Cables",
    image: "src/assets/images/applications/wires-cables.jpg",
    alt: "PVC insulated wires and cables",
    summary:
      "Stabilizers for insulation and sheathing compounds across temperature grades from 70°C to 125°C.",
    detail: true,
    intro: "Suitable for insulation and sheathing compounds.",
    performance: ["125°C", "105°C", "90°C (Dry & Wet)", "70°C (Insulation & Sheathing)"],
    features: [
      "Excellent wet electrical insulation properties",
      "Superior surface finish",
      "Excellent colour retention",
      "Outstanding weathering resistance",
      "Transparent grades available",
    ],
    relatedProducts: ["tribasic-lead-sulphate", "dibasic-lead-stearate", "lead-stearate"],
  },
  {
    slug: "pvc-sheets",
    name: "PVC Sheets",
    image: "src/assets/images/applications/plastic-products.jpg",
    alt: "Rigid and flexible PVC sheets",
    summary:
      "Stabilizer and lubricant systems for rigid and flexible PVC sheet extrusion with clean surface finish.",
    detail: false,
    relatedProducts: ["one-pack-stabilizer", "dibasic-lead-phosphite"],
  },
  {
    slug: "wpc-boards",
    name: "WPC Boards",
    image: "src/assets/images/applications/wpc-boards.jpg",
    alt: "Wood-plastic composite boards",
    summary:
      "Additive systems for wood-plastic composite boards, balancing processing stability and surface quality.",
    detail: false,
    relatedProducts: ["calcium-zinc-stabilizer", "calcium-stearate"],
  },
  {
    slug: "roofing-sheets",
    name: "Roofing Sheets",
    image: "src/assets/images/applications/roofing-sheets.jpg",
    alt: "Corrugated roofing sheets",
    summary:
      "Weather-resistant stabilization for PVC roofing sheets exposed to sunlight and the elements.",
    detail: false,
    relatedProducts: ["dibasic-lead-phosphite", "calcium-zinc-stabilizer"],
  },
  {
    slug: "edge-banding",
    name: "Edge Banding",
    image: "src/assets/images/applications/edge-banding.jpg",
    alt: "PVC edge banding for furniture panels",
    summary:
      "Stabilizers for PVC edge banding with consistent colour and a smooth, durable finish.",
    detail: false,
    relatedProducts: ["calcium-zinc-stabilizer", "one-pack-stabilizer"],
  },
  {
    slug: "masterbatch",
    name: "Masterbatch",
    image: "src/assets/images/applications/masterbatch.jpg",
    alt: "Plastic masterbatch pellets",
    summary:
      "Metallic stearates acting as dispersion aids, lubricants and processing aids in masterbatch production.",
    detail: false,
    relatedProducts: ["calcium-stearate"],
  },
  {
    slug: "footwear",
    name: "Footwear",
    image: "src/assets/images/applications/footwear.jpg",
    alt: "PVC footwear and soles",
    summary:
      "Stabilizer and lubricant packages for flexible PVC footwear and soles.",
    detail: false,
    relatedProducts: ["calcium-zinc-stabilizer", "lead-stearate"],
  },
  {
    slug: "paints",
    name: "Paints",
    image: "src/assets/images/applications/paints.jpg",
    alt: "Industrial paint cans",
    summary:
      "Metallic stearates used as matting, anti-settling and flow additives in paints and coatings.",
    detail: false,
    relatedProducts: ["calcium-stearate"],
  },
];
