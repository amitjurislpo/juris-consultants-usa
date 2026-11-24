export const CUSTOMER_NOTE_ACTION = "CUSTOMER_NOTE";

/** Reads the note text stored in an audit row's `after` JSON. */
export function noteText(after: unknown): string {
  if (after && typeof after === "object" && !Array.isArray(after)) {
    const note = (after as { note?: unknown }).note;
    if (typeof note === "string") return note;
  }
  return "";
}

/** Company address JSON as one line; unknown shapes give an empty string. */
export function addressLine(address: unknown): string {
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    return "";
  }
  return Object.values(address)
    .filter((part): part is string => typeof part === "string" && part !== "")
    .join(", ");
}
