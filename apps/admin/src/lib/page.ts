export const PAGE_SIZE = 25;
const MAX_QUERY_LENGTH = 100;
const MAX_PAGE = 10_000;

type SearchParams = Record<string, string | string[] | undefined>;

export interface ListParams {
  q: string;
  page: number;
  skip: number;
  take: number;
}

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** Parses ?q= and ?page= from a page's searchParams; bad input falls back to defaults. */
export function parseListParams(params: SearchParams): ListParams {
  const q = first(params.q).trim().slice(0, MAX_QUERY_LENGTH);
  const raw = first(params.page);
  const parsed = /^\d{1,5}$/.test(raw) ? Number(raw) : 1;
  const page = Math.min(Math.max(parsed, 1), MAX_PAGE);
  return { q, page, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE };
}

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}
