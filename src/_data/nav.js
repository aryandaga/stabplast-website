/**
 * Primary navigation structure.
 * Consumed by the header/nav partial to render desktop + mobile menus.
 *
 * Products + Applications carry `children` (imported so the menus stay in sync)
 * → rendered as hover/focus dropdowns. Technical Services anchors to the
 * homepage section.
 */
import { categories } from "./products.js";
import applications from "./applications.js";
import { services } from "./home.js";

export default {
  primary: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    {
      label: "Products",
      href: "/products/",
      children: categories.map((c) => ({ label: c.name, href: `/products/${c.slug}/` })),
    },
    {
      label: "Applications",
      href: "/applications/",
      children: applications
        .filter((a) => a.detail)
        .map((a) => ({ label: a.name, href: `/applications/${a.slug}/` })),
    },
    {
      label: "Technical Services",
      href: "/#technical-services",
      hideCaret: true, // dropdown still opens on hover/focus — just no arrow (owner preference)
      children: services.map((s) => ({ label: s.title, href: `/#service-${s.slug}` })),
    },
    { label: "Knowledge Hub", href: "/articles/" },
    { label: "Contact", href: "/contact/" },
  ],
};
