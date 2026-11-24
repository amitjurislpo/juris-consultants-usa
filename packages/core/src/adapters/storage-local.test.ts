import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { LocalDiskStorageAdapter, serveLocalFile } from "./storage-local.js";

let dir = "";
const secret = "test-signing-secret";
const env = () => ({ STORAGE_LOCAL_DIR: dir, STORAGE_SIGNING_SECRET: secret });

beforeAll(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "juris-store-"));
});
afterAll(async () => {
  await rm(dir, { recursive: true, force: true });
});

function parts(url: string) {
  const parsed = new URL(url, "http://x");
  return {
    key: parsed.pathname.replace("/api/local-files/", "").split("/"),
    e: parsed.searchParams.get("e"),
    s: parsed.searchParams.get("s"),
  };
}

describe("LocalDiskStorageAdapter", () => {
  it("stores a file and serves it through a signed link", async () => {
    const store = new LocalDiskStorageAdapter({ dir, signingSecret: secret });
    await store.upload("kyc/o1/passport.pdf", new Uint8Array([1, 2, 3]), "application/pdf");
    const url = await store.getSignedDownloadUrl("kyc/o1/passport.pdf", 60);
    const { key, e, s } = parts(url);
    const response = await serveLocalFile(env(), key, e, s);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([1, 2, 3]));
  });

  it("rejects a tampered signature and an expired link", async () => {
    const store = new LocalDiskStorageAdapter({ dir, signingSecret: secret });
    await store.upload("a/b.png", new Uint8Array([9]), "image/png");
    const { key, e, s } = parts(await store.getSignedDownloadUrl("a/b.png", 60));
    expect((await serveLocalFile(env(), key, e, `${s}`.replace(/.$/, "0"))).status).toBe(403);
    expect((await serveLocalFile(env(), key, String(Date.now() - 1000), s)).status).toBe(403);
  });

  it("refuses keys that climb out of the folder", async () => {
    const store = new LocalDiskStorageAdapter({ dir, signingSecret: secret });
    await expect(store.upload("../evil.txt", new Uint8Array([1]), "text/plain")).rejects.toThrow();
    expect((await serveLocalFile(env(), ["..", "evil.txt"], "9999999999999", "00")).status).toBe(404);
  });

  it("is off on a production deployment", async () => {
    const response = await serveLocalFile({ ...env(), VERCEL_ENV: "production" }, ["a"], "1", "1");
    expect(response.status).toBe(404);
  });
});
