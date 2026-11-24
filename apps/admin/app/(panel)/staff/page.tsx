import { prisma } from "@juris/db";
import { Badge, Card, Table, TableContainer } from "@juris/ui";
import { isBlocked } from "../../../src/lib/lockout";
import { requirePermission, requireRecentAuth } from "../../../src/lib/guard";
import { CreateStaffForm, StaffRowForm } from "./staff-forms";
import { formatDateTime } from "../../../src/lib/datetime";
import { getAdminTimeZone } from "../../../src/lib/timezone";

export default async function StaffPage() {
  await requirePermission("MANAGE_ADMIN_USERS");
  const admin = await requireRecentAuth("/staff");
  const timeZone = await getAdminTimeZone();

  const users = await prisma.user.findMany({
    where: { role: { in: ["STAFF", "SUPER_ADMIN"] } },
    orderBy: [{ role: "desc" }, { email: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  const locks = await prisma.adminLoginLock.findMany({
    where: { email: { in: users.map((user) => user.email) } },
  });
  const lockedEmails = new Set(
    locks
      .filter((lock) =>
        isBlocked(
          { failures: lock.failures, lockedUntil: lock.lockedUntil },
          new Date(),
        ),
      )
      .map((lock) => lock.email),
  );

  return (
    <div className="stack">
      <h1>Staff</h1>
      <p className="mg-note" role="note">
        Staff sign in with email, password and a code we email to them. You
        cannot demote or disable yourself, and one active super admin must
        always remain.
      </p>

      <Card solid className="mg-card">
        <h2 className="mg-card-title">Add a staff user</h2>
        <p className="muted">
          A strong temporary password is generated and shown once, right after
          you create the account. Staff can change it with "Forgot password".
        </p>
        <CreateStaffForm />
      </Card>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Person</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              if (user.role !== "STAFF" && user.role !== "SUPER_ADMIN") {
                return null;
              }
              return (
                <tr key={user.id}>
                  <td>
                    {user.name ?? "No name"}
                    <br />
                    <span className="muted">{user.email}</span>
                  </td>
                  <td>
                    <Badge variant="info">
                      {user.role === "SUPER_ADMIN" ? "Super admin" : "Staff"}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      variant={user.status === "ACTIVE" ? "success" : "danger"}
                    >
                      {user.status === "ACTIVE" ? "Active" : "Disabled"}
                    </Badge>
                    {lockedEmails.has(user.email) ? (
                      <>
                        {" "}
                        <Badge variant="danger">Sign-in blocked</Badge>
                      </>
                    ) : null}
                  </td>
                  <td>{formatDateTime(user.createdAt, timeZone)}</td>
                  <td>
                    <StaffRowForm
                      userId={user.id}
                      role={user.role}
                      active={user.status === "ACTIVE"}
                      isSelf={user.id === admin.id}
                      locked={lockedEmails.has(user.email)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
