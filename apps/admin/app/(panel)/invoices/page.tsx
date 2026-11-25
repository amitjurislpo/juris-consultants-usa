import { requirePermission } from "../../../src/lib/guard";
import { ComingSoon } from "../coming-soon";

export const metadata = { title: "Invoices" };

export default async function Page() {
  await requirePermission("VIEW_ORDERS");
  return <ComingSoon title="Invoices" />;
}
