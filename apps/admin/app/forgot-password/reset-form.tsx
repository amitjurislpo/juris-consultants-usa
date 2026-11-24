"use client";

import { Button, Input, OtpInput, ResendCodeButton } from "@juris/ui";
import Link from "next/link";
import { useActionState, useState } from "react";
import type { FormState } from "../login/actions";
import { requestResetCodeAction, resetPasswordAction } from "./actions";

const initial: FormState = { error: null };

export function ResetForm() {
  const [codeState, requestCode, sending] = useActionState(
    requestResetCodeAction,
    initial,
  );
  const [resetState, reset, resetting] = useActionState(
    resetPasswordAction,
    initial,
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  if (resetState.notice && !resetState.error) {
    return (
      <div className="stack">
        <p role="status">{resetState.notice}</p>
        <Link href="/login">Go to sign in</Link>
      </div>
    );
  }

  if (!codeState.notice) {
    return (
      <form action={requestCode} className="stack" noValidate>
        <Input
          label="Admin email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {codeState.error ? (
          <p role="alert" className="form-error">
            {codeState.error}
          </p>
        ) : null}
        <Button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Email me a reset code"}
        </Button>
        <p className="muted">
          <Link href="/login">Back to sign in</Link>
        </p>
      </form>
    );
  }

  return (
    <form action={reset} className="stack" noValidate>
      <p role="status">{codeState.notice}</p>
      <input type="hidden" name="email" value={email} />
      <div className="ui-field">
        <span className="ui-label">Email code</span>
        <OtpInput autoFocus name="otpCode" onChange={setCode} value={code} />
        <span className="ui-field-helper">6 digits, numbers only.</span>
      </div>
      <Input
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        helperText="At least 12 characters."
        required
      />
      {resetState.error ? (
        <p role="alert" className="form-error">
          {resetState.error}
        </p>
      ) : null}
      <Button type="submit" disabled={resetting || code.length !== 6}>
        {resetting ? "Saving..." : "Set new password"}
      </Button>
      <ResendCodeButton
        onResend={async () => {
          const data = new FormData();
          data.set("email", email);
          const result = await requestResetCodeAction(initial, data);
          setCode("");
          return result.error ?? undefined;
        }}
      />
    </form>
  );
}
