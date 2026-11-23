import { describe, expect, it } from "vitest";
import { VercelBlobStorageAdapter } from "./storage.js";

describe("Vercel Blob adapter configuration", () => {
  it("requires an explicit read-write token", () => {
    expect(() => new VercelBlobStorageAdapter({ token: "" })).toThrow(
      /read-write token is required/,
    );
  });

  it("rejects download URL lifetimes outside Vercel's supported range", async () => {
    const storage = new VercelBlobStorageAdapter({
      token: "explicit-test-token",
    });
    await expect(
      storage.getSignedDownloadUrl("https://blob.example/file.pdf", 0),
    ).rejects.toThrow(/positive number of seconds/);
    await expect(
      storage.getSignedDownloadUrl(
        "https://blob.example/file.pdf",
        7 * 24 * 60 * 60 + 1,
      ),
    ).rejects.toThrow(/more than seven days/);
  });
});
