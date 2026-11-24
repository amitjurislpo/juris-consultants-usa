"use client";

import { useEffect, useState } from "react";

export interface ResendCodeButtonProps {
  /** Sends a fresh code. Return an error message to show, or nothing on success. */
  onResend: () => Promise<string | void>;
  /** Seconds to wait before the button works again. Match the server's cooldown. */
  cooldownSeconds?: number;
  /** Start the countdown straight away (use right after a code was sent). */
  startCoolingDown?: boolean;
  className?: string;
  label?: string;
}

/** "Resend code" button with a countdown, so people cannot spam the email. */
export function ResendCodeButton({
  onResend,
  cooldownSeconds = 30,
  startCoolingDown = true,
  className = "ui-button ui-button-outline",
  label = "Resend code",
}: ResendCodeButtonProps) {
  const [remaining, setRemaining] = useState(
    startCoolingDown ? cooldownSeconds : 0,
  );
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  async function resend() {
    setBusy(true);
    setMessage(null);
    try {
      const error = await onResend();
      if (error) {
        setMessage(error);
      } else {
        setMessage("A new code was sent.");
        setRemaining(cooldownSeconds);
      }
    } catch {
      setMessage("We could not send a code right now. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        className={className}
        disabled={busy || remaining > 0}
        onClick={resend}
        type="button"
      >
        {remaining > 0
          ? `${label} in ${remaining}s`
          : busy
            ? "Sending..."
            : label}
      </button>
      {message ? (
        <p aria-live="polite" className="muted" style={{ fontSize: 14 }}>
          {message}
        </p>
      ) : null}
    </>
  );
}
