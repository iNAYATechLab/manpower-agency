/**
 * Step 107: Super Admin Access Interceptor
 */

import { type JWTPayload } from "@/lib/auth/session";
import { CEO_PROFILE } from "@/lib/ceo";

export function isSuperAdmin(payload: JWTPayload | null): boolean {
  return !!payload && payload.username === CEO_PROFILE.username && payload.role === "super_admin" && payload.isSuperAdmin;
}

export function requireSuperAdmin(payload: JWTPayload | null): void {
  if (!isSuperAdmin(payload)) throw new Error("ACCESS_DENIED: Super Admin only");
}
