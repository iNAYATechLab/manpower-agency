/**
 * Step 118: Session Timeout Interceptor
 */

export const SESSION_TIMEOUT_MINUTES = 30;
const lastActivity = new Map<string, number>(); // userId -> timestamp

export function updateLastActivity(userId: string): void {
  lastActivity.set(userId, Date.now());
}

export function isSessionTimedOut(userId: string, timeoutMinutes = SESSION_TIMEOUT_MINUTES): boolean {
  const last = lastActivity.get(userId);
  if (!last) return false;
  return Date.now() - last > timeoutMinutes * 60 * 1000;
}

export function checkSessionTimeout(userId: string): { timedOut: boolean; remainingMs: number } {
  const last = lastActivity.get(userId) || Date.now();
  const elapsed = Date.now() - last;
  const timeoutMs = SESSION_TIMEOUT_MINUTES * 60 * 1000;
  return { timedOut: elapsed > timeoutMs, remainingMs: Math.max(0, timeoutMs - elapsed) };
}
