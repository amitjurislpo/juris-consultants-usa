"use client";

import { Button, Select } from "@juris/ui";
import { useActionState } from "react";
import { assignOrderAction, type OrderFormState } from "./actions";

const initial: OrderFormState = { error: null, done: false };

export function AssignForm({
  orderId,
  current,
  staff,
}: {
  orderId: string;
  current: string | null;
  staff: { id: string; label: string }[];
}) {
  const [state, action, pending] = useActionState(assignOrderAction, initial);
  return (
    <form action={action} className="stack">
      <input type="hidden" name="orderId" value={orderId} />
      <Select
        defaultValue={current ?? ""}
        label="Assigned to"
        name="assigneeId"
      >
        <option value="">Unassigned</option>
        {staff.map((person) => (
          <option key={person.id} value={person.id}>
            {person.label}
          </option>
        ))}
      </Select>
      {state.error ? (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.done ? <p className="muted">Saved.</p> : null}
      <Button disabled={pending} type="submit">
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
