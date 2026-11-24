import type {
  BusinessType,
  CatalogItem,
  IntakeQuestion,
  KycRequirement,
  StateFee,
} from "@juris/db";
import { settingKindOf, type FormRecord } from "./settings-schemas";

/** Turns stored rows into the same string records the forms submit. */

const on = (value: boolean): string => (value ? "on" : "");

function strings(json: unknown): string {
  return Array.isArray(json)
    ? json.filter((item) => typeof item === "string").join("\n")
    : "";
}

export function catalogRecord(row: CatalogItem): FormRecord {
  return {
    id: row.id,
    type: row.type,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    priceUsd: row.priceUsd.toFixed(2),
    billing: row.billing,
    mandatory: on(row.mandatory),
    active: on(row.active),
    sort: String(row.sort),
    warnings: strings(row.warnings),
  };
}

export function stateFeeRecord(row: StateFee): FormRecord {
  return {
    state: row.state,
    feeUsd: row.feeUsd.toFixed(2),
    active: on(row.active),
    premiumAvailable: on(row.premiumAvailable),
    notes: row.notes ?? "",
  };
}

export function businessTypeRecord(row: BusinessType): FormRecord {
  return {
    id: row.id,
    label: row.label,
    active: on(row.active),
    sort: String(row.sort),
  };
}

export function kycRecord(row: KycRequirement): FormRecord {
  return {
    id: row.id,
    appliesTo: row.appliesTo,
    docType: row.docType,
    label: row.label,
    active: on(row.active),
  };
}

export function intakeRecord(row: IntakeQuestion): FormRecord {
  return {
    id: row.id,
    group: row.group,
    label: row.label,
    inputType: row.inputType,
    options: strings(row.options),
    active: on(row.active),
    sort: String(row.sort),
  };
}

/** Null when the stored value is an object or array, which this screen does not edit. */
export function settingRecord(row: {
  key: string;
  value: unknown;
}): FormRecord | null {
  const kind = settingKindOf(row.value);
  return kind ? { key: row.key, kind, value: String(row.value) } : null;
}
