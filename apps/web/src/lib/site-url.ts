const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

/** Public origin of the website (used in sitemap and structured data). */
export const siteUrl = deploymentHost
  ? `https://${deploymentHost}`
  : "http://localhost:3000";
