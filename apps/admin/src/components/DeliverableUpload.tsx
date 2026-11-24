"use client";

import { Button, Input } from "@juris/ui";
import { useActionState } from "react";
import {
  uploadDeliverableAction,
  type DeliverableState,
} from "../lib/deliverables-actions";

const initial: DeliverableState = { error: null, done: false };

/** Upload form for a finished document. Mount it on the order page with the order id. */
export function DeliverableUpload({ orderId }: Readonly<{ orderId: string }>) {
  const [state, action, pending] = useActionState(
    uploadDeliverableAction,
    initial,
  );

  return (
    <form action={action} className="stack">
      <input type="hidden" name="orderId" value={orderId} />
      <Input
        label="Document name"
        name="type"
        maxLength={80}
        helperText="For example: Certificate of formation, EIN letter."
        required
      />
      <Input
        label="File"
        name="file"
        type="file"
        accept="application/pdf,image/png,image/jpeg"
        helperText="PDF, PNG or JPG, up to 15 MB. The customer is emailed."
        required
      />
      {state.error ? (
        <p role="alert" className="form-error">
          {state.error}
        </p>
      ) : null}
      {state.done ? (
        <p role="status" className="muted">
          Uploaded. The customer has been emailed.
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Uploading..." : "Upload document"}
      </Button>
    </form>
  );
}
