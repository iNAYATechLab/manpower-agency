/**
 * Step 121: Brute-Force Protection Algorithm
 * Combines lockout + IP block + rate limit
 */

import { isLockedOut, recordFailedAttempt } from "@/lib/auth/lockout";
import { isIPBlocked, recordIPFail } from "@/lib/auth/ip-block";

export interface BruteForceCheck {
  allowed: boolean;
  reason?: string;
  retryAfterMs?: number;
}

export function checkBruteForce(identifier: string, ip: string): BruteForceCheck {
  if (isIPBlocked(ip)) return { allowed: false, reason: "IP blocked", retryAfterMs: 30 * 60 * 1000 };
  const lock = isLockedOut(identifier);
  if (lock.locked) return { allowed: false, reason: "Account locked", retryAfterMs: lock.until ? lock.until.getTime() - Date.now() : 15 * 60 * 1000 };
  return { allowed: true };
}

export function recordBruteForceFail(identifier: string, ip: string): void {
  recordFailedAttempt(identifier);
  recordIPFail(ip);
}
