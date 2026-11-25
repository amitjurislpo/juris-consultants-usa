"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { payOrderAction } from "./portal-actions";

/** "Pay now" for an order that has not been paid yet. */
export function PayButton({
  orderId,
  label,
  small = false,
}: {
  orderId: string;
  label: string;
  small?: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <span className="pt-pay">
      <button
        className={`pt-btn${small ? " pt-btn-sm" : ""}`}
        disabled={pending}
        onClick={() =>
          start(async () => {
            const result = await payOrderAction(orderId);
            setMessage(result.error);
            if (!result.error) router.push("/account/dashboard");
          })
        }
        type="button"
      >
        {pending ? "Processing..." : label}
      </button>
      {message ? (
        <span className="pt-error" role="alert">
          {message}
        </span>
      ) : null}
    </span>
  );
}
