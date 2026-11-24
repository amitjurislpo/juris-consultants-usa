import { Button, Card } from "@juris/ui";
import { requirePermission, requireRecentAuth } from "../../../src/lib/guard";
import { EXPORT_ROW_LIMIT } from "./limits";

const EXPORTS = [
  {
    href: "/export/orders",
    title: "Orders",
    text: "Every order with status, totals, customer, company and the items bought at their purchase-time prices.",
  },
  {
    href: "/export/customers",
    title: "Customers",
    text: "Every customer account with contact details and number of orders.",
  },
];

export default async function ExportPage() {
  await requirePermission("EXPORT_DATA");
  await requireRecentAuth("/export");

  return (
    <div className="stack">
      <h1>Export</h1>
      <p className="mg-note" role="note">
        Files contain full, unmasked email and phone numbers. Store them safely
        and delete them when finished. Each export is written to the activity
        log. Up to {EXPORT_ROW_LIMIT.toLocaleString("en-US")} newest rows are
        included.
      </p>
      {EXPORTS.map((item) => (
        <Card key={item.href} solid className="mg-card">
          <h2 className="mg-card-title">{item.title}</h2>
          <p className="muted">{item.text}</p>
          <form method="post" action={item.href}>
            <Button type="submit" size="sm">
              Download CSV
            </Button>
          </form>
        </Card>
      ))}
    </div>
  );
}
