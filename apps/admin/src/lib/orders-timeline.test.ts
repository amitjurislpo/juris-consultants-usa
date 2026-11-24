import { describe, expect, it } from "vitest";
import { formatMoney, formatValue } from "./orders-format";
import { buildTimeline } from "./orders-timeline";

describe("buildTimeline", () => {
  it("merges everything newest first and names status changes", () => {
    const timeline = buildTimeline({
      createdAt: new Date("2026-11-01T10:00:00Z"),
      paidAt: new Date("2026-11-01T10:05:00Z"),
      audit: [
        {
          at: new Date("2026-11-02T09:00:00Z"),
          action: "order.status_changed",
          actorEmail: "staff@example.com",
          after: {
            from: "READY_FOR_REVIEW",
            to: "DETAILS_PENDING",
            reason: "Blurry photo",
          },
        },
      ],
      emails: [
        {
          at: new Date("2026-11-02T09:00:01Z"),
          template: "order-rejected",
          status: "SENT",
        },
      ],
    });
    expect(timeline.map((entry) => entry.title)).toEqual([
      "Email to customer: order-rejected",
      "Status changed",
      "Payment confirmed",
      "Order created",
    ]);
    expect(timeline[1]?.detail).toBe(
      "Ready for review to Details pending. Reason: Blurry photo. by staff@example.com",
    );
  });
});

describe("formatting", () => {
  it("formats money and stored values", () => {
    expect(formatMoney("1234.5")).toBe("$1,234.50");
    expect(formatValue(true)).toBe("Yes");
    expect(formatValue({ city: "Austin", zip: 78701 })).toBe(
      "city: Austin, zip: 78701",
    );
    expect(formatValue(null)).toBe("");
  });
});
