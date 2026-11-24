import { hasPermission, type Permission } from "@juris/core";
import { prisma } from "@juris/db";
import { Card } from "@juris/ui";
import Link from "next/link";
import { requirePermission } from "../../src/lib/guard";

interface Tile {
  label: string;
  href: string;
  permission: Permission;
  count: () => Promise<number>;
}

export default async function DashboardPage() {
  const user = await requirePermission("VIEW_ORDERS");

  const allTiles: Tile[] = [
    {
      label: "New paid orders",
      href: "/orders?status=PAID",
      permission: "VIEW_ORDERS",
      count: () => prisma.order.count({ where: { status: "PAID" } }),
    },
    {
      label: "Waiting for customer details",
      href: "/orders?status=DETAILS_PENDING",
      permission: "VIEW_ORDERS",
      count: () => prisma.order.count({ where: { status: "DETAILS_PENDING" } }),
    },
    {
      label: "KYC documents to review",
      href: "/kyc",
      permission: "REVIEW_KYC",
      count: () => prisma.kycDocument.count({ where: { status: "PENDING" } }),
    },
    {
      label: "Failed payments",
      href: "/payments?status=FAILED",
      permission: "VIEW_ORDERS",
      count: () => prisma.payment.count({ where: { status: "FAILED" } }),
    },
  ];
  const tiles = allTiles.filter((tile) =>
    hasPermission(user.role, tile.permission),
  );
  const counts = await Promise.all(tiles.map((tile) => tile.count()));

  return (
    <>
      <h1>Dashboard</h1>
      <div className="tiles">
        {tiles.map((tile, index) => (
          <Link key={tile.href} href={tile.href} className="tile-link">
            <Card solid hover>
              <p className="tile-count">{counts[index]}</p>
              <p className="muted">{tile.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
