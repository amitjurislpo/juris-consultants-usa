"use client";

import { Button, Modal } from "@juris/ui";
import { useState, useTransition } from "react";
import { setStateActiveAction } from "./state-actions";

export interface StateToggleRow {
  code: string;
  label: string;
  abbr: string;
  orders: number;
  active: boolean;
}

/** On/off switches for the states shown on the website. Turning one off asks first. */
export function StateToggles({
  rows,
  canEdit,
  days,
}: {
  rows: StateToggleRow[];
  canEdit: boolean;
  days?: number;
}) {
  const [active, setActive] = useState(
    () => new Map(rows.map((r) => [r.code, r.active])),
  );
  const [confirm, setConfirm] = useState<StateToggleRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function apply(row: StateToggleRow, next: boolean) {
    setError(null);
    start(async () => {
      const result = await setStateActiveAction(row.code, next);
      if (result.error) setError(result.error);
      else setActive((prev) => new Map(prev).set(row.code, next));
      setConfirm(null);
    });
  }

  return (
    <>
      <div className="d-list">
        {rows.map((row) => {
          const on = active.get(row.code) ?? false;
          return (
            <div key={row.code}>
              <div className="d-fi" style={{ font: "700 11px var(--d-m)" }}>
                {row.abbr}
              </div>
              <div className="d-t">
                <b>{row.label}</b>
                <small>
                  {row.orders} {row.orders === 1 ? "order" : "orders"}
                  {days ? ` · ${days} days` : ""}
                </small>
              </div>
              <button
                aria-checked={on}
                aria-label={`${row.label} is ${on ? "on" : "off"} on the website`}
                className={`d-tg${on ? " on" : ""}`}
                disabled={!canEdit || pending}
                onClick={() => (on ? setConfirm(row) : apply(row, true))}
                role="switch"
                title={
                  canEdit ? "Turn on/off" : "Only a super admin can change this"
                }
                type="button"
              />
            </div>
          );
        })}
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <Modal
        footer={
          <>
            <Button
              disabled={pending}
              onClick={() => setConfirm(null)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={pending}
              onClick={() => confirm && apply(confirm, false)}
              type="button"
            >
              {pending ? "Saving..." : "Yes, turn it off"}
            </Button>
          </>
        }
        onClose={() => {
          if (!pending) setConfirm(null);
        }}
        open={confirm !== null}
        title={`Turn off ${confirm?.label ?? ""}?`}
      >
        <p className="tz-question">
          {confirm?.label} will disappear from the website order pages.
        </p>
        <p className="muted tz-hint">
          Orders already placed are not affected. You can turn it on again at
          any time.
        </p>
      </Modal>
    </>
  );
}
