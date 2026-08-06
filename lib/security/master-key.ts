/**
 * Step 31: Master Security Key Generate
 * Generates and manages master security key for system-wide encryption
 */

import { randomBytes, createHash } from "crypto";
import { CEO_PROFILE } from "@/lib/ceo";

export interface MasterSecurityKey {
  id: string;
  key: string; // Encrypted master key (never expose plain)
  keyHash: string; // SHA256 hash for verification
  createdAt: Date;
  createdBy: string; // CEO username
  version: number;
  isActive: boolean;
}

// In-memory store (DB + HSM in production)
let currentMasterKey: MasterSecurityKey | null = null;
const keyHistory: MasterSecurityKey[] = [];

/**
 * Step 31: Generate master security key (256-bit + metadata)
 * Only CEO can generate
 */
export function generateMasterSecurityKey(generatedByUsername: string): MasterSecurityKey {
  if (generatedByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can generate master security key");
  }

  const rawKey = randomBytes(32).toString("hex"); // 64 hex = 256 bits
  const keyHash = createHash("sha256").update(rawKey).digest("hex");

  const newKey: MasterSecurityKey = {
    id: `msk_${Date.now()}_${randomBytes(4).toString("hex")}`,
    key: rawKey, // In prod, encrypt with HSM before storing
    keyHash,
    createdAt: new Date(),
    createdBy: generatedByUsername,
    version: (currentMasterKey?.version ?? 0) + 1,
    isActive: true,
  };

  if (currentMasterKey) {
    currentMasterKey.isActive = false;
    keyHistory.push({ ...currentMasterKey });
  }

  currentMasterKey = newKey;
  return { ...newKey };
}

/**
 * Get current master key (hash only, never plain)
 */
export function getMasterKeyInfo(): Omit<MasterSecurityKey, "key"> | null {
  if (!currentMasterKey) return null;
  const { key, ...info } = currentMasterKey;
  return info;
}

/**
 * Rotate master key
 */
export function rotateMasterKey(username: string): MasterSecurityKey {
  return generateMasterSecurityKey(username);
}

/**
 * Verify master key by hash
 */
export function verifyMasterKey(candidateKey: string): boolean {
  if (!currentMasterKey) return false;
  const hash = createHash("sha256").update(candidateKey).digest("hex");
  return hash === currentMasterKey.keyHash;
}

// Auto-generate for CEO on first load if not exists
if (!currentMasterKey) {
  try {
    generateMasterSecurityKey(CEO_PROFILE.username);
  } catch {}
}
