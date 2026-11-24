"use client";

import { useState, type FormEvent } from "react";
import { verifyCode } from "./actions";

const EMAIL_RE =
  /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

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
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("code");
        setMsg(
          "We sent an 8-digit code to your email. It expires in 10 minutes.",
        );
      } else {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setMsg(data?.error ?? "We could not send a code right now. Try again.");
      }
    } catch {
      setMsg("We could not send a code right now. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const result = await verifyCode(email, code.trim());
    if (result.ok) {
      window.location.href = next;
      return;
    }
    setMsg(result.error);
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
          <label className="req" htmlFor="lgCode">
            8-digit code sent to {email}
          </label>
          <input
            autoComplete="one-time-code"
            id="lgCode"
            inputMode="numeric"
            maxLength={8}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            pattern="\d{8}"
            required
            value={code}
          />
        </div>
      )}
      {msg ? (
        <p aria-live="polite" className="muted" style={{ fontSize: 14 }}>
          {msg}
        </p>
      ) : null}
      <button className="btn btn-primary btn-lg" disabled={busy} type="submit">
        {step === "email" ? "Email me a code" : "Log in"}
      </button>
      {step === "code" ? (
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
      ) : null}
    </form>
  );
}
