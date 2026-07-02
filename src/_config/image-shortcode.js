import Image from "@11ty/eleventy-img";
import path from "node:path";

/**
 * Responsive image shortcode.
 * Emits <picture> with AVIF + WebP + original-format fallback, srcset widths,
 * explicit width/height (zero CLS), lazy/async by default.
 *
 * Usage in templates:
 *   {% image "src/assets/images/hero.jpg", "Alt text", "(max-width: 768px) 100vw, 1200px", { class: "hero__img", loading: "eager", fetchpriority: "high" } %}
 */
export default async function imageShortcode(
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 1200px",
  options = {}
) {
  if (typeof alt !== "string") {
    throw new Error(`Missing alt text for image: ${src}`);
  }

  const {
    widths = [400, 800, 1200],
    formats = ["avif", "webp", "jpeg"],
    loading = "lazy",
    decoding = "async",
    fetchpriority,
    className,
    class: classAlias,
  } = options;

  const metadata = await Image(src, {
    widths: [...widths, null],
    formats,
    outputDir: "./_site/assets/img/",
    urlPath: "/assets/img/",
    filenameFormat: (id, s, width, format) => {
      const name = path.basename(s, path.extname(s));
      return `${name}-${width}.${format}`;
    },
  });

  const attributes = {
    alt,
    sizes,
    loading,
    decoding,
    ...(fetchpriority ? { fetchpriority } : {}),
    ...(className || classAlias ? { class: className || classAlias } : {}),
  };

  return Image.generateHTML(metadata, attributes);
}
