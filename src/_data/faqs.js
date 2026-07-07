/**
 * FAQ content model — powers the visible FAQ accordion AND the FAQPage JSON-LD
 * emitted by src/_includes/partials/faq.njk.
 *
 * Provenance: answers are general company/product truths (not draft spec
 * numbers), so they carry NO [verify] markers and are safe to publish. Do not
 * add specific technical figures (VST, dosing, %) here without brand-owner
 * confirmation — keep those on request via the TDS.
 *
 * Shape:
 *   { q: string, a: string, link?: { href, label } }
 * `a` is plain text (used verbatim in acceptedAnswer.text). `link` renders only
 * in the visible answer (internal linking), never in the schema.
 *
 * Keys:
 *   home            → homepage FAQ (buyer-intent, keyword-led)
 *   products[slug]  → per-product FAQ on the three flagship detail pages
 */

export const home = [
  {
    q: "What does Stabplast Chemo Industries manufacture?",
    a: "We are a PVC stabilizer manufacturer based in Amravati, Maharashtra, established in 1988. Our range covers calcium-zinc and lead-based heat stabilizers, one-pack stabilizer systems, individual stabilizers, metallic stearates (calcium, lead and dibasic lead stearate) and lead compounds for the PVC and plastics industry.",
    link: { href: "/products/", label: "Explore our product range" },
  },
  {
    q: "What is the difference between calcium-zinc and lead-based PVC stabilizers?",
    a: "Lead-based systems are economical and give excellent long-term heat stability and electrical insulation, but are ruled out for potable-water and food-contact PVC in many markets. Calcium-zinc (Ca-Zn) systems are non-toxic and heavy-metal-free, which makes them the choice for drinking-water pipe, food-contact articles and consumer PVC.",
    link: { href: "/articles/lead-vs-calcium-zinc-stabilizers/", label: "Read the full lead vs Ca-Zn comparison" },
  },
  {
    q: "Which PVC stabilizer is best for potable (drinking) water pipes?",
    a: "A calcium-zinc one-pack stabilizer is the usual choice for potable-water pipe, because it is lead-free and meets drinking-water and food-contact requirements while still delivering reliable heat stability through extrusion.",
    link: { href: "/products/calcium-zinc-stabilizers/", label: "See our calcium-zinc stabilizers" },
  },
  {
    q: "Do you supply one-pack (all-in-one) stabilizer systems?",
    a: "Yes. Our one-pack systems combine the heat stabilizer, internal and external lubricants and co-stabilizers in a single ready-to-use addition, cutting weighing errors and improving batch-to-batch consistency during compounding.",
    link: { href: "/products/one-pack-stabilizer/", label: "View the one-pack stabilizer" },
  },
  {
    q: "What metallic stearates do you manufacture?",
    a: "We manufacture calcium stearate, lead stearate and dibasic lead stearate. They work as lubricants, acid scavengers and co-stabilizers across PVC, masterbatch, rubber, paints and construction chemicals.",
    link: { href: "/products/metallic-stearates/", label: "See our metallic stearates" },
  },
  {
    q: "Can you help us switch from lead to calcium-zinc stabilizers?",
    a: "Yes. Our technical team runs the full lead-to-Ca-Zn migration — formulation audit, selecting an application-specific one-pack, rebalancing the lubricant package and supervising a plant trial — so most lines convert without losing output.",
    link: { href: "/about/", label: "How we support your formulation" },
  },
  {
    q: "Which industries and applications do your stabilizers serve?",
    a: "Our stabilizers and stearates are used in PVC and CPVC pipes, uPVC window and door profiles, wires and cables, pipe fittings, foam boards, sheets, footwear and masterbatch — across both rigid and flexible PVC.",
    link: { href: "/applications/", label: "Browse all applications" },
  },
  {
    q: "How do I get a quote or a product sample?",
    a: "Tell us your application, grade and monthly volume through our contact form, WhatsApp or phone, and our team will recommend the right stabilizer or stearate and share pricing and a technical data sheet.",
    link: { href: "/contact/", label: "Request a quote" },
  },
];

export const products = {
  "one-pack-stabilizer": [
    {
      q: "What is a one-pack PVC stabilizer?",
      a: "A one-pack (or all-in-one) stabilizer combines the heat stabilizer, internal and external lubricants and co-stabilizers in a single pre-blended addition, so you dose one product instead of weighing several components separately.",
    },
    {
      q: "What are the advantages of a one-pack system over individual additives?",
      a: "One-pack systems cut weighing and mixing errors, improve batch-to-batch consistency, simplify inventory and speed up compounding — while keeping the stabilizer and lubricant package balanced for your process.",
    },
    {
      q: "Which applications is your one-pack stabilizer suitable for?",
      a: "Our one-pack systems are used across rigid and flexible PVC, including pipes, profiles and fittings, with the package tuned to your resin, line and end-use.",
      link: { href: "/applications/pipes/", label: "See pipe applications" },
    },
  ],
  "calcium-zinc-stabilizer": [
    {
      q: "Is calcium-zinc stabilizer non-toxic?",
      a: "Yes. Calcium-zinc (Ca-Zn) stabilizers are lead-free and heavy-metal-free, which is why they are used for potable-water pipe, food-contact articles and other consumer PVC where toxicity is a concern.",
    },
    {
      q: "Can calcium-zinc stabilizer replace lead in my formulation?",
      a: "In most applications, yes — but it is not a drop-in swap. The lubricant package usually needs rebalancing, so we audit your recipe and run a supervised plant trial before you commit.",
      link: { href: "/articles/lead-vs-calcium-zinc-stabilizers/", label: "How to plan a lead-to-Ca-Zn switch" },
    },
    {
      q: "What applications use calcium-zinc stabilizers?",
      a: "Potable-water and plumbing pipe, foam board, edge banding, footwear and other consumer or food-contact PVC where a non-toxic system is required.",
    },
  ],
  "tribasic-lead-sulphate": [
    {
      q: "Where are lead-based PVC stabilizers still used?",
      a: "Lead-based stabilizers remain a proven, economical choice for many industrial PVC products — such as wires and cables, drainage pipe and profiles — where potable-water and food-contact rules do not apply.",
    },
    {
      q: "Why choose a lead-based stabilizer?",
      a: "Lead systems offer excellent long-term heat stability, very good electrical insulation and low cost per unit of stabilizing performance, which is why they held the default position in cable insulation for decades.",
    },
    {
      q: "Do you also offer lead-free alternatives?",
      a: "Yes — we manufacture calcium-zinc one-pack systems and can help you migrate from lead where regulation or customers require it.",
      link: { href: "/products/calcium-zinc-stabilizers/", label: "See lead-free Ca-Zn stabilizers" },
    },
  ],
};

export default { home, products };
