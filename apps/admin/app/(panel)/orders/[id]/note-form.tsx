"use client";

import { Button } from "@juris/ui";
import { useActionState, useEffect, useRef } from "react";
import { addNoteAction, type OrderFormState } from "./actions";

const initial: OrderFormState = { error: null, done: false };

export function NoteForm({ orderId }: { orderId: string }) {
  const [state, action, pending] = useActionState(addNoteAction, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.done) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="stack">
      <input type="hidden" name="orderId" value={orderId} />
      <div className="ui-field">
        <label className="ui-label" htmlFor="note-body">
          Add an internal note (never shown to the customer)
        </label>
        <textarea
          id="note-body"
          name="body"
          className="ui-input"
          rows={3}
          maxLength={2000}
          required
        />
      </div>
      {state.error ? (
        <p role="alert" className="form-error">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Saving..." : "Add note"}
      </Button>
    </form>
  );
}
