import { hasPermission } from "@juris/core";
import { prisma, type Prisma } from "@juris/db";
import { Badge, Button, Input, Select, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { requirePermission } from "../../../src/lib/guard";
import {
  LEAD_FLOWS,
  parseContactInfo,
  parseLeadFilters,
  type LeadFlowValue,
} from "../../../src/lib/leads";
import { maskEmail, maskPhone } from "../../../src/lib/mask";
import { pageCount, parseListParams } from "../../../src/lib/page";
import { markContactedAction } from "./actions";
import { Pager } from "./pager";
import { formatDateTime } from "../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../src/lib/timezone";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function leadWhere(q: string, flow: LeadFlowValue | null, source: string) {
  const where: Prisma.LeadWhereInput = {};
  if (flow) where.flow = flow;
  if (source) where.source = source;
  if (q) {
    const match = { contains: q, mode: "insensitive" as const };
    where.OR = [
      {
        contactInfo: {
          path: ["email"],
          string_contains: q,
        },
      },
      { contactInfo: { path: ["name"], string_contains: q } },
      { user: { email: match } },
      { user: { name: match } },
    ];
  }
  return where;
}

export default async function LeadsPage({
  searchParams,
}: Readonly<{ searchParams: SearchParams }>) {
  const user = await requirePermission("VIEW_CUSTOMERS");
  const timeZone = await getAdminTimeZone();
  const params = await searchParams;
  const { q, page, skip, take } = parseListParams(params);
  const { flow, source } = parseLeadFilters(params);
  const where = leadWhere(q, flow, source);
  const canNote = hasPermission(user.role, "MANAGE_NOTES");

  const [total, leads, sources] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: { user: { select: { id: true, email: true, role: true } } },
    }),
    prisma.lead.findMany({
      where: { source: { not: null } },
      distinct: ["source"],
      select: { source: true },
      orderBy: { source: "asc" },
      take: 50,
    }),
  ]);

  const contacts = await prisma.note.findMany({
    where: { leadId: { in: leads.map((lead) => lead.id) } },
    orderBy: { createdAt: "desc" },
    select: { leadId: true, createdAt: true, body: true },
  });
  const lastContact = new Map<string, { at: Date; note: string }>();
  for (const row of contacts) {
    if (!row.leadId || lastContact.has(row.leadId)) continue;
    lastContact.set(row.leadId, { at: row.createdAt, note: row.body });
  }

  return (
    <>
      <h1>Leads</h1>
      <p className="muted">
        People who signed in or started checkout. Follow up with those who did
        not pay.
      </p>
      <form className="filters" method="get">
        <Input
          name="q"
          label="Search name or email"
          defaultValue={q}
          maxLength={100}
        />
        <Select name="flow" label="Flow" defaultValue={flow ?? ""}>
          <option value="">All flows</option>
          {LEAD_FLOWS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select name="source" label="Source" defaultValue={source}>
          <option value="">All sources</option>
          {sources.map((row) => (
            <option key={row.source} value={row.source ?? ""}>
              {row.source}
            </option>
          ))}
        </Select>
        <Button type="submit">Filter</Button>
      </form>

      {leads.length === 0 ? (
        <p className="muted">No leads match.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Contact</th>
                <th>Flow</th>
                <th>Step</th>
                <th>Picked</th>
                <th>Source</th>
                <th>Created</th>
                <th>Follow-up</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const info = parseContactInfo(lead.contactInfo);
                const email = info.email || lead.user?.email || "";
                const contacted = lastContact.get(lead.id);
                return (
                  <tr key={lead.id}>
                    <td>
                      <strong>{info.name || "No name"}</strong>
                      <br />
                      {maskEmail(email)}
                      <br />
                      {maskPhone(info.phone)}
                      {lead.user?.role === "CUSTOMER" ? (
                        <>
                          <br />
                          <Link href={`/customers/${lead.user.id}`}>
                            View customer
                          </Link>
                        </>
                      ) : null}
                    </td>
                    <td>{lead.flow}</td>
                    <td>{lead.stepReached}</td>
                    <td>
                      {[info.plan, info.state].filter(Boolean).join(" / ") ||
                        "Nothing yet"}
                      {info.add.length > 0 ? (
                        <>
                          <br />
                          <span className="muted">+ {info.add.join(", ")}</span>
                        </>
                      ) : null}
                    </td>
                    <td>{lead.source ?? ""}</td>
                    <td>{formatDateTime(lead.createdAt, timeZone)}</td>
                    <td>
                      {contacted ? (
                        <>
                          <Badge variant="success">Contacted</Badge>
                          <br />
                          <span className="muted">
                            {formatDateTime(contacted.at, timeZone)}
                            {contacted.note ? `: ${contacted.note}` : ""}
                          </span>
                        </>
                      ) : null}
                      {canNote ? (
                        <form
                          action={markContactedAction}
                          className="inline-form"
                        >
                          <input type="hidden" name="id" value={lead.id} />
                          <Input
                            name="body"
                            aria-label="Contact note"
                            placeholder="Note, for example: called"
                            required
                            maxLength={2000}
                          />
                          <Button type="submit" size="sm" variant="outline">
                            Mark contacted
                          </Button>
                        </form>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Pager
        basePath="/leads"
        query={{ q, flow, source }}
        page={page}
        pages={pageCount(total)}
      />
    </>
  );
}
