import { Button } from "@juris/ui";
import Link from "next/link";
import { buildQuery } from "../../../src/lib/leads";

interface PagerProps {
  basePath: string;
  query: Record<string, string | null>;
  page: number;
  pages: number;
}

export function Pager({ basePath, query, page, pages }: PagerProps) {
  if (pages <= 1) return null;
  const href = (target: number) =>
    `${basePath}${buildQuery({ ...query, page: target })}`;
  return (
    <nav className="pager" aria-label="Pages">
      {page > 1 ? (
        <Link href={href(page - 1)}>
          <Button variant="outline" size="sm" type="button">
            Previous
          </Button>
        </Link>
      ) : null}
      <span className="muted">
        Page {page} of {pages}
      </span>
      {page < pages ? (
        <Link href={href(page + 1)}>
          <Button variant="outline" size="sm" type="button">
            Next
          </Button>
        </Link>
      ) : null}
    </nav>
  );
}
