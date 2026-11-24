/** Formats a Prisma Decimal, number or numeric string as a money amount. */
export function formatMoney(
  amount: { toString(): string } | number,
  currency = "USD",
): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    Number(amount.toString()),
  );
}

export { formatDateTime } from "./datetime";

/** Turns a stored JSON value (intake answer, address field) into readable text. */
export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  return Object.entries(value as Record<string, unknown>)
    .map(([key, entry]) => `${key}: ${formatValue(entry)}`)
    .join(", ");
}
