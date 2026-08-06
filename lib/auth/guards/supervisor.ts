/**
 * Step 110: Field Supervisor Route Security
 */

import { type JWTPayload } from "@/lib/auth/session";

export function isFieldSupervisor(payload: JWTPayload | null): boolean {
  return !!payload && (payload.role === "field_supervisor" || payload.isSuperAdmin);
}

export function requireSupervisor(payload: JWTPayload | null): void {
  if (!isFieldSupervisor(payload)) throw new Error("ACCESS_DENIED: Field Supervisor only");
}
