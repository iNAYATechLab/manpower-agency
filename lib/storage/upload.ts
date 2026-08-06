/**
 * Step 96: Encrypted File Upload Logic
 * Encrypts private docs with AES-256 before storage
 */

import { createCipheriv, randomBytes } from "crypto";
import { STORAGE_BUCKETS, BUCKET_POLICIES, type BucketName } from "@/lib/storage/config";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"; // 64 hex

export interface UploadResult {
  bucket: BucketName;
  key: string; // e.g., workers/wrk_123/passport_123.pdf
  url: string; // Private: encrypted path, Public: CDN URL
  encrypted: boolean;
  sizeBytes: number;
  mimeType: string;
}

function encryptBuffer(buffer: Buffer, keyHex: string): { encrypted: Buffer; iv: string } {
  const key = Buffer.from(keyHex, "hex");
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { encrypted, iv: iv.toString("hex") };
}

/**
 * Step 96: Upload file (encrypt if private bucket)
 */
export async function uploadFile(input: {
  bucket: BucketName;
  key: string;
  buffer: Buffer;
  mimeType: string;
  userRole: string;
  isSuperAdmin: boolean;
}): Promise<UploadResult> {
  const policy = BUCKET_POLICIES[input.bucket];
  if (!policy) throw new Error(`Unknown bucket: ${input.bucket}`);

  // Check mime
  if (!policy.allowedMimeTypes.includes(input.mimeType as never) && !policy.allowedMimeTypes.includes("*" as never)) {
    throw new Error(`MIME not allowed: ${input.mimeType} for ${input.bucket}`);
  }

  // Check size
  const sizeMB = input.buffer.length / 1024 / 1024;
  if (sizeMB > policy.maxSizeMB) throw new Error(`File too large: ${sizeMB.toFixed(2)}MB > ${policy.maxSizeMB}MB`);

  let finalBuffer = input.buffer;
  let encrypted = false;

  if (!policy.public && policy.encryption === "AES-256-CBC") {
    const { encrypted: enc, iv } = encryptBuffer(input.buffer, ENCRYPTION_KEY);
    // Store as iv:encrypted (in real, store iv separately)
    finalBuffer = Buffer.from(`${iv}:${enc.toString("hex")}`, "utf8");
    encrypted = true;
  }

  // Simulate upload to Supabase Storage / S3
  // In real: await supabase.storage.from(bucket).upload(key, finalBuffer, { contentType: mimeType })

  const url = policy.public
    ? `https://cdn.inayatechlab.com/${input.bucket}/${input.key}`
    : `https://storage.inayatechlab.com/${input.bucket}/${input.key}?encrypted=${encrypted}`;

  return {
    bucket: input.bucket,
    key: input.key,
    url,
    encrypted,
    sizeBytes: finalBuffer.length,
    mimeType: input.mimeType,
  };
}

// Example usage:
// const result = await uploadFile({ bucket: STORAGE_BUCKETS.private, key: `workers/${workerId}/passport.pdf`, buffer, mimeType: "application/pdf", userRole: "agency_admin", isSuperAdmin: false });
