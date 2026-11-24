import type { Metadata } from "next";
import { prisma } from "@juris/db";
import { redirect } from "next/navigation";
import { auth, signOut } from "../../../auth";

export const metadata: Metadata = {
  title: "My account | Juris Consultants USA",
  robots: { index: false },
};
export const dynamic = "force-dynamic";

async function logOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function Page() {
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login?next=/account");

  // Customers only ever see their own record (filtered by the session user id).
  const user = await prisma.user
    .findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        name: true,
        phone: true,
        country: true,
        orders: {
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            kind: true,
            status: true,
            totalUsd: true,
            createdAt: true,
          },
        },
      },
    })
    .catch(() => null);

  return (
    <main data-page="auth" id="app">
      <section className="sec soft" style={{ minHeight: "70vh" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <div>
              <span className="eyebrow">My account</span>
              <h1 style={{ fontSize: 34, marginTop: 6 }}>
                Hello{user?.name ? `, ${user.name}` : ""}
              </h1>
            </div>
            <form action={logOut}>
              <button className="btn btn-outline btn-sm" type="submit">
                Log out
              </button>
            </form>
          </div>
          <div className="acct-grid" style={{ padding: 0 }}>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>Your details</h3>
              <div className="acct-row">
                <span>Email</span>
                <span>{user?.email ?? session.user.email}</span>
              </div>
              <div className="acct-row">
                <span>Name</span>
                <span>{user?.name ?? "—"}</span>
              </div>
              <div className="acct-row">
                <span>Phone</span>
                <span>{user?.phone ?? "—"}</span>
              </div>
              <div className="acct-row">
                <span>Country</span>
                <span>{user?.country ?? "—"}</span>
              </div>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>Your orders</h3>
              {user?.orders.length ? (
                user.orders.map((o) => (
                  <div className="acct-row" key={o.id}>
                    <span>
                      {o.kind} · {o.createdAt.toLocaleDateString("en-US")}
                    </span>
                    <span>
                      ${o.totalUsd.toString()} · {o.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="muted">
                  {user
                    ? "No orders yet."
                    : "We could not load your orders right now."}
                </p>
              )}
              <a
                className="btn btn-primary btn-sm"
                href="/start?flow=start"
                style={{ marginTop: 14 }}
              >
                Start a new order
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
