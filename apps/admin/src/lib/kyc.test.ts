import { describe, expect, it } from "vitest";
import {
  kycWhere,
  parseKycFilters,
  previewKind,
  rejectionEmail,
  rejectSchema,
} from "./kyc";

describe("parseKycFilters", () => {
  it("defaults to pending documents", () => {
    expect(parseKycFilters({})).toEqual({ status: "PENDING", docType: "" });
  });
  it("accepts known statuses and ALL, ignores unknown ones", () => {
    expect(parseKycFilters({ status: "REJECTED" }).status).toBe("REJECTED");
    expect(parseKycFilters({ status: "ALL" }).status).toBe("ALL");
    expect(parseKycFilters({ status: "bogus" }).status).toBe("PENDING");
  });
  it("trims and limits the requirement filter", () => {
    expect(parseKycFilters({ docType: " passport " }).docType).toBe("passport");
    expect(parseKycFilters({ docType: "x".repeat(200) }).docType).toHaveLength(
      80,
    );
  });
});

describe("kycWhere", () => {
  it("builds the filter and skips empty parts", () => {
    expect(kycWhere({ status: "PENDING", docType: "passport" })).toEqual({
      status: "PENDING",
      docType: "passport",
    });
    expect(kycWhere({ status: "ALL", docType: "" })).toEqual({});
  });
});

describe("rejectSchema", () => {
  it("requires a real reason", () => {
    expect(rejectSchema.safeParse({ id: "a", reason: "   " }).success).toBe(
      false,
    );
    expect(
      rejectSchema.safeParse({ id: "a", reason: "Photo is blurry" }),
    ).toMatchObject({
      success: true,
      data: { reason: "Photo is blurry" },
    });
  });
});

describe("previewKind", () => {
  it("reads the extension from a URL or a path", () => {
    expect(previewKind("https://x.blob.vercel-storage.com/kyc/a.PNG")).toBe(
      "image",
    );
    expect(previewKind("kyc/a.pdf")).toBe("pdf");
    expect(previewKind("kyc/a")).toBe("other");
  });
});

describe("rejectionEmail", () => {
  it("includes the reason and the document name", () => {
    const mail = rejectionEmail({
      name: "Asha",
      docLabel: "Passport",
      orderId: "clx123456789",
      reason: "Photo is blurry",
    });
    expect(mail.subject).toContain("Passport");
    expect(mail.text).toContain("Reason: Photo is blurry");
    expect(mail.text).toContain("Hello Asha,");
  });
});
