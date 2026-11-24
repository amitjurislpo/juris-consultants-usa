import Link from "next/link";
import { buildQuery } from "../../../src/lib/orders-filters";
import { pageCount } from "../../../src/lib/page";

export function Pagination({
  basePath,
  values,
  page,
  total,
}: {
  basePath: string;
  values: Record<string, string>;
  page: number;
  total: number;
}) {
  const pages = pageCount(total);
  return (
    <nav className="pager" aria-label="Pagination">
      <span>
        Page {page} of {pages} ({total} {total === 1 ? "result" : "results"})
      </span>
      <span className="pager-links">
        {page > 1 ? (
          <Link href={`${basePath}${buildQuery(values, page - 1)}`}>
            Previous
          </Link>
        ) : null}
        {page < pages ? (
          <Link href={`${basePath}${buildQuery(values, page + 1)}`}>Next</Link>
        ) : null}
      </span>
    </nav>
  );
}
