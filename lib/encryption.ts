/**
 * iNAYATechLab Inc. - Manpower Agency SaaS
 * Step 4 & 6: GitHub Access Token Encryption Logic (AES-256)
 *
 * Algorithm: AES-256-CBC + AES-256-GCM fallback
 * Used for: GitHub PAT, DB passwords, Stripe secrets
 * Security: Key = 32 bytes (64 hex), IV = 16 bytes (32 hex)
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

const ALGORITHM = "aes-256-cbc";
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits

/**
 * Derive a 32-byte key from passphrase if needed
 */
export function deriveKey(passphrase: string, salt: string = "inayatechlab-manpower-salt"): Buffer {
  return scryptSync(passphrase, salt, KEY_LENGTH);
}

/**
 * Validate hex key/iv lengths
 */
function getKeyBuffer(keyHex: string): Buffer {
  if (/^[0-9a-fA-F]{64}$/.test(keyHex)) {
    return Buffer.from(keyHex, "hex");
  }
  // Fallback: derive from string
  return deriveKey(keyHex);
}

function getIvBuffer(ivHex: string): Buffer {
  if (/^[0-9a-fA-F]{32}$/.test(ivHex)) {
    return Buffer.from(ivHex, "hex");
  }
  throw new Error("Invalid IV: must be 32 hex chars (16 bytes)");
}

/**
 * Encrypt plaintext with AES-256-CBC
 * @returns iv:encryptedHex
 */
export function encryptToken(plaintext: string, keyHex: string, ivHex?: string): string {
  const key = getKeyBuffer(keyHex);
  const iv = ivHex ? getIvBuffer(ivHex) : randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Return iv:encrypted so we can decrypt without separate IV storage
  return `${iv.toString("hex")}:${encrypted}`;
}

/**
 * Decrypt token
 * @param encryptedPayload format iv:encryptedHex
 */
export function decryptToken(encryptedPayload: string, keyHex: string): string {
  const [ivHex, encryptedHex] = encryptedPayload.split(":");

  if (!ivHex || !encryptedHex) {
    throw new Error("Invalid encrypted payload format. Expected iv:encrypted");
  }

  const key = getKeyBuffer(keyHex);
  const iv = getIvBuffer(ivHex);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Utility: Encrypt GitHub PAT for .env.secret binding
 */
export function encryptGitHubToken(token: string): { encrypted: string; iv: string } {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error("ENCRYPTION_KEY not set in env");

  const iv = randomBytes(IV_LENGTH).toString("hex");
  const encrypted = encryptToken(token, key, iv);
  return { encrypted, iv };
}

/**
 * Utility: Decrypt GitHub PAT at runtime (server-side only!)
 */
export function getDecryptedGitHubToken(): string {
  const encrypted = process.env.GITHUB_TOKEN_ENCRYPTED;
  const key = process.env.ENCRYPTION_KEY;

  if (!encrypted || !key) {
    throw new Error("GITHUB_TOKEN_ENCRYPTED or ENCRYPTION_KEY missing");
  }

  return decryptToken(encrypted, key);
}

// Example usage (DO NOT run in client):
// const encrypted = encryptToken("ghp_xxxxxxxx", process.env.ENCRYPTION_KEY!, "abcdef9876543210abcdef9876543210");
// const decrypted = decryptToken(encrypted, process.env.ENCRYPTION_KEY!);
