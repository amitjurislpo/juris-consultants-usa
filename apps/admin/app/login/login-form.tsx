"use client";

import { Button, Input, OtpInput, ResendCodeButton } from "@juris/ui";
import Link from "next/link";
import { useActionState, useState } from "react";
import { loginAction, requestLoginCodeAction, type FormState } from "./actions";

const initial: FormState = { error: null };

export function LoginForm() {
  const [codeState, requestCode, sending] = useActionState(
    requestLoginCodeAction,
    initial,
  );
  const [loginState, login, signingIn] = useActionState(loginAction, initial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const codeSent = codeState.error === null && codeState.notice;

  if (!codeSent) {
    return (
      <form action={requestCode} className="stack" noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {codeState.error ? (
          <p role="alert" className="form-error">
            {codeState.error}
          </p>
        ) : null}
        <Button type="submit" disabled={sending}>
          {sending ? "Sending code..." : "Email me a code"}
        </Button>
        <p className="muted">
          <Link href="/forgot-password">Forgot password?</Link>
        </p>
      </form>
    );
  }

  return (
    <form action={login} className="stack" noValidate>
      <p role="status">{codeState.notice}</p>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="password" value={password} />
      <div className="ui-field">
        <span className="ui-label">Email code</span>
        <OtpInput autoFocus name="otpCode" onChange={setCode} value={code} />
        <span className="ui-field-helper">
          The 6-digit code we just emailed you. Numbers only.
        </span>
      </div>
      {loginState.error ? (
        <p role="alert" className="form-error">
          {loginState.error}
        </p>
      ) : null}
      <Button type="submit" disabled={signingIn || code.length !== 6}>
        {signingIn ? "Signing in..." : "Sign in"}
      </Button>
      <ResendCodeButton
        onResend={async () => {
          const data = new FormData();
          data.set("email", email);
          data.set("password", password);
          const result = await requestLoginCodeAction(initial, data);
          setCode("");
          return result.error ?? undefined;
        }}
      />
    </form>
  );
}
