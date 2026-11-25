/* The blog keeps its URLs (/blogs/...).
   - Test site: /blogs is a dedicated page in this app with a few illustrative sample articles,
     so testers stay inside the site design.
   - Live site: set BLOG_ORIGIN to the existing blog's own address (not the public domain).
     /blogs/... is then served from there through a rewrite that runs before the pages, so the
     sample articles disappear, and URLs and indexing stay the same. */
export const BLOG_ORIGIN = process.env.BLOG_ORIGIN?.replace(/\/$/, "");
export const BLOG_URL = "/blogs";
