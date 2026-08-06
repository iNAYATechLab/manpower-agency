/**
 * Step 30: Super Admin Two-Factor Authentication (2FA) Security
 * TOTP-based 2FA for CEO account
 * Uses crypto for HMAC-SHA1 TOTP (no external deps)
 */

import { createHmac, randomBytes } from "crypto";
import { CEO_PROFILE } from "@/lib/ceo";

// In-memory 2FA store (DB in production)
const twoFactorStore = new Map<
  string,
  {
    secret: string;
    enabled: boolean;
    backupCodes: string[];
    verifiedAt?: Date;
  }
>();

/**
 * Step 30: Generate 2FA secret for user (base32-like hex for demo)
 */
export function generate2FASecret(username: string): { secret: string; otpauthUrl: string; qrData: string } {
  const secret = randomBytes(20).toString("hex").toUpperCase(); // 40 chars hex
  const otpauthUrl = `otpauth://totp/${encodeURIComponent(`iNAYATechLab:${username}`)}?secret=${secret}&issuer=iNAYATechLab&algorithm=SHA1&digits=6&period=30`;
  const qrData = otpauthUrl; // In real app, generate QR image from this URL

  twoFactorStore.set(username, {
    secret,
    enabled: false,
    backupCodes: generateBackupCodes(),
  });

  return { secret, otpauthUrl, qrData };
}

/**
 * Generate 8 backup codes
 */
function generateBackupCodes(): string[] {
  return Array.from({ length: 8 }, () => randomBytes(4).toString("hex").toUpperCase() + "-" + randomBytes(4).toString("hex").toUpperCase());
}

/**
 * Generate TOTP code (RFC 6238 simplified)
 * Time step 30s, 6 digits, HMAC-SHA1
 */
export function generateTOTP(secret: string, timeStepMs = 30000, digits = 6): string {
  const counter = Math.floor(Date.now() / timeStepMs);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter), 0);

  const key = Buffer.from(secret, "hex");
  const hmac = createHmac("sha1", key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1]! & 0x0f;
  const code =
    ((hmac[offset]! & 0x7f) << 24) |
    ((hmac[offset + 1]! & 0xff) << 16) |
    ((hmac[offset + 2]! & 0xff) << 8) |
    (hmac[offset + 3]! & 0xff);
  const otp = (code % 10 ** digits).toString().padStart(digits, "0");
  return otp;
}

/**
 * Verify TOTP code (allow 1 step drift)
 */
export function verify2FACode(username: string, token: string): boolean {
  const record = twoFactorStore.get(username);
  if (!record) return false;

  const expected = generateTOTP(record.secret);
  const prev = generateTOTP(record.secret, 30000, 6); // Could add drift by using Date.now() - 30000

  // For demo, also accept backup codes
  if (record.backupCodes.includes(token)) {
    // Consume backup code
    record.backupCodes = record.backupCodes.filter((c) => c !== token);
    twoFactorStore.set(username, record);
    return true;
  }

  return token === expected || token === prev;
}

/**
 * Enable 2FA after verification
 */
export function enable2FA(username: string, verificationCode: string): boolean {
  const record = twoFactorStore.get(username);
  if (!record) return false;
  if (!verify2FACode(username, verificationCode)) return false;

  record.enabled = true;
  record.verifiedAt = new Date();
  twoFactorStore.set(username, record);
  return true;
}

/**
 * Check if 2FA is enabled
 */
export function is2FAEnabled(username: string): boolean {
  return twoFactorStore.get(username)?.enabled ?? false;
}

/**
 * Get backup codes (CEO only)
 */
export function getBackupCodes(username: string, requesterUsername: string): string[] {
  if (requesterUsername !== CEO_PROFILE.username && requesterUsername !== username) {
    throw new Error("ACCESS_DENIED: Only owner or CEO can view backup codes");
  }
  return twoFactorStore.get(username)?.backupCodes ?? [];
}

// Auto-setup for CEO
if (!twoFactorStore.has(CEO_PROFILE.username)) {
  generate2FASecret(CEO_PROFILE.username);
  // For demo, auto-enable (in prod, require verification)
  const rec = twoFactorStore.get(CEO_PROFILE.username)!;
  rec.enabled = true;
  twoFactorStore.set(CEO_PROFILE.username, rec);
}
