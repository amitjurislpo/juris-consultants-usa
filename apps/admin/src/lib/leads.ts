import { z } from "zod";

export const LEAD_FLOWS = ["START", "MANAGE", "EXPERT", "GLOBAL"] as const;
export type LeadFlowValue = (typeof LEAD_FLOWS)[number];

export const LEAD_SOURCE_MAX = 40;

export interface LeadContact {
  email: string;
  name: string;
  phone: string;
  company: string;
  need: string;
  plan: string;
  state: string;
  add: string[];
}

const text = z.string().catch("");

const contactSchema = z.object({
  email: text,
  name: text,
  phone: text,
  company: text,
  need: text,
  plan: text,
  state: text,
  add: z.array(z.string()).catch([]),
});

/** Reads the free-form contactInfo JSON written by the website; unknown or bad values become empty. */
export function parseContactInfo(value: unknown): LeadContact {
  const source =
    value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return contactSchema.parse(source);
}

export interface LeadFilters {
  flow: LeadFlowValue | null;
  source: string;
}

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function parseLeadFilters(
  params: Record<string, string | string[] | undefined>,
): LeadFilters {
  const flow = first(params.flow);
  return {
    flow: LEAD_FLOWS.find((value) => value === flow) ?? null,
    source: first(params.source).trim().slice(0, LEAD_SOURCE_MAX),
  };
}

export const noteSchema = z.object({
  id: z.string().min(1).max(40),
  body: z.string().trim().min(1).max(2000),
});

/** Query string for list links; empty values are dropped. */
export function buildQuery(
  values: Record<string, string | number | null>,
): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value !== null && value !== "" && value !== 1) {
      query.set(key, String(value));
    }
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}
