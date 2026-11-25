import { DSkeleton } from "@juris/ui/dashboard";

/** Same card shapes as the dashboard, so nothing jumps when the data arrives. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading your dashboard">
      <DSkeleton height={64} />
      <div className="d-g d-cols-4" style={{ marginTop: 24 }}>
        <DSkeleton height={130} />
        <DSkeleton height={130} />
        <DSkeleton height={130} />
        <DSkeleton height={130} />
      </div>
      <div className="d-g d-cols-21 d-mt">
        <DSkeleton height={300} />
        <DSkeleton height={300} />
      </div>
      <div className="d-g d-cols-21 d-mt">
        <DSkeleton height={190} />
        <DSkeleton height={190} />
      </div>
      <div className="d-g d-cols-3 d-mt">
        <DSkeleton height={270} />
        <DSkeleton height={270} />
        <DSkeleton height={270} />
      </div>
    </div>
  );
}
