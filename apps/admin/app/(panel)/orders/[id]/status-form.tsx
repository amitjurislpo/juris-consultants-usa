"use client";

import { Button, Select } from "@juris/ui";
import { useActionState, useState } from "react";
import { changeStatusAction, type OrderFormState } from "./actions";

export interface StatusOption {
  value: string;
  label: string;
  needsReason: boolean;
}

const initial: OrderFormState = { error: null, done: false };

export function StatusForm({
  orderId,
  options,
}: {
  orderId: string;
  options: StatusOption[];
}) {
  const [state, action, pending] = useActionState(changeStatusAction, initial);
  const [to, setTo] = useState("");
  const reasonRequired = options.some(
    (option) => option.value === to && option.needsReason,
  );

  if (options.length === 0) {
    return (
      <p className="muted">
        No status change is available right now. Some steps open only after the
        customer details and every KYC document are complete.
      </p>
    );
  }

  return (
    <form action={action} className="stack">
      <input type="hidden" name="orderId" value={orderId} />
      <Select
        label="Move order to"
        name="to"
        value={to}
        onChange={(event) => setTo(event.target.value)}
        required
      >
        <option value="" disabled>
          Choose a status
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {reasonRequired ? (
        <div className="ui-field">
          <label className="ui-label" htmlFor="status-reason">
            Reason for the customer (sent by email)
          </label>
          <textarea
            id="status-reason"
            name="reason"
            className="ui-input"
            rows={3}
            maxLength={1000}
            required
          />
        </div>
      ) : null}
      {state.error ? (
        <p role="alert" className="form-error">
          {state.error}
        </p>
      ) : null}
      {state.done ? <p className="muted">Status updated.</p> : null}
      <Button type="submit" disabled={pending || to === ""}>
        {pending ? "Saving..." : "Change status"}
      </Button>
    </form>
  );
}
