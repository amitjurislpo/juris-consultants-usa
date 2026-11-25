/* Only allow same-site paths as a post-login destination (blocks open redirects). */
export function safeNext(
  value: string | undefined | null,
  fallback = "/account/dashboard",
): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  )
    return fallback;
  return value;
}
