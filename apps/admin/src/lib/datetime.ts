/** Time zones offered in the admin panel. IST first because the team works in India. */
export const DEFAULT_TIME_ZONE = "Asia/Kolkata";

export interface AdminTimeZone {
  id: string;
  /** Short place name for the menu. */
  name: string;
}

export const ADMIN_TIME_ZONES: readonly AdminTimeZone[] = [
  { id: "Asia/Kolkata", name: "India" },
  { id: "UTC", name: "Universal" },
  { id: "America/New_York", name: "US Eastern" },
  { id: "America/Chicago", name: "US Central" },
  { id: "America/Los_Angeles", name: "US Pacific" },
];

export function isSupportedTimeZone(value: unknown): value is string {
  return (
    typeof value === "string" &&
    ADMIN_TIME_ZONES.some((zone) => zone.id === value)
  );
}

/** "IST", "UTC", or "EST"/"EDT", "CST"/"CDT", "PST"/"PDT" depending on the date (daylight saving). */
export function zoneAbbreviation(timeZone: string, at: Date): string {
  if (timeZone === "Asia/Kolkata") return "IST";
  if (timeZone === "UTC") return "UTC";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(at);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}

/** "24 Nov 2026, 19:43:21 IST" — always with seconds and the zone name. */
export function formatDateTime(
  date: Date | null | undefined,
  timeZone: string = DEFAULT_TIME_ZONE,
): string {
  if (!date) return "";
  const text = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone,
  }).format(date);
  return `${text} ${zoneAbbreviation(timeZone, date)}`;
}

/** Menu text such as "IST · India" or "EDT · US Eastern" (abbreviation follows daylight saving today). */
export function zoneMenuLabel(zone: AdminTimeZone, now = new Date()): string {
  return `${zoneAbbreviation(zone.id, now)} · ${zone.name}`;
}

/** Offset of `timeZone` from UTC at `at`, in milliseconds. */
function offsetMillis(timeZone: string, at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(at);
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return asUtc - Math.floor(at.getTime() / 1000) * 1000;
}

/** The instant when calendar day `yyyy-mm-dd` starts in `timeZone`. Null for bad input. */
export function startOfDayInZone(
  day: string,
  timeZone: string = DEFAULT_TIME_ZONE,
): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!match) return null;
  const guess = Date.UTC(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  );
  if (Number.isNaN(guess)) return null;
  const first = guess - offsetMillis(timeZone, new Date(guess));
  // Re-check once so a daylight-saving change near midnight still lands on 00:00.
  return new Date(guess - offsetMillis(timeZone, new Date(first)));
}

/** The calendar day after `yyyy-mm-dd`, as `yyyy-mm-dd`. */
export function nextDayString(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(Date.UTC(year!, month! - 1, date! + 1))
    .toISOString()
    .slice(0, 10);
}

/** The last millisecond of calendar day `yyyy-mm-dd` in `timeZone`. */
export function endOfDayInZone(
  day: string,
  timeZone: string = DEFAULT_TIME_ZONE,
): Date | null {
  const next = startOfDayInZone(nextDayString(day), timeZone);
  return next ? new Date(next.getTime() - 1) : null;
}
