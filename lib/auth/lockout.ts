/**
 * Step 117: Account Lockout Security Logic
 */

const attempts = new Map<string, { count: number; firstAt: number; lockedUntil?: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const LOCKOUT_MS = 30 * 60 * 1000; // 30 min

export function recordFailedAttempt(identifier: string): { locked: boolean; remaining: number; lockedUntil?: Date } {
  const now = Date.now();
  const rec = attempts.get(identifier);
  if (!rec || now - rec.firstAt > WINDOW_MS) {
    attempts.set(identifier, { count: 1, firstAt: now });
    return { locked: false, remaining: MAX_ATTEMPTS - 1 };
  }
  rec.count += 1;
  if (rec.count >= MAX_ATTEMPTS) {
    rec.lockedUntil = now + LOCKOUT_MS;
    return { locked: true, remaining: 0, lockedUntil: new Date(rec.lockedUntil) };
  }
  return { locked: false, remaining: MAX_ATTEMPTS - rec.count };
}

export function isLockedOut(identifier: string): { locked: boolean; until?: Date } {
  const rec = attempts.get(identifier);
  if (!rec?.lockedUntil) return { locked: false };
  if (Date.now() > rec.lockedUntil) {
    attempts.delete(identifier);
    return { locked: false };
  }
  return { locked: true, until: new Date(rec.lockedUntil) };
}

export function resetAttempts(identifier: string): void {
  attempts.delete(identifier);
}
