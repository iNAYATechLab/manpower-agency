/**
 * Step 22: Super Admin Role Provider
 * Provides RBAC for 5 roles with super_admin at top
 */

import { CEO_PROFILE } from "@/lib/ceo";

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  AGENCY_ADMIN: "agency_admin",
  CLIENT: "client",
  FIELD_SUPERVISOR: "field_supervisor",
  WORKER: "worker",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HIERARCHY: Record<Role, number> = {
  super_admin: 100,
  agency_admin: 80,
  client: 60,
  field_supervisor: 40,
  worker: 20,
};

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  super_admin: ["*"], // Unrestricted - Step 25
  agency_admin: [
    "agency:read",
    "agency:write",
    "workers:*",
    "clients:*",
    "projects:*",
    "timesheets:*",
    "payroll:*",
    "invoices:*",
  ],
  client: ["projects:read", "timesheets:approve", "invoices:read", "workers:read"],
  field_supervisor: ["timesheets:write", "attendance:write", "workers:read"],
  worker: ["profile:read", "payslip:read", "timesheet:read", "documents:read"],
};

export interface RoleProvider {
  role: Role;
  permissions: string[];
  isSuperAdmin: boolean;
  canAccess(permission: string): boolean;
  canImpersonate(targetRole: Role): boolean;
  hierarchyLevel: number;
}

/**
 * Step 22: Super Admin Role Provider
 */
export function createRoleProvider(role: Role, username?: string): RoleProvider {
  const isSuperAdmin = role === ROLES.SUPER_ADMIN && username === CEO_PROFILE.username;
  const permissions = isSuperAdmin ? ["*"] : ROLE_PERMISSIONS[role] || [];

  return {
    role,
    permissions,
    isSuperAdmin,
    hierarchyLevel: ROLE_HIERARCHY[role] || 0,
    canAccess(permission: string): boolean {
      if (permissions.includes("*")) return true;
      if (permissions.includes(permission)) return true;
      // Check wildcard patterns like "workers:*"
      const [resource] = permission.split(":");
      return permissions.some((p) => p === `${resource}:*` || p === "*");
    },
    canImpersonate(targetRole: Role): boolean {
      // Only super_admin (CEO) can impersonate - Step 33
      if (!isSuperAdmin) return false;
      return ROLE_HIERARCHY[targetRole] !== undefined;
    },
  };
}

/**
 * React Context Provider placeholder (for App Router)
 * Usage: <RoleProvider role="super_admin" username="CEO">
 */
export function isSuperAdminRole(role: string, username?: string): boolean {
  return role === ROLES.SUPER_ADMIN && username === "CEO";
}
