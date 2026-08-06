/**
 * Step 106: RBAC Middleware
 * Checks role + permission for API routes
 */

import { type JWTPayload } from "@/lib/auth/session";
import { createRoleProvider } from "@/lib/auth/roles";

export interface RBACResult {
  allowed: boolean;
  reason: string;
  payload?: JWTPayload;
}

export function checkRBAC(
  payload: JWTPayload | null,
  requiredRole?: string,
  requiredPermission?: string
): RBACResult {
  if (!payload) return { allowed: false, reason: "No session" };
  if (requiredRole && payload.role !== requiredRole && payload.role !== "super_admin") {
    // super_admin bypasses role check
    if (payload.role !== "super_admin") return { allowed: false, reason: `Need role ${requiredRole}` };
  }
  if (requiredPermission) {
    const provider = createRoleProvider(payload.role as never, payload.username);
    if (!provider.canAccess(requiredPermission)) return { allowed: false, reason: `Missing ${requiredPermission}` };
  }
  return { allowed: true, reason: "OK", payload };
}
