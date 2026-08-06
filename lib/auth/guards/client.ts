/**
 * Step 109: Client Portal Route Guard
 */

import { type JWTPayload } from "@/lib/auth/session";

export function isClient(payload: JWTPayload | null): boolean {
  return !!payload && (payload.role === "client" || payload.isSuperAdmin);
}

export function requireClient(payload: JWTPayload | null): void {
  if (!isClient(payload)) throw new Error("ACCESS_DENIED: Client only");
}
