/** Company address JSON as one line; unknown shapes give an empty string. */
export function addressLine(address: unknown): string {
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    return "";
  }
  return Object.values(address)
    .filter((part): part is string => typeof part === "string" && part !== "")
    .join(", ");
}
