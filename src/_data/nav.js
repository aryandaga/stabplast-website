/**
 * Primary navigation structure.
 * Consumed by the header/nav partial to render desktop + mobile menus.
 *
 * The Products item carries `children` (the 8 Product Range categories, imported
 * from products.js so the menu stays in sync) → rendered as a hover/focus dropdown.
 */
import { categories } from "./products.js";

export default {
  primary: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    {
      label: "Products",
      href: "/products/",
      children: categories.map((c) => ({ label: c.name, href: `/products/${c.slug}/` })),
    },
    { label: "Applications", href: "/applications/" },
    { label: "Contact", href: "/contact/" },
  ],
};
