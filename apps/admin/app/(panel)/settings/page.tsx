import { prisma } from "@juris/db";
import { Badge, Card } from "@juris/ui";
import Link from "next/link";
import type { ReactNode } from "react";
import { requirePermission, requireRecentAuth } from "../../../src/lib/guard";
import {
  businessTypeRecord,
  catalogRecord,
  intakeRecord,
  kycRecord,
  settingRecord,
  stateFeeRecord,
} from "../../../src/lib/settings-records";
import {
  BILLING_CYCLES,
  CATALOG_TYPES,
  INTAKE_INPUT_TYPES,
  KYC_APPLIES_TO,
  SETTING_KINDS,
  STATE_CODES,
} from "../../../src/lib/settings-schemas";
import {
  saveBusinessType,
  saveCatalogItem,
  saveIntakeQuestion,
  saveKycRequirement,
  saveSetting,
  saveStateFee,
} from "./actions";
import { EntityForm, type FieldDef } from "./entity-form";

const TABS = [
  { id: "catalog", label: "Plans and add-ons" },
  { id: "states", label: "State fees" },
  { id: "business", label: "Business types" },
  { id: "kyc", label: "KYC documents" },
  { id: "intake", label: "Intake questions" },
  { id: "content", label: "Headlines and flags" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function pretty(value: string): string {
  const text = value.replace(/_/g, " ").toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function options(values: readonly string[]) {
  return values.map((value) => ({ value, label: pretty(value) }));
}

const CATALOG_FIELDS = (existing: boolean): FieldDef[] => [
  { name: "name", label: "Name", kind: "text" },
  { name: "slug", label: "Slug", kind: "text", locked: existing },
  {
    name: "type",
    label: "Type",
    kind: "select",
    options: options(CATALOG_TYPES),
  },
  { name: "priceUsd", label: "Price (USD)", kind: "text" },
  {
    name: "billing",
    label: "Billing",
    kind: "select",
    options: options(BILLING_CYCLES),
  },
  { name: "sort", label: "Sort order", kind: "number" },
  { name: "description", label: "Description", kind: "textarea", wide: true },
  {
    name: "warnings",
    label: "Warnings",
    kind: "textarea",
    wide: true,
    helper: "One per line.",
  },
  { name: "mandatory", label: "Mandatory", kind: "checkbox" },
  { name: "active", label: "Active", kind: "checkbox" },
];

const STATE_FIELDS: FieldDef[] = [
  {
    name: "state",
    label: "State",
    kind: "select",
    options: options(STATE_CODES),
    locked: true,
  },
  { name: "feeUsd", label: "State fee (USD)", kind: "text" },
  { name: "notes", label: "Notes", kind: "text", wide: true },
  { name: "active", label: "Offered", kind: "checkbox" },
  { name: "premiumAvailable", label: "Premium available", kind: "checkbox" },
];

const BUSINESS_FIELDS: FieldDef[] = [
  { name: "label", label: "Label", kind: "text" },
  { name: "sort", label: "Sort order", kind: "number" },
  { name: "active", label: "Active", kind: "checkbox" },
];

const KYC_FIELDS = (existing: boolean): FieldDef[] => [
  { name: "label", label: "Label", kind: "text" },
  {
    name: "appliesTo",
    label: "Applies to",
    kind: "select",
    options: options(KYC_APPLIES_TO),
    locked: existing,
  },
  {
    name: "docType",
    label: "Document code",
    kind: "text",
    locked: existing,
    helper: "Lowercase, for example passport_copy.",
  },
  { name: "active", label: "Required", kind: "checkbox" },
];

const INTAKE_FIELDS: FieldDef[] = [
  { name: "group", label: "Group", kind: "text" },
  { name: "label", label: "Question", kind: "text", wide: true },
  {
    name: "inputType",
    label: "Answer type",
    kind: "select",
    options: options(INTAKE_INPUT_TYPES),
  },
  { name: "sort", label: "Sort order", kind: "number" },
  {
    name: "options",
    label: "Choices",
    kind: "textarea",
    wide: true,
    helper: "One per line. Used for select questions.",
  },
  { name: "active", label: "Active", kind: "checkbox" },
];

function settingFields(kind: string | null): FieldDef[] {
  const valueField: FieldDef =
    kind === "flag"
      ? {
          name: "value",
          label: "Value",
          kind: "select",
          options: [
            { value: "true", label: "On" },
            { value: "false", label: "Off" },
          ],
        }
      : kind === "number"
        ? { name: "value", label: "Value", kind: "number" }
        : kind === "text"
          ? { name: "value", label: "Value", kind: "textarea", wide: true }
          : {
              name: "value",
              label: "Value",
              kind: "text",
              helper: "For an on/off flag type true or false.",
            };
  return [
    { name: "key", label: "Key", kind: "text", locked: kind !== null },
    {
      name: "kind",
      label: "Type",
      kind: "select",
      options: SETTING_KINDS.map((value) => ({
        value,
        label: value === "flag" ? "On/off flag" : pretty(value),
      })),
      locked: kind !== null,
    },
    valueField,
  ];
}

function Row({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card solid className="mg-card">
      <h3 className="mg-card-title">
        {title} {badge}
      </h3>
      {children}
    </Card>
  );
}

function inactiveBadge(active: boolean) {
  return active ? null : <Badge variant="warning">Inactive</Badge>;
}

async function TabContent({ tab }: { tab: TabId }) {
  if (tab === "catalog") {
    const rows = await prisma.catalogItem.findMany({
      orderBy: [{ type: "asc" }, { sort: "asc" }, { name: "asc" }],
    });
    return (
      <>
        {rows.map((row) => (
          <Row key={row.id} title={row.name} badge={inactiveBadge(row.active)}>
            <EntityForm
              action={saveCatalogItem}
              fields={CATALOG_FIELDS(true)}
              values={catalogRecord(row)}
              submitLabel="Save"
            />
          </Row>
        ))}
        <Row title="Add a plan, add-on, service or fee">
          <EntityForm
            action={saveCatalogItem}
            fields={CATALOG_FIELDS(false)}
            values={{
              type: "ADDON",
              billing: "ONE_TIME",
              sort: "0",
              active: "on",
            }}
            submitLabel="Add"
          />
        </Row>
      </>
    );
  }
  if (tab === "states") {
    const rows = await prisma.stateFee.findMany();
    return (
      <>
        {STATE_CODES.map((state) => {
          const row = rows.find((candidate) => candidate.state === state);
          return (
            <Row
              key={state}
              title={pretty(state)}
              badge={
                row ? inactiveBadge(row.active) : <Badge>Not set up</Badge>
              }
            >
              <EntityForm
                action={saveStateFee}
                fields={STATE_FIELDS}
                values={row ? stateFeeRecord(row) : { state, feeUsd: "0.00" }}
                submitLabel={row ? "Save" : "Set up"}
              />
            </Row>
          );
        })}
      </>
    );
  }
  if (tab === "business") {
    const rows = await prisma.businessType.findMany({
      orderBy: [{ sort: "asc" }, { label: "asc" }],
    });
    return (
      <>
        {rows.map((row) => (
          <Row key={row.id} title={row.label} badge={inactiveBadge(row.active)}>
            <EntityForm
              action={saveBusinessType}
              fields={BUSINESS_FIELDS}
              values={businessTypeRecord(row)}
              submitLabel="Save"
            />
          </Row>
        ))}
        <Row title="Add a business type">
          <EntityForm
            action={saveBusinessType}
            fields={BUSINESS_FIELDS}
            values={{ sort: "0", active: "on" }}
            submitLabel="Add"
          />
        </Row>
      </>
    );
  }
  if (tab === "kyc") {
    const rows = await prisma.kycRequirement.findMany({
      orderBy: [{ appliesTo: "asc" }, { label: "asc" }],
    });
    return (
      <>
        {rows.map((row) => (
          <Row
            key={row.id}
            title={`${row.label} (${pretty(row.appliesTo)})`}
            badge={inactiveBadge(row.active)}
          >
            <EntityForm
              action={saveKycRequirement}
              fields={KYC_FIELDS(true)}
              values={kycRecord(row)}
              submitLabel="Save"
            />
          </Row>
        ))}
        <Row title="Add a required document">
          <EntityForm
            action={saveKycRequirement}
            fields={KYC_FIELDS(false)}
            values={{ appliesTo: "OWNER", active: "on" }}
            submitLabel="Add"
          />
        </Row>
      </>
    );
  }
  if (tab === "intake") {
    const rows = await prisma.intakeQuestion.findMany({
      orderBy: [{ group: "asc" }, { sort: "asc" }],
    });
    return (
      <>
        {rows.map((row) => (
          <Row
            key={row.id}
            title={`${row.group}: ${row.label}`}
            badge={inactiveBadge(row.active)}
          >
            <EntityForm
              action={saveIntakeQuestion}
              fields={INTAKE_FIELDS}
              values={intakeRecord(row)}
              submitLabel="Save"
            />
          </Row>
        ))}
        <Row title="Add an intake question">
          <EntityForm
            action={saveIntakeQuestion}
            fields={INTAKE_FIELDS}
            values={{ inputType: "TEXT", sort: "0", active: "on" }}
            submitLabel="Add"
          />
        </Row>
      </>
    );
  }

  const rows = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  return (
    <>
      {rows.map((row) => {
        const record = settingRecord(row);
        if (!record) return null;
        return (
          <Row key={row.id} title={row.key}>
            <EntityForm
              action={saveSetting}
              fields={settingFields(record.kind ?? null)}
              values={record}
              submitLabel="Save"
            />
          </Row>
        );
      })}
      <Row title="Add a headline or flag">
        <EntityForm
          action={saveSetting}
          fields={settingFields(null)}
          values={{ kind: "text" }}
          submitLabel="Add"
        />
      </Row>
    </>
  );
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  await requirePermission("EDIT_SETTINGS");
  const { tab: rawTab } = await searchParams;
  const requested = Array.isArray(rawTab) ? rawTab[0] : rawTab;
  const tab =
    TABS.find((candidate) => candidate.id === requested)?.id ?? "catalog";
  await requireRecentAuth(`/settings?tab=${tab}`);

  return (
    <div className="stack">
      <h1>Settings</h1>
      <p className="mg-note" role="note">
        Changed prices and fees only affect <strong>new orders</strong>. Orders
        already placed keep the price they were bought at. Items are never
        deleted; switch them off instead. Every change is written to the
        activity log.
      </p>
      <nav aria-label="Settings sections" className="mg-tabs">
        {TABS.map((item) => (
          <Link
            key={item.id}
            href={`/settings?tab=${item.id}`}
            aria-current={item.id === tab ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <TabContent tab={tab} />
    </div>
  );
}
