import { DSkeleton } from "@juris/ui/dashboard";

/** Shown while a page loads: same card shapes as the dashboard. */
export default function Loading() {
  return (
    <div aria-busy="true" className="d-g" role="status">
      <DSkeleton height={60} />
      <div className="d-g d-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <DSkeleton height={120} key={i} />
        ))}
      </div>
      <div className="d-g d-cols-21">
        <DSkeleton height={300} />
        <DSkeleton height={300} />
      </div>
      <DSkeleton height={240} />
    </div>
  );
}
