/**
 * Step 32: System Recovery Code Encrypt Save
 * Generates encrypted recovery codes for CEO account
 */

import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { CEO_PROFILE } from "@/lib/ceo";

const ALGORITHM = "aes-256-cbc";
// Use master key hash as encryption key source (demo: fixed key)
const RECOVERY_ENCRYPTION_KEY = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"; // 64 hex

function encrypt(text: string, keyHex: string): string {
  const key = Buffer.from(keyHex, "hex");
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let enc = cipher.update(text, "utf8", "hex");
  enc += cipher.final("hex");
  return `${iv.toString("hex")}:${enc}`;
}

function decrypt(payload: string, keyHex: string): string {
  const [ivHex, encHex] = payload.split(":");
  if (!ivHex || !encHex) throw new Error("Invalid payload");
  const key = Buffer.from(keyHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  let dec = decipher.update(encHex, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

export interface RecoveryCode {
  id: string;
  codeEncrypted: string; // AES-256 encrypted
  createdAt: Date;
  createdBy: string;
  used: boolean;
  usedAt?: Date;
}

// Store encrypted codes
let recoveryCodes: RecoveryCode[] = [];

/**
 * Step 32: Generate 10 recovery codes and encrypt + save
 * Only CEO can generate
 */
export function generateRecoveryCodes(generatedByUsername: string, count = 10): { plainCodes: string[]; encryptedCount: number } {
  if (generatedByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can generate recovery codes");
  }

  const plainCodes: string[] = [];
  const newCodes: RecoveryCode[] = [];

  for (let i = 0; i < count; i++) {
    const plain = `RC-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
    plainCodes.push(plain);
    const encrypted = encrypt(plain, RECOVERY_ENCRYPTION_KEY);
    newCodes.push({
      id: `rc_${Date.now()}_${i}`,
      codeEncrypted: encrypted,
      createdAt: new Date(),
      createdBy: generatedByUsername,
      used: false,
    });
  }

  // Replace old unused codes
  recoveryCodes = [...recoveryCodes.filter((c) => c.used), ...newCodes];

  return { plainCodes, encryptedCount: newCodes.length };
}

/**
 * Verify recovery code (decrypt and compare)
 */
export function verifyRecoveryCode(candidate: string): boolean {
  for (const rc of recoveryCodes) {
    if (rc.used) continue;
    try {
      const plain = decrypt(rc.codeEncrypted, RECOVERY_ENCRYPTION_KEY);
      if (plain === candidate) {
        rc.used = true;
        rc.usedAt = new Date();
        return true;
      }
    } catch {}
  }
  return false;
}

/**
 * Get recovery codes info (encrypted, without plain)
 */
export function getRecoveryCodesInfo(): Array<Omit<RecoveryCode, "codeEncrypted"> & { codePreview: string }> {
  return recoveryCodes.map((rc) => ({
    id: rc.id,
    createdAt: rc.createdAt,
    createdBy: rc.createdBy,
    used: rc.used,
    usedAt: rc.usedAt,
    codePreview: rc.used ? "USED" : "***-ENCRYPTED-***",
  }));
}

/**
 * Decrypt for CEO view (only CEO)
 */
export function decryptRecoveryCodes(requesterUsername: string): string[] {
  if (requesterUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can decrypt recovery codes");
  }
  return recoveryCodes.filter((c) => !c.used).map((rc) => decrypt(rc.codeEncrypted, RECOVERY_ENCRYPTION_KEY));
}

// Auto-generate initial codes for CEO
if (recoveryCodes.length === 0) {
  try {
    generateRecoveryCodes(CEO_PROFILE.username, 10);
  } catch {}
}
