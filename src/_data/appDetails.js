/**
 * Applications that get a full detail page (/applications/{slug}/).
 * Derived from applications.js so there is a single source of truth.
 * Consumed by src/application.njk pagination.
 */
import applications from "./applications.js";

export default applications.filter((a) => a.detail);
