import { prisma } from "@juris/db";
import { writeAudit } from "../../../../src/lib/audit";
import { csvResponse, toCsv } from "../../../../src/lib/export-csv";
import {
  requirePermission,
  requireRecentAuth,
} from "../../../../src/lib/guard";
import { EXPORT_ROW_LIMIT } from "../limits";

export async function POST(): Promise<Response> {
  await requirePermission("EXPORT_DATA");
  const admin = await requireRecentAuth("/export");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: EXPORT_ROW_LIMIT,
    include: {
      user: { select: { email: true, name: true, phone: true, country: true } },
      company: { select: { name: true, state: true, entityType: true } },
      items: {
        select: { nameSnapshot: true, priceUsdSnapshot: true, qty: true },
      },
    },
  });

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
      "Customer phone",
      "Customer country",
      "Company",
      "State",
      "Entity type",
      "Items",
      "Tags",
    ],
    orders.map((order) => [
      order.id,
      order.createdAt,
      order.paidAt,
      order.status,
      order.kind,
      order.totalUsd.toFixed(2),
      order.currency,
      order.user.email,
      order.user.name,
      order.user.phone,
      order.user.country,
      order.company?.name,
      order.company?.state,
      order.company?.entityType,
      order.items
        .map(
          (item) =>
            `${item.nameSnapshot} x${item.qty} @ ${item.priceUsdSnapshot.toFixed(2)}`,
        )
        .join("; "),
      order.tags.join("; "),
    ]),
  );

  await writeAudit({
    actorId: admin.id,
    action: "EXPORT_ORDERS",
    entity: "Export",
    entityId: "orders",
    meta: { rows: orders.length },
  });
  return csvResponse(
    `orders-${new Date().toISOString().slice(0, 10)}.csv`,
    csv,
  );
}
