import { writeAudit } from "../../../../src/lib/audit";
import { parseRange, periodFor } from "../../../../src/lib/dashboard";
import { loadOrdersForExport } from "../../../../src/lib/dashboard-data";
import { csvResponse, toCsv } from "../../../../src/lib/export-csv";
import { requirePermission } from "../../../../src/lib/guard";
import { EXPORT_ROW_LIMIT } from "../limits";

/** CSV of the orders created in the dashboard's date range. Super admin only. */
export async function GET(request: Request): Promise<Response> {
  const admin = await requirePermission("EXPORT_DATA");
  const days = parseRange(new URL(request.url).searchParams.get("range") ?? "");
  const orders = await loadOrdersForExport(
    periodFor(new Date(), days),
    EXPORT_ROW_LIMIT,
  );
  const csv = toCsv(
    [
      "Order ID",
      "Created",
      "Paid",
      "Status",
      "Kind",
      "Total",
      "Currency",
      "Customer email",
      "Customer name",
      "Customer country",
      "Company",
      "State",
    ],
    orders.map((o) => [
      o.id,
      o.createdAt,
      o.paidAt,
      o.status,
      o.kind,
      o.totalUsd.toFixed(2),
      o.currency,
      o.user.email,
      o.user.name,
      o.user.country,
      o.company?.name,
      o.company?.state,
    ]),
  );
  await writeAudit({
    actorId: admin.id,
    action: "EXPORT_ORDERS",
    entity: "Export",
    entityId: `dashboard-${days}d`,
    meta: { rows: orders.length, days },
  });
  return csvResponse(
    `orders-last-${days}-days-${new Date().toISOString().slice(0, 10)}.csv`,
    csv,
  );
}
