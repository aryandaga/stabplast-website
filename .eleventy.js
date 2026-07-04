import { minify } from "html-minifier-terser";
import { HtmlBasePlugin } from "@11ty/eleventy";
import imageShortcode from "./src/_config/image-shortcode.js";

export default function (eleventyConfig) {
  // ---- Path-prefix aware URL rewriting ----
  // Deployed as a GitHub Pages *project site* under /stabplast-website/.
  // HtmlBasePlugin rewrites all root-relative href/src/srcset in HTML output
  // to include the pathPrefix. Absolute URLs (canonical/OG/JSON-LD) are left
  // untouched and are built via the `absoluteUrl` filter + site.url below.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // ---- Passthrough copy: static assets served as-is ----
  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" });
  eleventyConfig.addPassthroughCopy({ "src/assets/static": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  // ---- Responsive image shortcode (AVIF/WebP/fallback + srcset) ----
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // ---- Collections ----
  eleventyConfig.addCollection("products", (api) =>
    api.getAll().filter((item) => item.data.type === "product")
  );

  // ---- Filters ----
  eleventyConfig.addFilter("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("byCategory", (items, slug) =>
    (items || []).filter((i) => i.categorySlug === slug)
  );
  eleventyConfig.addFilter("bySlug", (items, slug) =>
    (items || []).find((i) => i.slug === slug)
  );
  eleventyConfig.addFilter("bySlugs", (items, slugs) =>
    (slugs || []).map((s) => (items || []).find((i) => i.slug === s)).filter(Boolean)
  );
  // Build an absolute URL that PRESERVES any sub-path in `base` (e.g. a project
  // site served under /stabplast-website/). A plain `new URL("/x", base)` would
  // drop the sub-path, so we join a de-slashed path onto a trailing-slash base.
  eleventyConfig.addFilter("absoluteUrl", (p, base) => {
    try {
      const b = String(base).endsWith("/") ? String(base) : `${base}/`;
      const rel = String(p).replace(/^\/+/, "");
      return new URL(rel, b).toString();
    } catch {
      return p;
    }
  });

  // ---- Minify HTML output in production builds ----
  eleventyConfig.addTransform("htmlmin", async (content, path) => {
    if (process.env.ELEVENTY_RUN_MODE === "build" && path && path.endsWith(".html")) {
      return await minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        useShortDoctype: true,
      });
    }
    return content;
  });

  return {
    pathPrefix: "/stabplast-website/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
