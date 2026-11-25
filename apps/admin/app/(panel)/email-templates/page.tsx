import { requirePermission } from "../../../src/lib/guard";
import { ComingSoon } from "../coming-soon";

export const metadata = { title: "Email templates" };

export default async function Page() {
  await requirePermission("EDIT_SETTINGS");
  return <ComingSoon title="Email templates" />;
}
