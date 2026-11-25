import { DEmpty } from "@juris/ui/dashboard";
import Link from "next/link";

/** Simple placeholder for menu items whose page is not built yet. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <h1>{title}</h1>
      <DEmpty
        action={
          <Link className="d-btn d-gh" href="/">
            Back to dashboard
          </Link>
        }
        text="This page is not ready yet. It will appear here as soon as it is built."
        title="Coming soon"
      />
    </>
  );
}
