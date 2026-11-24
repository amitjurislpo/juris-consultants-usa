"use client";

import { Button, Modal } from "@juris/ui";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ADMIN_TIME_ZONES, zoneMenuLabel } from "../../src/lib/datetime";
import { setTimeZoneAction } from "./profile-actions";

/** Panel-wide time zone. Changing it asks whether it should also become this admin's default. */
export function TimeZoneSwitcher({ current }: { current: string }) {
  const router = useRouter();
  const [wanted, setWanted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const now = new Date();
  const wantedZone = ADMIN_TIME_ZONES.find((zone) => zone.id === wanted);

  function apply(remember: boolean) {
    if (!wanted) return;
    start(async () => {
      const result = await setTimeZoneAction(wanted, remember);
      if (result.error) {
        setError(result.error);
        return;
      }
      setWanted(null);
      router.refresh();
    });
  }

  return (
    <>
      <label className="tz-switcher">
        <span className="visually-hidden">Time zone</span>
        <select
          aria-label="Time zone"
          className="ui-select tz-select"
          onChange={(event) => {
            setError(null);
            setWanted(event.target.value);
          }}
          value={current}
        >
          {ADMIN_TIME_ZONES.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zoneMenuLabel(zone, now)}
            </option>
          ))}
        </select>
      </label>
      <Modal
        footer={
          <>
            <Button
              disabled={pending}
              onClick={() => apply(false)}
              type="button"
              variant="outline"
            >
              No, this session
            </Button>
            <Button
              disabled={pending}
              onClick={() => apply(true)}
              type="button"
            >
              Yes, save as default
            </Button>
          </>
        }
        onClose={() => {
          if (!pending) setWanted(null);
        }}
        open={wanted !== null && wanted !== current}
        title="Time zone"
      >
        <p className="tz-question">
          Make{" "}
          <strong>
            {wantedZone ? zoneMenuLabel(wantedZone, now) : wanted}
          </strong>{" "}
          your default time zone?
        </p>
        <p className="muted tz-hint">
          <strong>Yes</strong> saves it to your account. <strong>No</strong>{" "}
          uses it for this session only.
        </p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
      </Modal>
    </>
  );
}
