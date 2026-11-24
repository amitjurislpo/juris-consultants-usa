/* The blog lives on the existing website. Override per environment if it moves. */
export const BLOG_URL =
  process.env.NEXT_PUBLIC_BLOG_URL ??
  "https://www.jurisconsultantsusa.com/blogs";
