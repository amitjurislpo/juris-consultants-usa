import { prisma } from "@juris/db";
import { DCard } from "@juris/ui/dashboard";
import { requirePermission } from "../../../src/lib/guard";
import { stateAbbr, stateLabel } from "../../../src/lib/dashboard";
import { StateToggles } from "../state-toggles";

export const metadata = { title: "States on/off" };

export default async function StatesPage() {
  await requirePermission("EDIT_SETTINGS");
  const [fees, grouped] = await Promise.all([
    prisma.stateFee.findMany({ orderBy: { state: "asc" } }),
    prisma.company.groupBy({
      by: ["state"],
      where: { orders: { some: { status: { not: "DRAFT" } } } },
      _count: { _all: true },
    }),
  ]);
  const counts = new Map(
    grouped.map((g) => [g.state as string, g._count._all]),
  );
  return (
    <>
      <h1>States on/off</h1>
      <p className="muted" style={{ marginBottom: 16 }}>
        Choose which states customers can pick on the website. Fees are edited
        in Settings.
      </p>
      <DCard>
        <StateToggles
          canEdit
          rows={fees.map((f) => ({
            code: f.state as string,
            label: stateLabel(f.state),
            abbr: stateAbbr(f.state),
            orders: counts.get(f.state) ?? 0,
            active: f.active,
          }))}
        />
      </DCard>
    </>
  );
}
