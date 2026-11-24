import { describe, expect, it } from "vitest";
import {
  deliverableKey,
  MAX_DELIVERABLE_BYTES,
  sniffMime,
  validateDeliverableFile,
} from "./deliverables";

const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
const jpg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0]);
const exe = new Uint8Array([0x4d, 0x5a, 0x90]);

describe("sniffMime", () => {
  it("recognises PDF, PNG and JPG by their bytes", () => {
    expect(sniffMime(pdf)).toBe("application/pdf");
    expect(sniffMime(png)).toBe("image/png");
    expect(sniffMime(jpg)).toBe("image/jpeg");
    expect(sniffMime(exe)).toBeNull();
  });
});

describe("validateDeliverableFile", () => {
  it("accepts an allowed file", () => {
    expect(validateDeliverableFile(1000, pdf)).toEqual({
      mime: "application/pdf",
    });
  });
  it("rejects empty, oversized and wrong-type files", () => {
    expect(validateDeliverableFile(0, pdf)).toHaveProperty("error");
    expect(
      validateDeliverableFile(MAX_DELIVERABLE_BYTES + 1, pdf),
    ).toHaveProperty("error");
    expect(validateDeliverableFile(1000, exe)).toHaveProperty("error");
  });
  it("allows a file of exactly 15 MB", () => {
    expect(validateDeliverableFile(MAX_DELIVERABLE_BYTES, png)).toEqual({
      mime: "image/png",
    });
  });
});

describe("deliverableKey", () => {
  it("never uses the customer-facing file name", () => {
    expect(deliverableKey("ord1", "uuid", "image/jpeg")).toBe(
      "deliverables/ord1/uuid.jpg",
    );
  });
});
