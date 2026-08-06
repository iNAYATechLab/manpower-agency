/**
 * Step 25: Super Admin Unrestricted Access Permission
 * CEO has wildcard "*" - can access everything
 */

import { CEO_PROFILE } from "@/lib/ceo";
import { createRoleProvider, type Role } from "@/lib/auth/roles";

export const UNRESTRICTED_PERMISSION = "*" as const;

export interface PermissionCheck {
  allowed: boolean;
  reason: string;
  isSuperAdmin: boolean;
  permission: string;
}

/**
 * Step 25: Check if user has unrestricted access
 */
export function hasUnrestrictedAccess(username: string, role: string): boolean {
  return username === CEO_PROFILE.username && role === "super_admin";
}

/**
 * Check permission with super_admin bypass
 */
export function checkPermission(
  username: string,
  role: Role,
  requiredPermission: string
): PermissionCheck {
  const provider = createRoleProvider(role, username);
  const isSuperAdmin = provider.isSuperAdmin;

  // Step 25: Super admin bypasses all checks
  if (isSuperAdmin) {
    return {
      allowed: true,
      reason: "UNRESTRICTED: Super Admin (CEO) has wildcard access",
      isSuperAdmin: true,
      permission: requiredPermission,
    };
  }

  const allowed = provider.canAccess(requiredPermission);
  return {
    allowed,
    reason: allowed ? `GRANTED: Has ${requiredPermission}` : `DENIED: Missing ${requiredPermission}`,
    isSuperAdmin: false,
    permission: requiredPermission,
  };
}

/**
 * Middleware helper - throws if not allowed
 */
export function requirePermission(username: string, role: Role, permission: string): void {
  const check = checkPermission(username, role, permission);
  if (!check.allowed) {
    throw new Error(`ACCESS_DENIED: ${check.reason} (User: ${username}, Role: ${role})`);
  }
}

/**
 * Get all accessible resources for user
 */
export function getAccessibleResources(username: string, role: Role): string[] {
  if (hasUnrestrictedAccess(username, role)) {
    return ["* (All Resources - Super Admin)"];
  }
  const provider = createRoleProvider(role, username);
  return provider.permissions;
}
