import { describe, expect, it } from "vitest";
import {
  canTransition,
  getAllowedTransitions,
  transitionStatus,
} from "./status.js";

describe("order status machine", () => {
  it("allows the formation happy path and requires EIN only when ordered", () => {
    expect(canTransition("DRAFT", "PAID", { kind: "FORMATION" })).toBe(true);
    expect(
      canTransition("APPROVED_BY_STATE", "COMPLETED", {
        kind: "FORMATION",
        einOrdered: false,
      }),
    ).toBe(true);
    expect(
      canTransition("APPROVED_BY_STATE", "EIN_RECEIVED", {
        kind: "FORMATION",
        einOrdered: true,
      }),
    ).toBe(true);
  });

  it("only marks details ready when details and at least one KYC document are approved", () => {
    expect(
      canTransition("DETAILS_PENDING", "READY_FOR_REVIEW", {
        kind: "FORMATION",
        detailsComplete: true,
        kycDocuments: [{ status: "APPROVED" }],
      }),
    ).toBe(true);
    expect(
      canTransition("DETAILS_PENDING", "READY_FOR_REVIEW", {
        kind: "FORMATION",
        detailsComplete: true,
        kycDocuments: [{ status: "REJECTED" }],
      }),
    ).toBe(false);
  });

  it("blocks filing until details and every KYC document are complete", () => {
    expect(
      canTransition("READY_FOR_REVIEW", "FILING_SUBMITTED", {
        kind: "FORMATION",
        detailsComplete: true,
        kycDocuments: [{ status: "APPROVED" }, { status: "APPROVED" }],
      }),
    ).toBe(true);
    expect(
      canTransition("READY_FOR_REVIEW", "FILING_SUBMITTED", {
        kind: "FORMATION",
        detailsComplete: true,
        kycDocuments: [{ status: "APPROVED" }, { status: "PENDING" }],
      }),
    ).toBe(false);
    expect(
      canTransition("READY_FOR_REVIEW", "FILING_SUBMITTED", {
        kind: "FORMATION",
        detailsComplete: true,
        kycDocuments: [],
      }),
    ).toBe(false);
    expect(
      canTransition("DETAILS_PENDING", "READY_FOR_REVIEW", {
        kind: "FORMATION",
        detailsComplete: true,
        kycDocuments: [],
      }),
    ).toBe(false);
  });

  it("returns rejected KYC or incomplete details to details pending", () => {
    expect(
      transitionStatus("READY_FOR_REVIEW", "DETAILS_PENDING", {
        kind: "FORMATION",
        detailsComplete: true,
        kycDocuments: [{ status: "REJECTED" }],
      }).to,
    ).toBe("DETAILS_PENDING");
    expect(
      canTransition("READY_FOR_REVIEW", "DETAILS_PENDING", {
        kind: "FORMATION",
        detailsComplete: false,
        kycDocuments: [{ status: "APPROVED" }],
      }),
    ).toBe(true);
  });

  it("uses the consultation status sequence", () => {
    expect(getAllowedTransitions("PAID", { kind: "CONSULTATION" })).toEqual([
      "BOOKED",
    ]);
    expect(() =>
      transitionStatus("DRAFT", "COMPLETED", { kind: "CONSULTATION" }),
    ).toThrow(/Invalid order status transition/);
  });
});
