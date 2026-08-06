/**
 * Step 23: Non-Deletable Database Flag
 * Database types with isNonDeletable flag for CEO account
 */

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  // Step 23: Non-Deletable flag
  isNonDeletable: boolean;
  isSuperAdmin: boolean;
  isActive: boolean;
  agencyId?: string | null; // null for super_admin (global)
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null; // Soft delete
  // Security
  twoFactorEnabled: boolean;
  masterKeyId?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface GlobalConfig {
  id: string;
  key: string;
  value: unknown;
  category: string;
  updatedBy: string; // CEO username
  updatedAt: Date;
}

export interface SystemHealth {
  cpuUsage: number;
  memoryUsage: number;
  uptime: number;
  timestamp: Date;
}

// Step 23: CEO user with non-deletable flag
export const CEO_USER: User = {
  id: "ceo_samiullah_pk_001",
  username: "CEO",
  email: "iNAYATechLab@gmail.com",
  fullName: "Samiullah Pk",
  role: "super_admin",
  isNonDeletable: true, // Step 23: Cannot be deleted
  isSuperAdmin: true,
  isActive: true,
  agencyId: null, // Global
  createdAt: new Date("2026-08-01T00:00:00.000Z"),
  updatedAt: new Date("2026-08-06T21:13:22.000Z"),
  deletedAt: null,
  twoFactorEnabled: true,
  masterKeyId: "msk_ceo_001",
};

/**
 * Step 23: Check if user is protected from deletion
 */
export function isNonDeletableUser(user: Pick<User, "username" | "isNonDeletable" | "isSuperAdmin">): boolean {
  if (user.username === "CEO") return true;
  if (user.isNonDeletable) return true;
  if (user.isSuperAdmin) return true;
  return false;
}
