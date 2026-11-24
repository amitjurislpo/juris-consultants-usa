"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { uploadKycAction, type PortalResult } from "./portal-actions";

const initial: PortalResult = { error: null, notice: null };

/** One "choose file + upload" control for a required document. */
export function KycUpload({
  docType,
  label,
  again,
}: {
  docType: string;
  label: string;
  /** True when an earlier upload was rejected. */
  again: boolean;
}) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(uploadKycAction, initial);

  useEffect(() => {
    if (state.notice) {
      form.current?.reset();
      router.refresh();
    }
  }, [state.notice, router]);

  return (
    <form action={action} className="pt-upload" ref={form}>
      <input name="docType" type="hidden" value={docType} />
      <label className="pt-file">
        <span className="pt-visually-hidden">Choose file for {label}</span>
        <input
          accept="application/pdf,image/jpeg,image/png"
          name="file"
          required
          type="file"
        />
      </label>
      <button className="pt-btn pt-btn-sm" disabled={pending} type="submit">
        {pending ? "Uploading..." : again ? "Upload again" : "Upload"}
      </button>
      {state.error ? (
        <p className="pt-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.notice ? (
        <p className="pt-ok" role="status">
          {state.notice}
        </p>
      ) : null}
    </form>
  );
}
