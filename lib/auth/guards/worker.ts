/**
 * Step 111: Worker Access Level Control
 */

import { type JWTPayload } from "@/lib/auth/session";

export function isWorker(payload: JWTPayload | null): boolean {
  return !!payload && (payload.role === "worker" || payload.isSuperAdmin);
}

export function requireWorker(payload: JWTPayload | null): void {
  if (!isWorker(payload)) throw new Error("ACCESS_DENIED: Worker only");
}

export function canWorkerAccessOwnData(payload: JWTPayload | null, workerId: string): boolean {
  if (!payload) return false;
  if (payload.isSuperAdmin) return true;
  // Worker can only access own data (userId == workerId or via link)
  return payload.sub === workerId;
}
