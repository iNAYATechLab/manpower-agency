/**
 * Step 104: Password Hashing (Bcrypt/Argon2) - Configured via Node crypto scrypt
 * Uses scrypt with salt (Bcrypt/Argon2 compatible interface)
 */

import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const SCRYPT_KEYLEN = 64;
const SCRYPT_SALT_BYTES = 16;

/**
 * Step 104: Hash password (Bcrypt/Argon2 style)
 * Format: scrypt$<salt_hex>$<hash_hex>
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(SCRYPT_SALT_BYTES).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

/**
 * Verify password
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [algo, salt, hash] = storedHash.split("$");
    if (algo !== "scrypt" || !salt || !hash) return false;
    const derived = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
    const a = Buffer.from(hash, "hex");
    const b = Buffer.from(derived, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Check password strength
 */
export function isStrongPassword(password: string): { ok: boolean; reason?: string } {
  if (password.length < 8) return { ok: false, reason: "At least 8 characters" };
  if (!/[A-Z]/.test(password)) return { ok: false, reason: "Need uppercase" };
  if (!/[a-z]/.test(password)) return { ok: false, reason: "Need lowercase" };
  if (!/[0-9]/.test(password)) return { ok: false, reason: "Need number" };
  return { ok: true };
}
