/**
 * PRODUCT CATALOG — typed data model (single source of truth for product pages).
 *
 * Consumed by:
 *   - /products/ index and /products/{categorySlug}/ category pages
 *   - /products/{slug}/ detail pages (via pagination) + Product JSON-LD
 *   - homepage "Our Product Range" (8 category tiles)
 *   - contact form "Product of interest" select (uses shortName)
 *   - nav.js Products dropdown (derived from `categories`)
 *
 * Taxonomy = the brand owner's 8-category Product Range table (2026-07-06).
 * ONE page per sub-product row — grades of the same product (e.g. SCI-240-SP +
 * SCI-275-SLF one-packs; SCI-720-CZ + SCI-729-AG CaZn pipe) share a page via
 * multiple spec tables, NOT separate pages.
 *
 * DATA PROVENANCE — each item carries `dataStatus`:
 *   'full'      → real lab specs transcribed from the product's TDS PDF(s)
 *   'msds'      → identity/partial specs from the safety data sheet only
 *   'described' → owner's description written up; NO spec table until TDS arrives
 * Spec figures are published ONLY from company data sheets — never invented.
 *
 * Item shape:
 *   { slug, name, shortName, productCode?, category, categorySlug, dataStatus,
 *     image, alt, summary, description, keyProperties[]?,
 *     specTables: [{ title?, note?, rows: [{label, value}] }]?,
 *     downloads:  [{ label, file }]?,          // PDFs in /assets/docs/
 *     applications[]?, forms[]?, packaging?, featured? }
 *
 * Category shape:
 *   { slug, name, summary, image, crossLinks?: [itemSlug] }
 *   `crossLinks` = products canonically listed in ANOTHER category but shown
 *   as a linked card here too (e.g. Lead Stearate lives in Individual Heat
 *   Stabilizers, cross-linked from Metallic Stearates — listed once).
 *
 * IMAGES: several items reuse stand-in photos until real product photography
 * is supplied. The image shortcode throws if a file is missing.
 */

export const categories = [
  {
    slug: "lead-based-stabilizers",
    name: "Lead Based Stabilizers",
    summary:
      "Complete lead-based heat stabilizer systems — one-pack, lead-organic, non-lubricated and fitting grades — delivering proven long-term thermal stability across pipes, fittings and profiles.",
    image: "src/assets/images/products/lead-based-complex-stabilizer.jpg",
  },
  {
    slug: "calcium-zinc-stabilizers",
    name: "Calcium-Zinc (Ca-Zn) Stabilizers",
    summary:
      "Lead-free, non-toxic calcium-zinc one-pack stabilizers replacing every lead grade — pipe, fitting, profile and cable — with performance comparable to lead systems.",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
  },
  {
    slug: "calcium-organic-stabilizers",
    name: "Calcium-Organic Stabilizers",
    summary:
      "Heavy-metal-free AND zinc-free calcium-organic stabilizers with extra-high heat stability — developed for OPVC and large-diameter pressure pipe.",
    image: "src/assets/images/hero/hero-3-granules.jpg",
  },
  {
    slug: "individual-stabilizers",
    name: "Individual Heat Stabilizers",
    summary:
      "Single-compound lead stabilizers and co-stabilizers — TBLS, lead stearate, dibasic lead stearate, dibasic lead phosphite and dibasic lead phthalate — for compounders who build their own formulations.",
    image: "src/assets/images/products/tribasic-lead-sulphate.jpg",
  },
  {
    slug: "lubricants-waxes",
    name: "Lubricants & Waxes",
    summary:
      "Stearic acid grades, waxes across a range of drop-melting temperatures and engineered wax-ester speciality lubricants that control fusion, flow and metal release.",
    image: "src/assets/images/products/lead-stearate.jpg",
  },
  {
    slug: "metallic-stearates",
    name: "Metallic Stearates",
    summary:
      "Calcium, zinc, magnesium, lead and barium stearates — multi-functional metal soaps used as lubricants, acid scavengers and co-stabilizers across PVC, rubber, paints and plastics.",
    image: "src/assets/images/products/calcium-stearate.jpg",
    // Lead Stearate is canonically listed under Individual Heat Stabilizers
    // (owner: "list once, cross-link") — shown here as a linked card.
    crossLinks: ["lead-stearate"],
  },
  {
    slug: "cpvc-one-pack",
    name: "CPVC One-Pack Stabilizers",
    summary:
      "Dedicated one-pack systems for chlorinated PVC pipes and fittings — grades matched to your resin, with or without TiO₂ and colour, meeting pressure, IZOD, VST and impact requirements.",
    image: "src/assets/images/products/one-pack-stabilizer.jpg",
  },
  {
    slug: "processing-aids-impact-modifiers",
    name: "Processing Aids & Impact Modifiers",
    summary:
      "SAN-based, MMA-based and high-molecular-weight acrylic processing aids, plus high-impact and MBS-based impact modifiers for tough, well-fused rigid PVC.",
    image: "src/assets/images/hero/hero-3-granules.jpg",
  },
];

export const items = [
  // ==================================================================
  // 1. LEAD BASED STABILIZERS  (4 products)
  // ==================================================================
  {
    slug: "one-pack-stabilizer",
    name: "One-Pack Lead Stabilizer",
    shortName: "One-Pack Lead",
    productCode: "SCI-240-SP · SCI-275-SLF",
    category: "Lead Based Stabilizers",
    categorySlug: "lead-based-stabilizers",
    dataStatus: "full",
    image: "src/assets/images/products/one-pack-stabilizer.jpg",
    alt: "One-pack lead PVC stabilizer flakes for pipe extrusion",
    summary:
      "Complete lead stabilizer + lubricant pack in a single addition — grades from 12% to 50% PbO, switchable across applications, so one dosing step replaces the whole stabilizer-lubricant system.",
    description:
      "Our one-pack lead stabilizers combine the primary heat stabilizer, co-stabilizers and a balanced internal/external lubricant package in one ready-to-dose product. The range runs from 12% to 50% PbO, so the lead level can be switched to match your compound, line speed and cost target across pipe and other rigid PVC applications. SCI-240-SP is the balanced grade developed for pipes made to IS standards — better thermal stability and effective lubrication at a lower dosage than individually weighed components. SCI-275-SLF is the high-lead flushing grade, formulated to purge the screw and barrel between runs with very high heat stability and operator-adjustable lubrication.",
    keyProperties: [
      "Stabilizer + lubricant in a single addition",
      "Grades from 12–50% PbO — switchable across applications",
      "IS-standard pipe grade and screw/barrel flushing grade",
      "Fewer weighing errors, consistent batch-to-batch output",
    ],
    specTables: [
      {
        title: "Grade SCI-240-SP — PVC rigid pipe",
        rows: [
          { label: "Appearance", value: "White creamy flakes" },
          { label: "Lead Content (PbO)", value: "28.5 ± 1%" },
          { label: "Recommended Dosage", value: "1.8–2.4 phr" },
          { label: "Form", value: "Flake (fine powder on request)" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
      {
        title: "Grade SCI-275-SLF — screw & barrel flushing",
        rows: [
          { label: "Appearance", value: "White creamy flakes" },
          { label: "Lead Content (PbO)", value: "43 ± 1%" },
          { label: "Dosage", value: "1.8–3.0 phr (as per operator)" },
          { label: "Form", value: "Flake (fine powder on request)" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [
      { label: "TDS — SCI-240-SP", file: "SCI_240_SP_R2.pdf" },
      { label: "TDS — SCI-275-SLF", file: "SCI_275_SLF_R1.pdf" },
    ],
    applications: ["PVC rigid pipes", "Agricultural & SWR pipe", "Screw & barrel flushing"],
    forms: ["Flake", "Powder (on request)"],
    packaging: "25 kg HDPE bag with liner",
    featured: true,
  },
  {
    slug: "lead-organic-stabilizer",
    name: "Lead-Organic Stabilizer",
    shortName: "Lead-Organic",
    category: "Lead Based Stabilizers",
    categorySlug: "lead-based-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/products/lead-based-complex-stabilizer.jpg",
    alt: "Lead-organic low-lead high-stability PVC stabilizer",
    summary:
      "Special lead-organic chemistry running 9–35% Pb — low-lead formulations with high heat stability and a wide processing window, in grades for all applications.",
    description:
      "Our lead-organic stabilizers use a special chemistry that pairs a reduced lead content — 9% to 35% Pb across the range — with organic co-stabilizers, so processors can run low-lead formulations without giving up heat stability. The result is a wide processing window, strong long-term stability and dependable colour hold at a lower metal loading than conventional lead packs. Grades are available for all PVC applications and are tailored to your compound and line.",
    keyProperties: [
      "Low-lead chemistry — 9–35% Pb across grades",
      "High heat stability despite reduced lead loading",
      "Wide processing window",
      "Grades for all applications",
    ],
    applications: ["PVC pipe", "Profiles", "Rigid PVC products"],
    forms: ["Powder", "Flake"],
    featured: false,
  },
  {
    slug: "non-lubricated-lead-stabilizer",
    name: "Non-Lubricated Lead Stabilizer",
    shortName: "Non-Lub Lead",
    category: "Lead Based Stabilizers",
    categorySlug: "lead-based-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/products/lead-based-complex-stabilizer.jpg",
    alt: "Non-lubricated lead stabilizer for suction and hose pipe",
    summary:
      "Pure heat stabilization with no built-in lubricant — for suction and hose pipe, and for processors who prefer to design their own lubrication system.",
    description:
      "This non-lubricated lead stabilizer delivers heat stabilization only, leaving the lubricant package entirely in the processor's hands. That makes it the right choice for suction and reinforced hose pipe, and for any formulation where you already run your own lubrication system and simply need dependable, high-efficiency lead stabilization to drop into it.",
    keyProperties: [
      "Heat stabilizer only — no built-in lubrication",
      "You keep full control of the lubricant balance",
      "Developed for suction & hose pipe formulations",
    ],
    applications: ["Suction pipe", "Garden & reinforced hose pipe", "Custom formulations"],
    forms: ["Powder"],
    featured: false,
  },
  {
    slug: "lead-fitting-stabilizer",
    name: "PVC Fitting Stabilizer (Lead)",
    shortName: "Lead Fitting",
    category: "Lead Based Stabilizers",
    categorySlug: "lead-based-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/products/lead-based-complex-stabilizer.jpg",
    alt: "Lead-based PVC fitting stabilizer for injection moulding",
    summary:
      "Developed specifically for injection-moulded PVC fittings — strong VST and SRT performance, with grades available with or without built-in processing aid and impact modifier.",
    description:
      "Our lead fitting stabilizers are developed for injection-moulded PVC pressure fittings, where Vicat softening temperature (VST) and sustained-pressure (SRT) performance decide whether a mould passes. The lubrication package is designed for multi-cavity moulds and clean release, and grades are offered with or without a built-in processing aid and impact modifier — so the pack can match your mould, cycle time and impact specification exactly.",
    keyProperties: [
      "Strong VST & SRT performance",
      "Designed for multi-cavity injection moulds",
      "Grades with or without processing aid & impact modifier",
    ],
    applications: ["PVC pressure fittings", "Injection moulding"],
    forms: ["Powder"],
    featured: false,
  },

  // ==================================================================
  // 2. CALCIUM-ZINC (Ca-Zn) STABILIZERS  (4 products)
  // ==================================================================
  {
    slug: "calcium-zinc-stabilizer",
    name: "Calcium-Zinc Pipe Stabilizer",
    shortName: "Ca-Zn Pipe",
    productCode: "SCI-720-CZ · SCI-729-AG",
    category: "Calcium-Zinc (Ca-Zn) Stabilizers",
    categorySlug: "calcium-zinc-stabilizers",
    dataStatus: "full",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
    alt: "Calcium-zinc (Ca-Zn) lead-free PVC pipe stabilizer flakes",
    summary:
      "Lead-free one-pack replacing every lead pipe grade — plumbing, agricultural, column and SWR — with excellent colour retention, impact strength and consistent wall thickness.",
    description:
      "Our calcium-zinc pipe stabilizers are complete heat-stabilizer-plus-lubricant packs engineered to replace every lead grade in rigid pipe — from plumbing and column pipe to agricultural and SWR — with performance comparable to lead systems. They deliver excellent colour retention, impact strength and consistent wall thickness, and being lead-free and non-toxic they qualify for potable-water pipe. SCI-720-CZ is the well-lubricated grade for plumbing and light/no-pigment pipe, giving superior physical properties and longer screw and barrel life. SCI-729-AG is moderately lubricated for high-output agricultural and commercial lines, with superior pressure and impact results. Our technical team also runs full lead-to-CaZn migrations — machine parameters and formulation fine-tuning included.",
    keyProperties: [
      "Replaces every lead pipe grade — plumbing to agri to column",
      "Lead-free / non-toxic — potable-water suitable",
      "Colour retention, impact strength, consistent wall thickness",
      "No external lubricants required; high output at lower cost",
    ],
    specTables: [
      {
        title: "Grade SCI-720-CZ — plumbing & rigid pipe",
        rows: [
          { label: "Appearance", value: "White creamy flakes" },
          { label: "Dosage", value: "2.8–3.0 phr" },
          { label: "External Lubricants", value: "Not required" },
          { label: "Free Fatty Acid", value: "3% max" },
          { label: "Form", value: "Flake (fine powder on request)" },
          { label: "Packing", value: "25 / 50 kg HDPE bag with liner" },
        ],
      },
      {
        title: "Grade SCI-729-AG — agricultural & high-output lines",
        rows: [
          { label: "Appearance", value: "White creamy flakes" },
          { label: "Dosage", value: "2.7–3.1 phr" },
          { label: "External Lubricants", value: "Not required" },
          { label: "Free Fatty Acid", value: "3% max" },
          { label: "Form", value: "Flake (fine powder on request)" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [
      { label: "TDS — SCI-720-CZ", file: "SCI_720_CZ.pdf" },
      { label: "TDS — SCI-729-AG", file: "SCI_729_AG.pdf" },
      { label: "Safety Data Sheet — Ca-Zn", file: "MSDS_SCI_CZN.pdf" },
    ],
    applications: ["Plumbing & potable-water pipe", "Agricultural pipe", "Column pipe", "SWR & commercial pipe"],
    forms: ["Flake", "Powder (on request)"],
    packaging: "25 / 50 kg HDPE bag with liner",
    featured: true,
  },
  {
    slug: "calcium-zinc-fitting-stabilizer",
    name: "Calcium-Zinc Fitting Stabilizer",
    shortName: "Ca-Zn Fitting",
    category: "Calcium-Zinc (Ca-Zn) Stabilizers",
    categorySlug: "calcium-zinc-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
    alt: "Calcium-zinc PVC fitting stabilizer",
    summary:
      "Replaces tin systems in injection-moulded fittings — VST up to 80 °C, excellent SRT and low cycle times for high-output moulding.",
    description:
      "Our calcium-zinc fitting stabilizer is a direct replacement for tin systems in injection-moulded PVC fittings. It reaches Vicat softening temperatures up to 80 °C with excellent sustained-pressure (SRT) results across different moulds, while the lubrication package is tuned for low cycle times — so multi-cavity moulds keep their output high. Lead-free and tin-free, it suits fittings destined for plumbing and potable-water systems.",
    keyProperties: [
      "Replaces tin stabilizer systems",
      "VST up to 80 °C",
      "Excellent SRT across different moulds",
      "Low cycle time for high output",
    ],
    applications: ["PVC pressure fittings", "Injection moulding", "Plumbing systems"],
    forms: ["Powder", "Flake"],
    featured: false,
  },
  {
    slug: "calcium-zinc-profile-stabilizer",
    name: "Calcium-Zinc Profile Stabilizer",
    shortName: "Ca-Zn Profile",
    category: "Calcium-Zinc (Ca-Zn) Stabilizers",
    categorySlug: "calcium-zinc-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
    alt: "Calcium-zinc uPVC window and door profile stabilizer",
    summary:
      "For uPVC door and window profiles — whiteness up to L* ≈ 100, excellent surface finish, no line vibration and outstanding weathering.",
    description:
      "Our calcium-zinc profile stabilizer is specially formulated for uPVC door and window profiles. It can achieve whiteness values up to approximately L* 100 with consistent colour throughout production, an excellent surface finish free of pinholes and line marks, and no line vibration even on complex dies with narrow processing windows. Outstanding weathering properties and excellent impact performance make it suitable for premium exterior profiles, with high output and gloss across all cross-sections.",
    keyProperties: [
      "Whiteness up to L* ≈ 100 with consistent colour",
      "Excellent surface finish — no pinholes, no line marks",
      "No line vibration; handles complex dies",
      "Outstanding weathering & impact performance",
    ],
    applications: ["uPVC window profiles", "uPVC door profiles", "Complex profile sections"],
    forms: ["Powder", "Flake"],
    featured: false,
  },
  {
    slug: "calcium-zinc-cable-stabilizer",
    name: "Calcium-Zinc Cable Stabilizer",
    shortName: "Ca-Zn Cable",
    category: "Calcium-Zinc (Ca-Zn) Stabilizers",
    categorySlug: "calcium-zinc-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/products/calcium-zinc-stabilizer.jpg",
    alt: "Calcium-zinc PVC wire and cable stabilizer",
    summary:
      "Lead-free stabilizer grades for insulation and sheathing compounds covering the full 70–125 °C service-temperature range, with excellent wet electrical properties.",
    description:
      "Our calcium-zinc cable stabilizers cover insulation and sheathing compounds across the full service-temperature range — 70 °C insulation and sheathing, 90 °C dry and wet, 105 °C and 125 °C grades. They deliver excellent wet electrical insulation properties, superior surface finish, excellent colour retention and outstanding weathering resistance, with transparent grades also available — all in a non-toxic, lead-free system that meets modern cable specifications.",
    keyProperties: [
      "Grades for 70 °C, 90 °C (dry & wet), 105 °C and 125 °C",
      "Excellent wet electrical insulation properties",
      "Superior surface finish & colour retention",
      "Transparent grades available",
    ],
    applications: ["Wire & cable insulation", "Sheathing compounds", "High-temperature cable"],
    forms: ["Powder", "Flake"],
    featured: false,
  },

  // ==================================================================
  // 3. CALCIUM-ORGANIC STABILIZERS  (2 products — zinc-free, no heavy metals)
  // ==================================================================
  {
    slug: "calcium-organic-opvc",
    name: "Calcium-Organic Stabilizer — OPVC Pipe",
    shortName: "Ca-Organic OPVC",
    category: "Calcium-Organic Stabilizers",
    categorySlug: "calcium-organic-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/hero/hero-3-granules.jpg",
    alt: "Calcium-organic zinc-free stabilizer for OPVC pipe",
    summary:
      "Heavy-metal-free AND zinc-free stabilizer with extra-high heat stability, developed for the demanding thermal profile of oriented PVC (OPVC) pipe.",
    description:
      "Oriented PVC pipe puts unusual thermal demands on a stabilizer — the compound must survive extrusion and then the orientation process without losing colour or properties. Our calcium-organic OPVC stabilizer is built for exactly that: an extra-high heat stability system that contains no heavy metals and no zinc, eliminating zinc-burning risk entirely. The result is a clean, modern additive package with the processing window OPVC lines need.",
    keyProperties: [
      "No heavy metals AND zinc-free — no zinc-burning risk",
      "Extra-high heat stability for the orientation process",
      "Clean modern chemistry for pressure-pipe approvals",
    ],
    applications: ["OPVC pipe", "Oriented PVC pressure pipe"],
    forms: ["Powder"],
    featured: false,
  },
  {
    slug: "calcium-organic-large-diameter",
    name: "Calcium-Organic Stabilizer — Large-Diameter Pipe",
    shortName: "Ca-Organic HD",
    category: "Calcium-Organic Stabilizers",
    categorySlug: "calcium-organic-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/hero/hero-3-granules.jpg",
    alt: "Calcium-organic stabilizer for large-diameter PVC pipe",
    summary:
      "Zinc-free calcium-organic stabilizer for high-diameter pipe — good whiteness and colour hold with the heat stability long, high-mass extrusion runs demand.",
    description:
      "Large-diameter pipe means high melt mass, long residence times and nowhere to hide a colour drift. This calcium-organic grade is developed for high-diameter PVC pipe, holding good whiteness and colour throughout the run while providing the heat stability that heavy sections demand. Like the whole calcium-organic range it is free of heavy metals and free of zinc.",
    keyProperties: [
      "Good whiteness & colour hold on heavy sections",
      "Heat stability for long, high-mass extrusion runs",
      "No heavy metals; zinc-free",
    ],
    applications: ["Large-diameter PVC pipe", "High-diameter pressure pipe"],
    forms: ["Powder"],
    featured: false,
  },

  // ==================================================================
  // 4. INDIVIDUAL HEAT STABILIZERS  (5 products)
  // ==================================================================
  {
    slug: "tribasic-lead-sulphate",
    name: "Tribasic Lead Sulphate (TBLS)",
    shortName: "TBLS",
    productCode: "SCI-180-TBLS",
    category: "Individual Heat Stabilizers",
    categorySlug: "individual-stabilizers",
    dataStatus: "full",
    image: "src/assets/images/products/tribasic-lead-sulphate.jpg",
    alt: "Tribasic lead sulphate (TBLS) primary heat stabilizer powder",
    summary:
      "Powerful non-lubricating primary heat stabilizer — stable at elevated temperature without decomposition, so finished products stay sound and free of porosity.",
    description:
      "Tribasic lead sulphate (TBLS) is the workhorse primary heat stabilizer of lead-based PVC formulation — exceptionally powerful at low cost. It is stable at elevated temperature without decomposition, ensuring sound products free of porosity, and it is pulverized to a narrow particle distribution for good dispersion. Being non-lubricating, it pairs with lubricating co-stabilizers such as DBLS, DBLP, lead stearate and calcium stearate in rigid pipe and fittings, wires and cables, soil pipe, rigid profiles, floor coverings and reinforced suction hose.",
    keyProperties: [
      "Exceptionally powerful primary stabilizer at low cost",
      "No decomposition at processing temperature — porosity-free product",
      "Non-lubricating: full freedom over the lubricant package",
      "Narrow particle distribution for good dispersion",
    ],
    specTables: [
      {
        rows: [
          { label: "Description", value: "Fine white powder; insoluble in water" },
          { label: "Chemical Formula", value: "3PbO·PbSO₄·H₂O" },
          { label: "CAS No.", value: "12202-17-4" },
          { label: "Lead Content (PbO)", value: "88–89%" },
          { label: "Specific Gravity", value: "6.5–7.0" },
          { label: "Molecular Weight", value: "990.74 g/mol" },
          { label: "Melting Point", value: "900 °C" },
          { label: "Moisture", value: "1% max" },
          { label: "Particle Size", value: "44 µm (325 mesh); finer on request" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [
      { label: "Technical Data Sheet", file: "SCI_180_TBLS.pdf" },
      { label: "Safety Data Sheet", file: "MSDS_SCI_180_TBLS.pdf" },
    ],
    applications: ["Wires & cables", "Pipes & fittings", "Rigid profiles", "Suction hose"],
    forms: ["Powder"],
    packaging: "25 kg HDPE bag with liner",
    featured: false,
  },
  {
    slug: "lead-stearate",
    name: "Lead Stearate (LS)",
    shortName: "Lead Stearate",
    productCode: "SCI-120-LS",
    category: "Individual Heat Stabilizers",
    categorySlug: "individual-stabilizers",
    dataStatus: "full",
    image: "src/assets/images/products/lead-stearate.jpg",
    alt: "Lead stearate lubricating co-stabilizer powder",
    summary:
      "Lubricating co-stabilizer — greater lubricity than DBLS with better dispersion thanks to its lower melting point, giving rigid and flexible PVC a smooth surface.",
    description:
      "Lead stearate is an excellent lubricant with stabilizing action. Compared with dibasic lead stearate it offers greater lubricity and somewhat less stabilizing action, and its lower melting point gives it better dispersion in PVC. It puts a smooth surface on both rigid and flexible PVC and serves as a general-purpose co-stabilizer for extrusion, injection moulding, wires and cables, rigid pipes, fittings and profiles — usually running alongside TBLS, DBLS, DBLP and calcium stearate.",
    keyProperties: [
      "High lubricity with stabilizing action",
      "Better dispersion — lower melting point than DBLS",
      "Smooth surface finish on rigid & flexible PVC",
      "General-purpose partner to TBLS / DBLS / DBLP / CS",
    ],
    specTables: [
      {
        rows: [
          { label: "Description", value: "Fine white powder; insoluble in water" },
          { label: "Chemical Formula", value: "Pb(C₁₇H₃₅COO)₂" },
          { label: "CAS No.", value: "1072-35-1" },
          { label: "Lead Content (PbO)", value: "29–30%" },
          { label: "Specific Gravity", value: "1.3–1.4" },
          { label: "Molecular Weight", value: "773.51 g/mol" },
          { label: "Melting Point", value: "105–110 °C" },
          { label: "Free Fatty Acid (FFA)", value: "1% max" },
          { label: "Moisture", value: "1% max" },
          { label: "Ash Content", value: "28–30%" },
          { label: "Particle Size", value: "45 µm (325 mesh), 99% passing; finer on request" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [
      { label: "Technical Data Sheet", file: "SCI_120_LS_R1.pdf" },
      { label: "Safety Data Sheet", file: "MSDS_SCI_120_LS.pdf" },
    ],
    applications: ["Wires & cables", "Pipes & fittings", "Profiles", "Footwear"],
    forms: ["Powder"],
    packaging: "25 kg HDPE bag with liner",
    featured: false,
  },
  {
    slug: "dibasic-lead-stearate",
    name: "Dibasic Lead Stearate (DBLS)",
    shortName: "DBLS",
    productCode: "SCI-150-DBLS",
    category: "Individual Heat Stabilizers",
    categorySlug: "individual-stabilizers",
    dataStatus: "full",
    image: "src/assets/images/products/dibasic-lead-stearate.jpg",
    alt: "Dibasic lead stearate (DBLS) co-stabilizer powder",
    summary:
      "High free-lead co-stabilizer plus high-temperature lubricant — it does not melt under normal service conditions, enabling long, fast production runs.",
    description:
      "Dibasic lead stearate (DBLS) carries a high free-lead content that gives excellent stability, while its fine particle distribution ensures good dispersion through the compound. Its defining trait is lubricating action at high temperature — it does not melt under normal service conditions — which keeps lubrication working exactly where hot spots develop. Used in rigid PVC compounds, extrusion, injection moulding, calendering, conduit and cable, it enables long, fast production runs alongside TBLS, lead stearate, calcium stearate and DBLP.",
    keyProperties: [
      "High free-lead content — excellent stability",
      "Lubricates at high temperature (no melting in service)",
      "Fine particle distribution, good dispersion",
      "Enables long, fast production runs",
    ],
    specTables: [
      {
        rows: [
          { label: "Description", value: "Soft white powder; insoluble in water" },
          { label: "Chemical Formula", value: "2PbO·Pb(C₁₇H₃₅COO)₂" },
          { label: "CAS No.", value: "56189-09-4" },
          { label: "Lead Content (PbO)", value: "54–55%" },
          { label: "Specific Gravity", value: "1.9–2.2" },
          { label: "Molecular Weight", value: "1219.87 g/mol" },
          { label: "Moisture", value: "1% max" },
          { label: "Particle Size", value: "63 µm (230 mesh); finer on request" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [
      { label: "Technical Data Sheet", file: "SCI_150_DBLS.pdf" },
      { label: "Safety Data Sheet", file: "MSDS_SCI_150_DBLS.pdf" },
    ],
    applications: ["Wires & cables", "Conduit", "Rigid profiles", "Calendering"],
    forms: ["Powder"],
    packaging: "25 kg HDPE bag with liner",
    featured: false,
  },
  {
    slug: "dibasic-lead-phosphite",
    name: "Dibasic Lead Phosphite (DBLP)",
    shortName: "DBLP",
    productCode: "SCI-165-DBLP",
    category: "Individual Heat Stabilizers",
    categorySlug: "individual-stabilizers",
    dataStatus: "full",
    image: "src/assets/images/products/dibasic-lead-phosphite.jpg",
    alt: "Dibasic lead phosphite (DBLP) heat and light stabilizer powder",
    summary:
      "Heat stabilizer and primary light stabilizer — excellent UV and weathering resistance with retention of physical properties after ageing.",
    description:
      "Dibasic lead phosphite (DBLP) is the weathering specialist of the lead range. Primarily a light stabilizer, it imparts outstanding UV and weathering resistance and preserves physical properties after ageing — the reason it appears in nearly every outdoor lead-stabilized PVC recipe. It works in both rigid and flexible PVC and is generally used together with tribasic lead sulphate (TBLS) in profiles, sheets and roofing exposed to sunlight.",
    keyProperties: [
      "Excellent UV / weathering resistance",
      "Retains physical properties after ageing",
      "Primary light stabilizer for outdoor PVC",
      "For rigid & flexible PVC, usually with TBLS",
    ],
    specTables: [
      {
        rows: [
          { label: "Description", value: "Soft white powder; insoluble in water" },
          { label: "Chemical Formula", value: "2PbO·PbHPO₃·H₂O" },
          { label: "CAS No.", value: "1344-4-7" },
          { label: "Lead Content (PbO)", value: "88–89%" },
          { label: "Specific Gravity", value: "6.0–6.5" },
          { label: "Molecular Weight", value: "742.57 g/mol" },
          { label: "Moisture", value: "1% max" },
          { label: "Particle Size", value: "63 µm (230 mesh); finer on request" },
          { label: "Packing", value: "50 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [{ label: "Technical Data Sheet", file: "SCI_165_DBLP.pdf" }],
    applications: ["Outdoor profiles", "PVC sheets", "Roofing sheets"],
    forms: ["Powder"],
    packaging: "50 kg HDPE bag with liner",
    featured: true,
  },
  {
    slug: "dibasic-lead-phthalate",
    name: "Dibasic Lead Phthalate (DBLPh)",
    shortName: "DBLPh",
    category: "Individual Heat Stabilizers",
    categorySlug: "individual-stabilizers",
    dataStatus: "described",
    image: "src/assets/images/products/dibasic-lead-stearate.jpg",
    alt: "Dibasic lead phthalate (DBLPh) high-temperature co-stabilizer",
    summary:
      "High-temperature heat stabilizer for demanding flexible PVC — the choice for heat-resistant cable insulation and compounds that must survive sustained heat ageing. Distinct from DBLP (phosphite).",
    description:
      "Dibasic lead phthalate (DBLPh) is a separate product from dibasic lead phosphite — different chemistry, different job. Where DBLP protects against light and weathering, DBLPh is prized for high-temperature performance: strong heat stability and excellent resistance to heat ageing, which makes it the stabilizer of choice for high-service-temperature flexible PVC such as heat-resistant cable insulation. Detailed grade specifications are available on request.",
    keyProperties: [
      "Strong high-temperature heat stability",
      "Excellent heat-ageing resistance",
      "For heat-resistant cable & flexible PVC",
      "Distinct product from DBLP (phosphite)",
    ],
    applications: ["Heat-resistant cable insulation", "High-temperature flexible PVC"],
    forms: ["Powder"],
    featured: false,
  },

  // ==================================================================
  // 5. LUBRICANTS & WAXES  (3 products)
  // ==================================================================
  {
    slug: "stearic-acid",
    name: "Stearic Acid",
    shortName: "Stearic Acid",
    productCode: "SCI-305-SA",
    category: "Lubricants & Waxes",
    categorySlug: "lubricants-waxes",
    dataStatus: "full",
    image: "src/assets/images/products/calcium-stearate.jpg",
    alt: "Stearic acid white flakes for PVC processing",
    summary:
      "Internal and external lubricant plus viscosity depressant with excellent lubricity — supplied in multiple grades differentiated by acid, saponification and iodine value.",
    description:
      "Stearic acid is one of the most versatile lubricants in PVC processing — used in pipe, plates, profiles and film manufacture. It acts as both an internal and external lubricant and as a viscosity depressant, with excellent lubricity and good light and heat stability, and it also serves the rubber and cosmetics industries. We supply multiple grades differentiated by acid value, saponification value and iodine value, so the grade can be matched precisely to your specification; the figures below are for the SCI-305-SA grade.",
    keyProperties: [
      "Internal + external lubricant in one product",
      "Viscosity depressant — improves melt flow",
      "Multiple grades by acid / saponification / iodine value",
      "Good light & heat stability",
    ],
    specTables: [
      {
        title: "Grade SCI-305-SA — Typical Properties",
        rows: [
          { label: "Description", value: "White flakes" },
          { label: "Chemical Formula", value: "C₁₇H₃₅COOH" },
          { label: "CAS No.", value: "57-11-4" },
          { label: "Titer", value: "54–56 °C" },
          { label: "Acid Value", value: "204 min (mgKOH/g)" },
          { label: "Saponification Value", value: "205 min (mgKOH/g)" },
          { label: "Iodine Value", value: "3 max" },
          { label: "Molecular Weight", value: "284.48 g/mol" },
          { label: "Ash Content", value: "0.10% max" },
          { label: "Colour (Lovibond)", value: "2.8Y + 1R max (5¼″ cell)" },
          { label: "Packing", value: "50 kg HDPE woven bag" },
        ],
      },
    ],
    downloads: [{ label: "Technical Data Sheet", file: "SCI_305_SA-R1.pdf" }],
    applications: ["PVC pipe, plates & profiles", "PVC film", "Rubber", "Cosmetics"],
    forms: ["Flakes"],
    packaging: "50 kg HDPE woven bag",
    featured: false,
  },
  {
    slug: "pvc-wax",
    name: "Waxes",
    shortName: "Waxes",
    category: "Lubricants & Waxes",
    categorySlug: "lubricants-waxes",
    dataStatus: "described",
    image: "src/assets/images/products/lead-stearate.jpg",
    alt: "PVC processing wax",
    summary:
      "External lubricant waxes in grades spanning a range of drop-melting temperatures — matched to your process temperature for clean metal release and surface finish.",
    description:
      "Our waxes are external lubricants that control the melt's release from hot metal surfaces — the difference between a clean, glossy extrudate and plate-out. Because the right wax depends on where your process runs, we supply grades across a range of drop-melting temperatures, letting you match the wax's activation point to your barrel and die temperatures for maximum effect with minimum dosage.",
    keyProperties: [
      "Grades across a range of drop-melting temperatures",
      "Clean metal release — reduced plate-out",
      "Improves gloss & surface finish",
    ],
    applications: ["PVC extrusion", "PVC moulding", "Masterbatch"],
    forms: ["Powder", "Flake"],
    featured: false,
  },
  {
    slug: "speciality-lubricant",
    name: "Speciality Lubricants",
    shortName: "Spec. Lubricant",
    category: "Lubricants & Waxes",
    categorySlug: "lubricants-waxes",
    dataStatus: "described",
    image: "src/assets/images/products/lead-stearate.jpg",
    alt: "Speciality PVC lubricant blend",
    summary:
      "Engineered wax + ester combinations delivering special lubrication properties that single-component lubricants cannot reach.",
    description:
      "Some compounds need lubrication behaviour that no single wax or soap can deliver — a specific fusion point, a particular internal/external balance, or release performance on a difficult die. Our speciality lubricants are engineered wax-and-ester combinations built for exactly these cases, tuned to give special properties for demanding PVC compounds and processes.",
    keyProperties: [
      "Engineered wax + ester combinations",
      "Special lubrication properties for demanding compounds",
      "Tuned internal/external balance per application",
    ],
    applications: ["Rigid PVC", "PVC fittings", "Speciality compounds"],
    forms: ["Powder", "Flake"],
    featured: false,
  },

  // ==================================================================
  // 6. METALLIC STEARATES  (4 products + Lead Stearate cross-linked from cat 4)
  // ==================================================================
  {
    slug: "calcium-stearate",
    name: "Calcium Stearate",
    shortName: "Ca Stearate",
    productCode: "SCI-105-CS",
    category: "Metallic Stearates",
    categorySlug: "metallic-stearates",
    dataStatus: "full",
    image: "src/assets/images/products/calcium-stearate.jpg",
    alt: "Calcium stearate fine white powder",
    summary:
      "Non-toxic internal and external lubricant and co-stabilizer — lowers melt viscosity, resists colour degradation and qualifies for FDA-approved compounds.",
    description:
      "Calcium stearate is the workhorse non-toxic metallic stearate. In PVC it acts as an internal and external lubricant that reduces inter-particle frictional heat, lowers effective melt viscosity, resists colour degradation and leaves a smooth surface finish. It is widely used in rigid pipe, fittings, conduit, wires and cables, footwear and leather cloth — including non-toxic FDA-approved compounds — and beyond PVC as a release and anti-caking agent in plastics, masterbatch, paints and construction chemicals.",
    keyProperties: [
      "Non-toxic — suitable for FDA-approved compounds",
      "Internal + external lubricant and co-stabilizer",
      "Lowers melt viscosity; resists colour degradation",
      "Release & anti-caking agent across industries",
    ],
    specTables: [
      {
        rows: [
          { label: "Description", value: "Fine white powder; insoluble in water, ethanol & ether" },
          { label: "Chemical Formula", value: "Ca(C₁₇H₃₅COO)₂" },
          { label: "CAS No.", value: "1592-23-0" },
          { label: "Calcium Content", value: "8–9%" },
          { label: "Specific Gravity", value: "1.0–1.3" },
          { label: "Molecular Weight", value: "606.61 g/mol" },
          { label: "Melting Point", value: "155–160 °C" },
          { label: "Free Fatty Acid (FFA)", value: "1% max" },
          { label: "Moisture", value: "3% max" },
          { label: "Particle Size", value: "63 µm (230 mesh); finer on request" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [
      { label: "Technical Data Sheet", file: "SCI_105_CS.pdf" },
      { label: "Safety Data Sheet", file: "MSDS_SCI_105_CS.pdf" },
    ],
    applications: ["PVC processing", "Masterbatch", "Paints", "Construction chemicals"],
    forms: ["Powder"],
    packaging: "25 kg HDPE bag with liner",
    featured: true,
  },
  {
    slug: "zinc-stearate",
    name: "Zinc Stearate",
    shortName: "Zn Stearate",
    productCode: "SCI-135-ZS",
    category: "Metallic Stearates",
    categorySlug: "metallic-stearates",
    dataStatus: "full",
    image: "src/assets/images/products/calcium-stearate.jpg",
    alt: "Zinc stearate fine white powder",
    summary:
      "Non-toxic lubricant and dispersing agent that adds heat stability — the basis of lead-free stabilizer systems, also serving rubber, paints and cosmetics.",
    description:
      "Zinc stearate is a non-toxic lubricant and dispersing agent that also contributes heat stability — it is the chemistry on which lead-free calcium-zinc stabilizer systems are built. In PVC it serves rigid pipes, fittings, conduits and cables; outside PVC it is a rubber activator, a paint-industry staple and a component of FDA-approved compounds, masterbatches and cosmetics.",
    keyProperties: [
      "Basis of lead-free (Ca-Zn) stabilizer systems",
      "Non-toxic lubricant & dispersing agent",
      "Adds heat stability",
      "Rubber activator; paint & cosmetic grades",
    ],
    specTables: [
      {
        rows: [
          { label: "Description", value: "Fine white powder; insoluble in water, ethanol & ether" },
          { label: "Chemical Formula", value: "Zn(C₁₇H₃₅COO)₂" },
          { label: "CAS No.", value: "557-05-1" },
          { label: "Zinc Content", value: "10–11.5%" },
          { label: "Specific Gravity", value: "1.0–1.3" },
          { label: "Molecular Weight", value: "632.33 g/mol" },
          { label: "Melting Point", value: "118–125 °C" },
          { label: "Free Fatty Acid (FFA)", value: "1% max" },
          { label: "Moisture", value: "2% max" },
          { label: "Particle Size", value: "63 µm (230 mesh); finer on request" },
          { label: "Packing", value: "25 kg HDPE bag with liner" },
        ],
      },
    ],
    downloads: [{ label: "Technical Data Sheet", file: "SCI_135_ZS.pdf" }],
    applications: ["PVC processing", "Ca-Zn systems", "Rubber", "Paints", "Cosmetics"],
    forms: ["Powder"],
    packaging: "25 kg HDPE bag with liner",
    featured: false,
  },
  {
    slug: "magnesium-stearate",
    name: "Magnesium Stearate",
    shortName: "Mg Stearate",
    category: "Metallic Stearates",
    categorySlug: "metallic-stearates",
    dataStatus: "described",
    image: "src/assets/images/products/calcium-stearate.jpg",
    alt: "Magnesium stearate fine white powder",
    summary:
      "Non-toxic lubricant and release agent — a fine white metallic soap for plastics, rubber and allied industries.",
    description:
      "Magnesium stearate is a non-toxic metallic soap used as a lubricant, mould-release and anti-caking agent across plastics, rubber and allied industries. Its fine, free-flowing powder disperses readily and provides clean release without staining. Detailed grade specifications and a technical data sheet are available on request.",
    keyProperties: [
      "Non-toxic lubricant & release agent",
      "Anti-caking; fine free-flowing powder",
      "Clean, stain-free release",
    ],
    applications: ["Plastics", "Rubber", "Release & anti-caking"],
    forms: ["Powder"],
    featured: false,
  },
  {
    slug: "barium-stearate",
    name: "Barium Stearate",
    shortName: "Ba Stearate",
    category: "Metallic Stearates",
    categorySlug: "metallic-stearates",
    dataStatus: "msds",
    image: "src/assets/images/products/calcium-stearate.jpg",
    alt: "Barium stearate white powder",
    summary:
      "High-temperature co-stabilizer and lubricant — with a 210–220 °C melting point it keeps lubricating where lower-melting soaps have already melted away.",
    description:
      "Barium stearate is the high-temperature member of the stearate family. Its melting point of 210–220 °C means it keeps providing lubrication and co-stabilizing action at processing temperatures where lower-melting metal soaps have already fluxed, making it valuable in demanding PVC and allied plastics applications. The figures below are from the safety data sheet; a full technical data sheet is available on request.",
    keyProperties: [
      "High melting point — 210–220 °C",
      "Co-stabilizer / heat-stabilizer component",
      "Lubrication that persists at high processing temperatures",
    ],
    specTables: [
      {
        note: "Figures from the safety data sheet. Full technical data sheet available on request.",
        rows: [
          { label: "Chemical Formula", value: "Ba(C₁₇H₃₅COO)₂" },
          { label: "CAS No.", value: "6965-35-6" },
          { label: "Molecular Weight", value: "704.28" },
          { label: "Melting Point", value: "210–220 °C" },
          { label: "Specific Gravity", value: "1.03" },
          { label: "Solubility", value: "Almost insoluble in water" },
        ],
      },
    ],
    downloads: [{ label: "Safety Data Sheet", file: "MSDS_SCI_BS.pdf" }],
    applications: ["PVC processing", "Allied plastics"],
    forms: ["Powder"],
    featured: false,
  },

  // ==================================================================
  // 7. CPVC ONE-PACK STABILIZERS  (2 products)
  // ==================================================================
  {
    slug: "cpvc-pipe-stabilizer",
    name: "CPVC One-Pack Stabilizer — Pipes",
    shortName: "CPVC Pipe",
    category: "CPVC One-Pack Stabilizers",
    categorySlug: "cpvc-one-pack",
    dataStatus: "described",
    image: "src/assets/images/products/one-pack-stabilizer.jpg",
    alt: "CPVC one-pack stabilizer for hot and cold water pipe",
    summary:
      "One-pack system for CPVC pipe with grades matched to your resin — with or without TiO₂ and colour — delivering good pressure, IZOD, VST and impact results.",
    description:
      "CPVC is harder on a stabilizer than PVC — more chlorine, more HCl, higher processing temperatures. Our CPVC one-pack for pipe is formulated grade-by-grade to the resin you run, and is available with or without TiO₂ and colour already built in. Each grade is engineered to deliver good pressure performance, IZOD impact, Vicat softening temperature and impact strength in hot- and cold-water pipe, so the compound passes where it counts.",
    keyProperties: [
      "Grades matched to your CPVC resin",
      "Available with or without TiO₂ & colour",
      "Good pressure, IZOD, VST & impact performance",
    ],
    applications: ["CPVC pipe", "Hot & cold water distribution"],
    forms: ["Powder", "Flake"],
    featured: false,
  },
  {
    slug: "cpvc-fitting-stabilizer",
    name: "CPVC One-Pack Stabilizer — Fittings",
    shortName: "CPVC Fitting",
    category: "CPVC One-Pack Stabilizers",
    categorySlug: "cpvc-one-pack",
    dataStatus: "described",
    image: "src/assets/images/products/one-pack-stabilizer.jpg",
    alt: "CPVC one-pack stabilizer for injection-moulded fittings",
    summary:
      "One-pack system for injection-moulded CPVC fittings — resin-matched grades, with or without TiO₂ and colour, tuned for pressure, IZOD, VST and impact.",
    description:
      "Injection-moulded CPVC fittings add mould-flow and cycle-time demands on top of CPVC's inherent thermal aggression. Our CPVC fitting one-pack is formulated per resin grade, available with or without TiO₂ and colour, and tuned so finished fittings meet their pressure, IZOD impact, VST and impact requirements while the mould keeps cycling fast and clean.",
    keyProperties: [
      "Grades matched to your CPVC resin",
      "Available with or without TiO₂ & colour",
      "Good pressure, IZOD, VST & impact performance",
    ],
    applications: ["CPVC fittings", "Injection moulding"],
    forms: ["Powder", "Flake"],
    featured: false,
  },

  // ==================================================================
  // 8. PROCESSING AIDS & IMPACT MODIFIERS  (2 products)
  // ==================================================================
  {
    slug: "processing-aid",
    name: "Processing Aids",
    shortName: "Processing Aid",
    category: "Processing Aids & Impact Modifiers",
    categorySlug: "processing-aids-impact-modifiers",
    dataStatus: "described",
    image: "src/assets/images/hero/hero-3-granules.jpg",
    alt: "Acrylic processing aid for rigid PVC",
    summary:
      "SAN-based, MMA-based and high-molecular-weight acrylic processing aids that drive fusion, build melt strength and clean up surface finish in rigid PVC.",
    description:
      "Processing aids decide how quickly PVC fuses and how the melt behaves once it has. Our range covers SAN-based, MMA-based and high-molecular-weight acrylic grades: choose by how much fusion promotion, melt strength and surface improvement your process needs — from foam board that must hold its cell structure to profile lines chasing a flawless finish.",
    keyProperties: [
      "SAN-based, MMA-based & high-molecular-weight grades",
      "Faster fusion, higher melt strength",
      "Cleaner surface finish",
    ],
    applications: ["Rigid PVC pipe", "Profiles", "Foam board", "Sheet"],
    forms: ["Powder"],
    featured: false,
  },
  {
    slug: "impact-modifier",
    name: "Impact Modifiers",
    shortName: "Impact Modifier",
    category: "Processing Aids & Impact Modifiers",
    categorySlug: "processing-aids-impact-modifiers",
    dataStatus: "described",
    image: "src/assets/images/hero/hero-3-granules.jpg",
    alt: "Impact modifier for rigid PVC profiles and pipe",
    summary:
      "High-impact and MBS-based impact modifiers that raise toughness and durability in rigid PVC without giving up processability.",
    description:
      "Rigid PVC is strong but brittle — impact modifiers fix that. We offer high-impact grades for maximum toughness in profiles, pipe and board, and MBS-based grades where impact must come with clarity. Both are engineered to raise durability and drop-weight performance without compromising fusion behaviour or output on your existing line.",
    keyProperties: [
      "High-impact & MBS-based grades",
      "Raises toughness & drop-weight performance",
      "No compromise on processing behaviour",
    ],
    applications: ["Rigid PVC profiles", "Pipe", "Foam board"],
    forms: ["Powder"],
    featured: false,
  },
];

export default { categories, items };
