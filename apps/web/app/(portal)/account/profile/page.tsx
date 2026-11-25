import { prisma } from "@juris/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import {
  addressLines,
  displayName,
  entityLabel,
  stateLabel,
} from "../../../../src/lib/portal";
import {
  companyIsEditable,
  customerTimeZone,
} from "../../../../src/lib/portal-server";
import { CompanyEditor, type EditableAddress } from "../company-editor";
import { EditableAvatar } from "../editable-avatar";
import { ProfileForm } from "../profile-form";
import { TimeZoneSelect } from "../timezone-select";

function addressFields(address: unknown): EditableAddress {
  const source =
    address && typeof address === "object"
      ? (address as Record<string, unknown>)
      : {};
  const pick = (key: string) =>
    typeof source[key] === "string" ? (source[key] as string) : "";
  return {
    line1: pick("line1"),
    line2: pick("line2"),
    city: pick("city"),
    state: pick("state"),
    zip: pick("zip"),
    country: pick("country"),
  };
}

export default async function ProfilePage() {
  const session = await auth().catch(() => null);
  if (!session?.user?.id) redirect("/login?next=/account/profile");

  // Only this customer's own rows, selected by the session id.
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      country: true,
      image: true,
      companies: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          state: true,
          entityType: true,
          ein: true,
          isExisting: true,
          address: true,
          members: {
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
              role: true,
              ownership: true,
              country: true,
            },
          },
        },
      },
    },
  });
  if (!user) redirect("/login?next=/account/profile");
  const name = displayName(user.name, user.email);
  const timeZone = await customerTimeZone(session.user.id);
  const editable = new Map<string, boolean>();
  for (const company of user.companies) {
    editable.set(company.id, await companyIsEditable(company.id));
  }

  return (
    <div className="pt-stack">
      <div className="pt-pagehead">
        <h1>Profile</h1>
        <p className="pt-muted">Your personal details and your business.</p>
      </div>

      <section className="pt-card">
        <div className="pt-profile-top">
          <EditableAvatar
            allowRemove
            image={user.image}
            name={name}
            size={88}
          />
          <div className="pt-profile-id">
            <h2>{name}</h2>
            <p className="pt-muted">{user.email}</p>
            <p className="pt-hint">
              Click the pencil on your picture to change it.
            </p>
          </div>
        </div>
        <ProfileForm
          country={user.country ?? ""}
          email={user.email}
          name={user.name ?? ""}
          phone={user.phone ?? ""}
        />
        <div className="pt-tz">
          <TimeZoneSelect current={timeZone} />
        </div>
      </section>

      <section className="pt-section">
        <h2 className="pt-h2">Business details</h2>
        {user.companies.length === 0 ? (
          <div className="pt-card pt-empty">
            <p>You have no business on your account yet.</p>
            <Link className="pt-btn" href="/start?flow=start">
              Start a new order
            </Link>
          </div>
        ) : (
          <div className="pt-grid">
            {user.companies.map((company) => {
              const lines = addressLines(company.address);
              const canEdit = editable.get(company.id) ?? false;
              return (
                <article className="pt-card" key={company.id}>
                  <h3 className="pt-h3">{company.name}</h3>
                  <dl className="pt-kv">
                    <div>
                      <dt>State</dt>
                      <dd>{stateLabel(company.state)}</dd>
                    </div>
                    <div>
                      <dt>Type</dt>
                      <dd>{entityLabel(company.entityType)}</dd>
                    </div>
                    <div>
                      <dt>EIN (US tax ID)</dt>
                      <dd>{company.ein ?? "Not received yet"}</dd>
                    </div>
                    <div>
                      <dt>Company</dt>
                      <dd>
                        {company.isExisting
                          ? "Existing company"
                          : "New company"}
                      </dd>
                    </div>
                    <div>
                      <dt>Address</dt>
                      <dd>{lines.length ? lines.join(", ") : "—"}</dd>
                    </div>
                  </dl>
                  <h4 className="pt-h4">Owners and members</h4>
                  {company.members.length === 0 ? (
                    <p className="pt-muted">No members added yet.</p>
                  ) : (
                    <ul className="pt-list">
                      {company.members.map((member) => (
                        <li key={member.id}>
                          <strong>{member.name}</strong>
                          <span>
                            {member.role}, {member.ownership.toString()}%,{" "}
                            {member.country}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {canEdit ? (
                    <details className="pt-edit">
                      <summary>Edit address and members</summary>
                      <CompanyEditor
                        address={addressFields(company.address)}
                        companyId={company.id}
                        members={company.members.map((member) => ({
                          id: member.id,
                          name: member.name,
                          role: member.role,
                          ownership: member.ownership.toString(),
                          country: member.country,
                        }))}
                      />
                    </details>
                  ) : (
                    <p className="pt-hint pt-locked">
                      This company is filed with the state, so changes are made
                      by our team. Please contact us.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
