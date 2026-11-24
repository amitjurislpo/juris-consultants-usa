/** Time zones a customer can pick for the dates and times in their portal. */
export const CUSTOMER_DEFAULT_TIME_ZONE = "UTC";

export interface PortalTimeZone {
  id: string;
  name: string;
}

export const PORTAL_TIME_ZONES: readonly PortalTimeZone[] = [
  { id: "UTC", name: "Universal" },
  { id: "Asia/Kolkata", name: "India" },
  { id: "America/New_York", name: "US Eastern" },
  { id: "America/Chicago", name: "US Central" },
  { id: "America/Los_Angeles", name: "US Pacific" },
];

export function isPortalTimeZone(value: unknown): value is string {
  return (
    typeof value === "string" &&
    PORTAL_TIME_ZONES.some((zone) => zone.id === value)
  );
}

/** "IST", "UTC", or "EST"/"EDT", "CST"/"CDT", "PST"/"PDT" depending on the date. */
export function zoneAbbreviation(timeZone: string, at: Date): string {
  if (timeZone === "Asia/Kolkata") return "IST";
  if (timeZone === "UTC") return "UTC";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(at);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}

export function zoneMenuLabel(zone: PortalTimeZone, now = new Date()): string {
  return `${zoneAbbreviation(zone.id, now)} · ${zone.name}`;
}

/** "24 Nov 2026" in the customer's zone. */
export function formatDate(
  date: Date | null | undefined,
  timeZone: string = CUSTOMER_DEFAULT_TIME_ZONE,
): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone,
  }).format(date);
}

/** "24 Nov 2026, 19:43 IST" in the customer's zone. */
export function formatDateTime(
  date: Date | null | undefined,
  timeZone: string = CUSTOMER_DEFAULT_TIME_ZONE,
): string {
  if (!date) return "—";
  const text = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  }).format(date);
  return `${text} ${zoneAbbreviation(timeZone, date)}`;
}
