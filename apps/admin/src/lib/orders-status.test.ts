import { describe, expect, it } from "vitest";
import {
  buildStatusContext,
  buildStatusEmail,
  needsReason,
  orderRef,
  selectableStatuses,
} from "./orders-status";

const ready = buildStatusContext({
  kind: "FORMATION",
  detailsSubmitted: true,
  kycStatuses: ["APPROVED"],
  einOrdered: false,
});

describe("selectableStatuses", () => {
  it("offers only legal next steps", () => {
    expect(selectableStatuses("READY_FOR_REVIEW", ready)).toEqual([
      "FILING_SUBMITTED",
    ]);
  });
  it("never offers PAID, even from DRAFT", () => {
    expect(selectableStatuses("DRAFT", ready)).toEqual([]);
  });
  it("blocks filing while a KYC document is not approved", () => {
    const context = buildStatusContext({
      kind: "FORMATION",
      detailsSubmitted: true,
      kycStatuses: ["APPROVED", "PENDING"],
      einOrdered: false,
    });
    expect(selectableStatuses("READY_FOR_REVIEW", context)).toEqual([]);
  });
  it("allows rejection back to details pending when a document is rejected", () => {
    const context = buildStatusContext({
      kind: "FORMATION",
      detailsSubmitted: true,
      kycStatuses: ["REJECTED"],
      einOrdered: false,
    });
    expect(selectableStatuses("READY_FOR_REVIEW", context)).toEqual([
      "DETAILS_PENDING",
    ]);
  });
  it("uses the consultation path for consultation orders", () => {
    const context = buildStatusContext({
      kind: "CONSULTATION",
      detailsSubmitted: false,
      kycStatuses: [],
      einOrdered: false,
    });
    expect(selectableStatuses("PAID", context)).toEqual(["BOOKED"]);
  });
});

describe("needsReason", () => {
  it("is true only for a rejection", () => {
    expect(needsReason("READY_FOR_REVIEW", "DETAILS_PENDING")).toBe(true);
    expect(needsReason("PAID", "DETAILS_PENDING")).toBe(false);
  });
});

describe("buildStatusEmail", () => {
  it("includes the reason when rejecting", () => {
    const mail = buildStatusEmail({
      customerName: "Asha",
      ref: "#ABCD1234",
      from: "READY_FOR_REVIEW",
      to: "DETAILS_PENDING",
      reason: "Passport photo is blurry",
    });
    expect(mail.template).toBe("order-rejected");
    expect(mail.text).toContain("Reason: Passport photo is blurry");
    expect(mail.text.startsWith("Hello Asha,")).toBe(true);
  });
  it("sends a plain status email otherwise", () => {
    const mail = buildStatusEmail({
      customerName: null,
      ref: "#ABCD1234",
      from: "FILING_SUBMITTED",
      to: "APPROVED_BY_STATE",
      reason: null,
    });
    expect(mail.template).toBe("order-status-changed");
    expect(mail.subject).toContain("Approved by state");
  });
});

describe("orderRef", () => {
  it("uses the last 8 characters in upper case", () => {
    expect(orderRef("cmabc12345678xyz")).toBe("#45678XYZ");
  });
});
