"use client";

import { Button, Input } from "@juris/ui";
import { ReadOnlyField } from "../read-only-field";
import { useRouter } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import { ADMIN_TIME_ZONES, zoneMenuLabel } from "../../../src/lib/datetime";
import {
  setTimeZoneAction,
  updateMyDetailsAction,
  type ProfileResult,
} from "../profile-actions";

const initial: ProfileResult = { error: null, notice: null };

export function DetailsForm({
  name,
  email,
  role,
  timeZone,
}: {
  name: string;
  email: string;
  role: string;
  timeZone: string;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    updateMyDetailsAction,
    initial,
  );
  const [zone, setZone] = useState(timeZone);
  const [zoneNotice, setZoneNotice] = useState<string | null>(null);
  const [savingZone, startZone] = useTransition();
  const now = new Date();

  return (
    <div className="stack">
      <form action={action} className="mg-form" noValidate>
        <div className="mg-fields">
          <Input
            autoComplete="name"
            defaultValue={name}
            label="Name"
            maxLength={100}
            name="name"
            required
          />
          <ReadOnlyField
            hint="Your sign-in email. It cannot be changed here."
            label="Email"
            value={email}
          />
          <ReadOnlyField
            hint="Only a super admin can change roles."
            label="Role"
            value={role}
          />
        </div>
        {state.error ? (
          <p className="form-error" role="alert">
            {state.error}
          </p>
        ) : null}
        {state.notice ? <p role="status">{state.notice}</p> : null}
        <div className="mg-actions">
          <Button disabled={pending} type="submit">
            {pending ? "Saving..." : "Save details"}
          </Button>
        </div>
      </form>

      <div className="mg-form tz-block">
        <div className="ui-field tz-field">
          <label className="ui-label" htmlFor="default-tz">
            Default time zone
          </label>
          <select
            className="ui-select"
            id="default-tz"
            onChange={(event) => {
              const next = event.target.value;
              setZone(next);
              startZone(async () => {
                const result = await setTimeZoneAction(next, true);
                setZoneNotice(
                  result.error ?? "Default time zone saved for your account.",
                );
                router.refresh();
              });
            }}
            value={zone}
          >
            {ADMIN_TIME_ZONES.map((item) => (
              <option key={item.id} value={item.id}>
                {zoneMenuLabel(item, now)}
              </option>
            ))}
          </select>
          <span className="ui-field-helper">
            Used for every date and time in the admin panel when you sign in.
          </span>
        </div>
        {savingZone ? <p className="muted">Saving...</p> : null}
        {zoneNotice ? <p role="status">{zoneNotice}</p> : null}
      </div>
    </div>
  );
}
