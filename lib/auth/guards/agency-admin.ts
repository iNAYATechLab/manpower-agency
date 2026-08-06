/**
 * Step 108: Agency Admin Access Guard
 */

import { type JWTPayload } from "@/lib/auth/session";

export function isAgencyAdmin(payload: JWTPayload | null): boolean {
  return !!payload && (payload.role === "agency_admin" || payload.isSuperAdmin);
}

export function requireAgencyAdmin(payload: JWTPayload | null): void {
  if (!isAgencyAdmin(payload)) throw new Error("ACCESS_DENIED: Agency Admin only");
  if (!payload?.agencyId && !payload?.isSuperAdmin) throw new Error("Agency context required");
}
