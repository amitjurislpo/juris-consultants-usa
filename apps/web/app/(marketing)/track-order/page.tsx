import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { FinalPage } from "../../../components/marketing/final/Shell";
import { FINAL_PAGES } from "../../../components/marketing/final/generated";

export const metadata: Metadata = {
  title: "Track your order | Juris Consultants USA",
  description: "See live progress for your US company formation.",
  robots: { index: false },
};
export const dynamic = "force-dynamic";

export default async function Page() {
  // Only signed-in customers can open their dashboard.
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login?next=/track-order");
  return <FinalPage html={FINAL_PAGES.track} page="track" />;
}
