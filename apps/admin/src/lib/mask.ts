/** "amit@example.com" -> "a***@example.com". Used on list pages only. */
export function maskEmail(email: string | null | undefined): string {
  if (!email) return "";
  const at = email.lastIndexOf("@");
  if (at < 1) return "***";
  return `${email.slice(0, 1)}***${email.slice(at)}`;
}

/** Keeps the last 4 digits and the original spacing: "+91 98765 43210" -> "+** ***** *3210". */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return "";
  const total = phone.replace(/\D/g, "").length;
  let seen = 0;
  return phone.replace(/\d/g, (digit) => {
    seen += 1;
    return total > 4 && seen > total - 4 ? digit : "*";
  });
}
