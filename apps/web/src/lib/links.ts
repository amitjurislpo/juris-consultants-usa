/* The blog lives on the existing website and keeps its URLs (/blogs/...).
   - Test site: /blogs links go to the old site.
   - Live site: set BLOG_ORIGIN to the old blog's own address (not the public domain).
     /blogs/... is then served from there through a rewrite, so URLs and indexing stay the same. */
export const BLOG_ORIGIN = process.env.BLOG_ORIGIN?.replace(/\/$/, "");
export const OLD_SITE = "https://www.jurisconsultantsusa.com";
export const BLOG_URL = BLOG_ORIGIN ? "/blogs" : `${OLD_SITE}/blogs`;
