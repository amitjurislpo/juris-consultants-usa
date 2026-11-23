import { createHmac } from "node:crypto";

export function hashEmailOtp(
  email: string,
  code: string,
  secret: string,
): string {
  return createHmac("sha256", secret)
    .update(`${email.trim().toLowerCase()}:${code}`)
    .digest("hex");
}
