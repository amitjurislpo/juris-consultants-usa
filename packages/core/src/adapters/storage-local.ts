import { createHmac, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StorageAdapter } from "./storage.js";
import { VercelBlobStorageAdapter } from "./storage.js";

/** Content types a stored file may be served as. Anything else is sent as a plain download. */
const SERVABLE = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function safeKey(key: string): string {
  const normalized = path.posix.normalize(key.replace(/\\/g, "/"));
  if (
    !normalized ||
    normalized.startsWith("/") ||
    normalized.startsWith("..") ||
    normalized.includes("../")
  ) {
    throw new Error("Invalid storage key");
  }
  return normalized;
}

function sign(key: string, expires: number, secret: string): string {
  return createHmac("sha256", secret)
    .update(`${key}:${expires}`)
    .digest("hex");
}

export interface LocalDiskStorageConfig {
  /** Folder that holds the files. Must be outside the web root and shared by both apps. */
  readonly dir: string;
  /** Secret shared by the apps that issue and serve links (not the login secret). */
  readonly signingSecret: string;
  /** Path of the route that serves files, for example "/api/local-files". */
  readonly routePath?: string;
}

/**
 * Development / test replacement for private object storage: files go to a local folder and are
 * handed out through short-lived signed links. Never used on a production deployment.
 */
export class LocalDiskStorageAdapter implements StorageAdapter {
  constructor(private readonly config: LocalDiskStorageConfig) {
    if (!config.dir.trim() || !config.signingSecret.trim()) {
      throw new Error("Local storage needs a folder and a signing secret");
    }
  }

  private file(key: string): string {
    return path.join(this.config.dir, ...safeKey(key).split("/"));
  }

  async upload(
    key: string,
    data: Uint8Array,
    contentType: string,
  ): Promise<{ readonly key: string }> {
    const target = this.file(key);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, data);
    await writeFile(`${target}.type`, contentType, "utf8");
    return { key: safeKey(key) };
  }

  async getSignedDownloadUrl(
    key: string,
    expiresInSeconds: number,
  ): Promise<string> {
    if (!Number.isInteger(expiresInSeconds) || expiresInSeconds <= 0) {
      throw new RangeError(
        "Download URL expiry must be a positive number of seconds",
      );
    }
    const clean = safeKey(key);
    const expires = Date.now() + expiresInSeconds * 1000;
    const route = this.config.routePath ?? "/api/local-files";
    const encoded = clean.split("/").map(encodeURIComponent).join("/");
    return `${route}/${encoded}?e=${expires}&s=${sign(clean, expires, this.config.signingSecret)}`;
  }

  async remove(key: string): Promise<void> {
    const target = this.file(key);
    await rm(target, { force: true });
    await rm(`${target}.type`, { force: true });
  }
}

/**
 * The storage the current environment should use: Vercel Blob when its token is set, otherwise
 * the local folder (never on a production deployment), otherwise nothing.
 */
export function storageFromEnv(
  env: Record<string, string | undefined>,
): StorageAdapter | null {
  const token = env.BLOB_READ_WRITE_TOKEN?.trim();
  if (token) return new VercelBlobStorageAdapter({ token });
  const dir = env.STORAGE_LOCAL_DIR?.trim();
  const secret = env.STORAGE_SIGNING_SECRET?.trim();
  if (dir && secret && env.VERCEL_ENV !== "production") {
    return new LocalDiskStorageAdapter({ dir, signingSecret: secret });
  }
  return null;
}

/** Answers a request for a locally stored file after checking the link signature and expiry. */
export async function serveLocalFile(
  env: Record<string, string | undefined>,
  keyParts: string[],
  expires: string | null,
  signature: string | null,
): Promise<Response> {
  const dir = env.STORAGE_LOCAL_DIR?.trim();
  const secret = env.STORAGE_SIGNING_SECRET?.trim();
  if (!dir || !secret || env.VERCEL_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  let key: string;
  try {
    key = safeKey(keyParts.map(decodeURIComponent).join("/"));
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const exp = Number(expires);
  if (!signature || !Number.isFinite(exp) || exp < Date.now()) {
    return new Response("This link has expired.", { status: 403 });
  }
  const expected = Buffer.from(sign(key, exp, secret), "hex");
  const given = Buffer.from(signature, "hex");
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return new Response("Forbidden", { status: 403 });
  }
  const target = path.join(dir, ...key.split("/"));
  try {
    const [data, type] = await Promise.all([
      readFile(target),
      readFile(`${target}.type`, "utf8").catch(() => "application/octet-stream"),
    ]);
    const contentType = SERVABLE.has(type) ? type : "application/octet-stream";
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": SERVABLE.has(type) ? "inline" : "attachment",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
