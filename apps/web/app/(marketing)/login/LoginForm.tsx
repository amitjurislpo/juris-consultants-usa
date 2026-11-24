"use client";

import { OtpInput, ResendCodeButton } from "@juris/ui";
import { useState, type FormEvent } from "react";
import { verifyCode } from "./actions";

const EMAIL_RE =
  /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

const SENT_MESSAGE =
  "We sent a 6-digit code to your email. It expires in 10 minutes.";

async function requestCode(email: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) return null;
    const data = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    return data?.error ?? "We could not send a code right now. Try again.";
  } catch {
    return "We could not send a code right now. Try again.";
  }
}

export function LoginForm({ next }: { next: string }) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function sendCode(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setMsg("Please enter a valid email address, e.g. name@company.com.");
      return;
    }
    setBusy(true);
    setMsg("");
    const error = await requestCode(email.trim());
    if (error) {
      setMsg(error);
    } else {
      setStep("code");
      setMsg(SENT_MESSAGE);
    }
    setBusy(false);
  }

  async function submitCode(e?: FormEvent) {
    e?.preventDefault();
    if (code.length !== 6) {
      setMsg("Enter all 6 digits of the code.");
      return;
    }
    setBusy(true);
    setMsg("");
    const result = await verifyCode(email.trim(), code);
    if (result.ok) {
      window.location.href = next;
      return;
    }
    setMsg(result.error);
    setCode("");
    setBusy(false);
  }

  return (
    <form
      className="card form"
      noValidate
      onSubmit={step === "email" ? sendCode : submitCode}
    >
      {step === "email" ? (
        <div className="field">
          <label className="req" htmlFor="lgEmail">
            Email
          </label>
          <input
            autoComplete="email"
            id="lgEmail"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            type="email"
            value={email}
          />
        </div>
      ) : (
        <div className="field">
          <label className="req">6-digit code sent to {email}</label>
          <OtpInput autoFocus disabled={busy} onChange={setCode} value={code} />
        </div>
      )}
      {msg ? (
        <p aria-live="polite" className="muted" style={{ fontSize: 14 }}>
          {msg}
        </p>
      ) : null}
      <button
        className="btn btn-primary btn-lg"
        disabled={busy || (step === "code" && code.length !== 6)}
        type="submit"
      >
        {step === "email" ? "Email me a code" : "Log in"}
      </button>
      {step === "code" ? (
        <>
          <ResendCodeButton
            className="btn btn-outline"
            onResend={async () => {
              setCode("");
              const error = await requestCode(email.trim());
              return error ?? undefined;
            }}
          />
          <button
            className="btn btn-outline"
            onClick={() => {
              setStep("email");
              setCode("");
              setMsg("");
            }}
            type="button"
          >
            Use a different email
          </button>
        </>
      ) : null}
    </form>
  );
}
