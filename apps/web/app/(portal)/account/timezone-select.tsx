"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PORTAL_TIME_ZONES, zoneMenuLabel } from "../../../src/lib/datetime";
import { setPortalTimeZoneAction } from "./portal-actions";

/** Lets the customer choose the time zone used for every date and time in the portal. */
export function TimeZoneSelect({ current }: { current: string }) {
  const router = useRouter();
  const [value, setValue] = useState(current);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const now = new Date();
  return (
    <div className="pt-field">
      <label htmlFor="pf-tz">Time zone</label>
      <select
        disabled={pending}
        id="pf-tz"
        onChange={(event) => {
          const next = event.target.value;
          setValue(next);
          start(async () => {
            const result = await setPortalTimeZoneAction(next);
            setMessage(result.error ?? result.notice ?? null);
            router.refresh();
          });
        }}
        value={value}
      >
        {PORTAL_TIME_ZONES.map((zone) => (
          <option key={zone.id} value={zone.id}>
            {zoneMenuLabel(zone, now)}
          </option>
        ))}
      </select>
      <span className="pt-help">
        {message ?? "Used for the dates and times shown in your portal."}
      </span>
    </div>
  );
}
