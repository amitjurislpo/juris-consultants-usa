"use client";

import { Button } from "@juris/ui";
import { useActionState } from "react";
import { approveKycAction, rejectKycAction, type ReviewState } from "./actions";

const initial: ReviewState = { error: null };

export function ReviewForms({ id }: Readonly<{ id: string }>) {
  const [approveState, approve, approving] = useActionState(
    approveKycAction,
    initial,
  );
  const [rejectState, reject, rejecting] = useActionState(
    rejectKycAction,
    initial,
  );
  const busy = approving || rejecting;

  return (
    <div className="kyc-actions">
      <form action={approve} className="stack">
        <input type="hidden" name="id" value={id} />
        {approveState.error ? (
          <p role="alert" className="form-error">
            {approveState.error}
          </p>
        ) : null}
        <Button type="submit" disabled={busy}>
          {approving ? "Approving..." : "Approve document"}
        </Button>
      </form>
      <form action={reject} className="stack">
        <input type="hidden" name="id" value={id} />
        <div className="ui-field">
          <label className="ui-label" htmlFor="reason">
            Reason for rejection
          </label>
          <textarea
            id="reason"
            name="reason"
            className="ui-input"
            rows={4}
            maxLength={500}
            required
          />
          <span className="ui-field-helper">
            The customer receives this reason by email and must upload again.
          </span>
        </div>
        {rejectState.error ? (
          <p role="alert" className="form-error">
            {rejectState.error}
          </p>
        ) : null}
        <Button type="submit" variant="danger" disabled={busy}>
          {rejecting ? "Rejecting..." : "Reject and email customer"}
        </Button>
      </form>
    </div>
  );
}
