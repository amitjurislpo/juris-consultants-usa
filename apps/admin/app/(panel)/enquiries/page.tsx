import { hasPermission } from "@juris/core";
import { prisma, type Prisma } from "@juris/db";
import { Badge, Button, Input, Select, Table, TableContainer } from "@juris/ui";
import { formatDateTime } from "../../../src/lib/datetime";
import { requirePermission } from "../../../src/lib/guard";
import { pageCount, parseListParams } from "../../../src/lib/page";
import { getAdminTimeZone } from "../../../src/lib/timezone";
import { Pager } from "../leads/pager";
import { setEnquiryStatusAction } from "./actions";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function pick(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function EnquiriesPage({
  searchParams,
}: Readonly<{ searchParams: SearchParams }>) {
  const user = await requirePermission("VIEW_CUSTOMERS");
  const timeZone = await getAdminTimeZone();
  const params = await searchParams;
  const { q, page, skip, take } = parseListParams(params);
  const rawStatus = pick(params.status);
  const status =
    rawStatus === "NEW" || rawStatus === "HANDLED" ? rawStatus : "";
  const canEdit = hasPermission(user.role, "MANAGE_NOTES");

  const where: Prisma.EnquiryWhereInput = {};
  if (status) where.status = status;
  if (q) {
    const match = { contains: q, mode: "insensitive" as const };
    where.OR = [{ name: match }, { email: match }, { message: match }];
  }

  const [total, newCount, rows] = await Promise.all([
    prisma.enquiry.count({ where }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  return (
    <>
      <h1>Enquiries</h1>
      <p className="muted">
        Messages sent from the website&apos;s &quot;Send us a message&quot;
        form. {newCount} new.
      </p>
      <form className="filters" method="get">
        <Input
          name="q"
          label="Search name, email or message"
          defaultValue={q}
          maxLength={100}
        />
        <Select name="status" label="Status" defaultValue={status}>
          <option value="">All</option>
          <option value="NEW">New</option>
          <option value="HANDLED">Handled</option>
        </Select>
        <Button type="submit">Filter</Button>
      </form>

      {rows.length === 0 ? (
        <p className="muted">No enquiries match.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Received</th>
                <th>From</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td data-label="Received">
                    {formatDateTime(row.createdAt, timeZone)}
                  </td>
                  <td data-label="From">
                    <strong>{row.name}</strong>
                    <br />
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                    {row.phone ? (
                      <>
                        <br />
                        {row.phone}
                      </>
                    ) : null}
                  </td>
                  <td data-label="Message" style={{ whiteSpace: "pre-wrap" }}>
                    {row.message}
                  </td>
                  <td data-label="Status">
                    {row.status === "NEW" ? (
                      <Badge variant="warning">New</Badge>
                    ) : (
                      <>
                        <Badge variant="success">Handled</Badge>
                        {row.handledAt ? (
                          <>
                            <br />
                            <span className="muted">
                              {formatDateTime(row.handledAt, timeZone)}
                            </span>
                          </>
                        ) : null}
                      </>
                    )}
                    {canEdit ? (
                      <form action={setEnquiryStatusAction}>
                        <input type="hidden" name="id" value={row.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={row.status === "NEW" ? "HANDLED" : "NEW"}
                        />
                        <Button size="sm" type="submit" variant="outline">
                          {row.status === "NEW"
                            ? "Mark handled"
                            : "Mark as new"}
                        </Button>
                      </form>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Pager
        basePath="/enquiries"
        query={{ q, status }}
        page={page}
        pages={pageCount(total)}
      />
    </>
  );
}
