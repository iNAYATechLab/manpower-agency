/**
 * Step 129: Guest View Block Middleware
 */

import { type JWTPayload } from "@/lib/auth/session";

export function isGuest(payload: JWTPayload | null): boolean {
  return !payload;
}

export function requireAuth(payload: JWTPayload | null): void {
  if (isGuest(payload)) throw new Error("ACCESS_DENIED: Authentication required - Guest blocked");
}

export function blockGuestForRoute(route: string, payload: JWTPayload | null): { blocked: boolean; redirect?: string } {
  const publicRoutes = ["/", "/login", "/signup", "/verify-email", "/api/auth/signin", "/api/auth/signup"];
  if (publicRoutes.some((r) => route.startsWith(r))) return { blocked: false };
  if (isGuest(payload)) return { blocked: true, redirect: `/login?next=${encodeURIComponent(route)}` };
  return { blocked: false };
}
