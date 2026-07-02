/**
 * APPLICATIONS — end-use industries served by the product range.
 *
 * Consumed by:
 *   - /applications/ index page (M3)
 *   - cross-links from product pages (relatedProducts by slug)
 *
 * Copy is DRAFT marketing text; no measured data. `relatedProducts` values are
 * product slugs from products.js.
 */
export default [
  {
    slug: "pvc-pipes",
    name: "PVC Pipes",
    image: "src/assets/images/applications/pvc-pipes.jpg",
    alt: "PVC pipes manufactured with heat stabilizers",
    summary:
      "Heat stabilizers and lubricants that keep rigid PVC pipe extrusion stable, consistent and efficient at high output.",
    relatedProducts: ["one-pack-stabilizer", "tribasic-lead-sulphate", "calcium-zinc-stabilizer"],
  },
  {
    slug: "cpvc-pipes",
    name: "CPVC Pipes",
    image: "src/assets/images/applications/cpvc-pipes.jpg",
    alt: "CPVC pipes for hot water and industrial use",
    summary:
      "Stabilizer systems formulated for the higher processing temperatures and performance demands of CPVC piping.",
    relatedProducts: ["calcium-zinc-stabilizer", "one-pack-stabilizer"],
  },
  {
    slug: "upvc-profiles",
    name: "UPVC Profiles",
    image: "src/assets/images/applications/upvc-profiles.jpg",
    alt: "Coloured UPVC window and door profiles",
    summary:
      "Weather-resistant stabilization for window and door profiles, preserving colour and integrity under sunlight.",
    relatedProducts: ["dibasic-lead-phosphite", "one-pack-stabilizer", "calcium-zinc-stabilizer"],
  },
  {
    slug: "wires-cables",
    name: "Wires & Cables",
    image: "src/assets/images/applications/wires-cables.jpg",
    alt: "PVC insulated wires and cables",
    summary:
      "Stabilizers and co-stabilizers delivering the electrical insulation and long-term heat stability cable compounds require.",
    relatedProducts: ["tribasic-lead-sulphate", "dibasic-lead-stearate", "lead-stearate"],
  },
  {
    slug: "masterbatch",
    name: "Masterbatch",
    image: "src/assets/images/applications/masterbatch.jpg",
    alt: "Plastic masterbatch pellets",
    summary:
      "Metallic stearates acting as dispersion aids, lubricants and processing aids in masterbatch production.",
    relatedProducts: ["calcium-stearate"],
  },
  {
    slug: "plastic-products",
    name: "Plastic Products",
    image: "src/assets/images/applications/plastic-products.jpg",
    alt: "Assorted moulded plastic products",
    summary:
      "Additives that improve flow, release and surface finish across a broad range of moulded and extruded plastics.",
    relatedProducts: ["calcium-stearate", "one-pack-stabilizer"],
  },
];
