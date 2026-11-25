import { redirect } from "next/navigation";

/** The old portal home. The dashboard is now the landing page; Profile lives at /account/profile. */
export default function AccountIndex() {
  redirect("/account/dashboard");
}
