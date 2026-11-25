import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Start your US company | Juris Consultants USA",
  description: "Tell us about you, choose a plan and review your order.",
};
export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Login is checked on the server so a logged-out visitor goes straight to
  // /login (no form flash) and a logged-in customer is not asked for details
  // we already have.
  const session = await auth().catch(() => null);
  if (!session?.user?.id) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(await searchParams)) {
      if (typeof value === "string") query.set(key, value);
    }
    const qs = query.toString();
    redirect(
      `/login?next=${encodeURIComponent(qs ? `/start?${qs}` : "/start")}`,
    );
  }

  return (
    <FinalPage
      account={{
        name: session.user.name ?? "",
        email: session.user.email ?? "",
      }}
      html={FINAL_PAGES.start}
      page="start"
    />
  );
}
