import { prisma, type Prisma } from "@juris/db";
import { Badge, Button, Input, Table, TableContainer } from "@juris/ui";
import Link from "next/link";
import { requirePermission } from "../../../src/lib/guard";
import { maskEmail, maskPhone } from "../../../src/lib/mask";
import { pageCount, parseListParams } from "../../../src/lib/page";
import { Pager } from "../leads/pager";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CustomersPage({
  searchParams,
}: Readonly<{ searchParams: SearchParams }>) {
  await requirePermission("VIEW_CUSTOMERS");
  const { q, page, skip, take } = parseListParams(await searchParams);

  const where: Prisma.UserWhereInput = { role: "CUSTOMER" };
  if (q) {
    const match = { contains: q, mode: "insensitive" as const };
    where.OR = [{ email: match }, { name: match }, { phone: match }];
  }

  const [total, customers] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        country: true,
        status: true,
        _count: { select: { orders: true } },
        orders: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { status: true },
        },
      },
    }),
  ]);

  return (
    <>
      <h1>Customers</h1>
      <form className="filters" method="get">
        <Input
          name="q"
          label="Search name, email or phone"
          defaultValue={q}
          maxLength={100}
        />
        <Button type="submit">Search</Button>
      </form>

      {customers.length === 0 ? (
        <p className="muted">No customers match.</p>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Country</th>
                <th>Orders</th>
                <th>Last order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <Link href={`/customers/${customer.id}`}>
                      {customer.name || "No name"}
                    </Link>
                    <br />
                    {maskEmail(customer.email)}
                    <br />
                    {maskPhone(customer.phone)}
                  </td>
                  <td>{customer.country ?? ""}</td>
                  <td>{customer._count.orders}</td>
                  <td>{customer.orders[0]?.status ?? "No orders"}</td>
                  <td>
                    <Badge
                      variant={
                        customer.status === "ACTIVE" ? "success" : "warning"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      <Pager
        basePath="/customers"
        query={{ q }}
        page={page}
        pages={pageCount(total)}
      />
    </>
  );
}
