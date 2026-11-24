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

  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    take: EXPORT_ROW_LIMIT,
    include: { _count: { select: { orders: true } } },
  });

  const csv = toCsv(
    [
      "Customer ID",
      "Created",
      "Status",
      "Email",
      "Name",
      "Phone",
      "Country",
      "Orders",
    ],
    customers.map((customer) => [
      customer.id,
      customer.createdAt,
      customer.status,
      customer.email,
      customer.name,
      customer.phone,
      customer.country,
      customer._count.orders,
    ]),
  );

  await writeAudit({
    actorId: admin.id,
    action: "EXPORT_CUSTOMERS",
    entity: "Export",
    entityId: "customers",
    meta: { rows: customers.length },
  });
  return csvResponse(
    `customers-${new Date().toISOString().slice(0, 10)}.csv`,
    csv,
  );
}
