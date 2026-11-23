import { Buffer } from "node:buffer";
import { del, issueSignedToken, presignUrl, put } from "@vercel/blob";

export interface StorageAdapter {
  upload(
    key: string,
    data: Uint8Array,
    contentType: string,
  ): Promise<{ readonly key: string }>;
  getSignedDownloadUrl(key: string, expiresInSeconds: number): Promise<string>;
  remove(key: string): Promise<void>;
}

export interface VercelBlobStorageAdapterConfig {
  readonly token: string;
}

export class VercelBlobStorageAdapter implements StorageAdapter {
  constructor(private readonly config: VercelBlobStorageAdapterConfig) {
    if (!config.token.trim())
      throw new Error("Vercel Blob read-write token is required");
  }

  async upload(
    key: string,
    data: Uint8Array,
    contentType: string,
  ): Promise<{ readonly key: string }> {
    if (!key.trim()) throw new Error("Storage key is required");
    if (!contentType.trim()) throw new Error("Content type is required");

    const blob = await put(key, Buffer.from(data), {
      access: "private",
      token: this.config.token,
      contentType,
      allowOverwrite: true,
    });
    return { key: blob.url };
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
    if (expiresInSeconds > 7 * 24 * 60 * 60) {
      throw new RangeError(
        "Vercel signed URLs cannot be valid for more than seven days",
      );
    }

    const pathname = new URL(key).pathname.replace(/^\/+/, "");
    if (!pathname) throw new Error("Storage key must identify a blob pathname");
    const validUntil = Date.now() + expiresInSeconds * 1000;
    const signedToken = await issueSignedToken({
      pathname,
      operations: ["get"],
      validUntil,
      token: this.config.token,
    });
    const { presignedUrl } = await presignUrl(signedToken, {
      operation: "get",
      pathname,
      access: "private",
      validUntil,
      useCache: false,
    });
    return presignedUrl;
  }

  async remove(key: string): Promise<void> {
    await del(key, { token: this.config.token });
  }
}

export class InMemoryStorageAdapter implements StorageAdapter {
  readonly objects = new Map<string, Uint8Array>();

  async upload(
    key: string,
    data: Uint8Array,
    _contentType: string,
  ): Promise<{ readonly key: string }> {
    this.objects.set(key, data);
    return { key };
  }

  async getSignedDownloadUrl(
    key: string,
    expiresInSeconds: number,
  ): Promise<string> {
    if (!this.objects.has(key))
      throw new Error(`Storage object not found: ${key}`);
    return `mock://download/${encodeURIComponent(key)}?expires=${expiresInSeconds}`;
  }

  async remove(key: string): Promise<void> {
    this.objects.delete(key);
  }
}
