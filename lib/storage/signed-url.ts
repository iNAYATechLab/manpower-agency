/**
 * Step 99: File Access Signed-URL System
 * Generates time-limited signed URLs for private files
 */

import { createHmac } from "crypto";

const SIGNING_SECRET = process.env.STORAGE_SIGNING_SECRET || "inayatechlab_signed_url_secret_32_chars_min";

export interface SignedUrlOptions {
  expiresInSeconds?: number; // default 3600 (1 hour)
  action?: "read" | "write";
}

export interface SignedUrlResult {
  url: string;
  expiresAt: Date;
  signature: string;
}

/**
 * Step 99: Generate signed URL for private file
 * Format: https://storage.../bucket/key?expires=...&signature=hmac
 */
export function generateSignedUrl(
  bucket: string,
  key: string,
  options: SignedUrlOptions = {}
): SignedUrlResult {
  const expiresIn = options.expiresInSeconds ?? 3600;
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  const expires = Math.floor(expiresAt.getTime() / 1000);
  const action = options.action ?? "read";

  const stringToSign = `${bucket}/${key}:${expires}:${action}`;
  const signature = createHmac("sha256", SIGNING_SECRET).update(stringToSign).digest("hex");

  const url = `https://storage.inayatechlab.com/${bucket}/${key}?expires=${expires}&signature=${signature}&action=${action}`;

  return { url, expiresAt, signature };
}

/**
 * Verify signed URL
 */
export function verifySignedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const expires = parsed.searchParams.get("expires");
    const signature = parsed.searchParams.get("signature");
    const action = parsed.searchParams.get("action") || "read";
    if (!expires || !signature) return false;
    if (parseInt(expires, 10) * 1000 < Date.now()) return false; // Expired

    // Extract bucket/key from pathname: /bucket/key...
    const parts = parsed.pathname.slice(1).split("/");
    const bucket = parts[0]!;
    const key = parts.slice(1).join("/");
    const expected = createHmac("sha256", SIGNING_SECRET).update(`${bucket}/${key}:${expires}:${action}`).digest("hex");
    return signature === expected;
  } catch {
    return false;
  }
}
