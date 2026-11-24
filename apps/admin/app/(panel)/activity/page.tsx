import { prisma } from "@juris/db";
import { Button, Card, Input, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import {
  activitySkip,
  activityWhere,
  parseActivityFilters,
} from "../../../src/lib/activity-filters";
import { requirePermission } from "../../../src/lib/guard";
import { PAGE_SIZE, pageCount } from "../../../src/lib/page";
import { formatDateTime } from "../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../src/lib/timezone";

const MAX_DETAIL_LENGTH = 600;

function detail(before: unknown, after: unknown): string {
  const parts = [
    before === null ? null : `before: ${JSON.stringify(before)}`,
    after === null ? null : `after: ${JSON.stringify(after)}`,
  ].filter(Boolean);
  const text = parts.join("\n");
  return text.length > MAX_DETAIL_LENGTH
    ? `${text.slice(0, MAX_DETAIL_LENGTH)}...`
    : text;
}

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePermission("MANAGE_ADMIN_USERS");
  const timeZone = await getAdminTimeZone();
  const params = await searchParams;
  const filters = parseActivityFilters(params, timeZone);
  const where = activityWhere(filters);

  const [total, rows] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      orderBy: { at: "desc" },
      skip: activitySkip(filters.page),
      take: PAGE_SIZE,
      include: { actor: { select: { email: true } } },
    }),
  ]);
  const pages = pageCount(total);

  const link = (page: number) => {
    const query = new URLSearchParams();
    for (const key of ["actor", "action", "entity", "from", "to"] as const) {
      const value = params[key];
      const text = Array.isArray(value) ? value[0] : value;
      if (text) query.set(key, text);
    }
    query.set("page", String(page));
    return `/activity?${query.toString()}`;
  };

  return (
    <div className="stack">
      <h1>Activity log</h1>
      <p className="mg-note" role="note">
        A permanent record of changes and sign-in attempts. Entries cannot be
        edited or deleted.
      </p>

      <Card solid className="mg-card">
        <form method="get" className="mg-form">
          <div className="mg-filters">
            <Input
              label="Who (email)"
              name="actor"
              defaultValue={filters.actor}
            />
            <Input label="Action" name="action" defaultValue={filters.action} />
            <Input label="Entity" name="entity" defaultValue={filters.entity} />
            <Input
              label="From"
              name="from"
              type="date"
              defaultValue={
                Array.isArray(params.from) ? params.from[0] : params.from
              }
            />
            <Input
              label="To"
              name="to"
              type="date"
              defaultValue={Array.isArray(params.to) ? params.to[0] : params.to}
            />
          </div>
          <div className="mg-actions">
            <Button type="submit" size="sm">
              Filter
            </Button>
            <Link href="/activity">Clear</Link>
          </div>
        </form>
      </Card>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>When</th>
              <th>Who</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5}>No entries match.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{formatDateTime(row.at, timeZone)}</td>
                  <td>{row.actor?.email ?? "System"}</td>
                  <td>{row.action}</td>
                  <td>
                    {row.entity}
                    <br />
                    <span className="muted">{row.entityId}</span>
                  </td>
                  <td>
                    <pre className="mg-meta">
                      {detail(row.before, row.after)}
                    </pre>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      <div className="mg-pager">
        {filters.page > 1 ? (
          <Link href={link(filters.page - 1)}>Previous</Link>
        ) : (
          <span />
        )}
        <span className="muted">
          Page {Math.min(filters.page, pages)} of {pages} ({total} entries)
        </span>
        {filters.page < pages ? (
          <Link href={link(filters.page + 1)}>Next</Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
