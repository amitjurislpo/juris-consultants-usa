"use server";

import { signIn } from "../../../auth";
import { safeNext } from "../../../src/lib/safe-next";

export type VerifyResult = { ok: true } | { ok: false; error: string };

export async function verifyCode(
  email: string,
  code: string,
): Promise<VerifyResult> {
  try {
    await signIn("email-otp", { email, code, redirect: false });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "That code is not valid or has expired. Request a new one.",
    };
  }
}

export async function googleSignIn(formData: FormData) {
  await signIn("google", {
    redirectTo: safeNext(String(formData.get("next") ?? "")),
  });
}
