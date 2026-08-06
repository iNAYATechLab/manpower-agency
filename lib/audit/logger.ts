/**
 * Step 27: System Audit Log - CEO Activity Tracker Backend
 * Tracks all CEO actions in system audit_logs
 */

import { CEO_PROFILE } from "@/lib/ceo";
import type { AuditLog } from "@/lib/db/types";

// In-memory store (will be replaced by DB in Phase 2.5 with Prisma)
const auditLogs: AuditLog[] = [];

export type AuditAction =
  | "CEO_LOGIN"
  | "CEO_LOGOUT"
  | "CEO_VIEW_DASHBOARD"
  | "CEO_UPDATE_CONFIG"
  | "CEO_IMPERSONATE"
  | "CEO_VIEW_AGENCY"
  | "CEO_MANAGE_LICENSE"
  | "CEO_TRIGGER_BACKUP"
  | "CEO_BROADCAST_NOTIFICATION"
  | "CEO_TOGGLE_FEATURE_FLAG"
  | "CEO_VIEW_HEALTH"
  | "SYSTEM_BACKUP"
  | "SYSTEM_HEALTH_CHECK";

export interface CreateAuditLogInput {
  userId: string;
  username: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Step 27: Create audit log entry
 */
export function createAuditLog(input: CreateAuditLogInput): AuditLog {
  const log: AuditLog = {
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId: input.userId,
    username: input.username,
    action: input.action,
    resource: input.resource,
    resourceId: input.resourceId,
    details: input.details,
    ipAddress: input.ipAddress || "127.0.0.1",
    userAgent: input.userAgent || "system",
    timestamp: new Date(),
  };
  auditLogs.push(log);

  // Also log to console for CEO tracking
  if (input.username === CEO_PROFILE.username) {
    // eslint-disable-next-line no-console
    console.log(`[AUDIT][CEO] ${input.action} on ${input.resource} at ${log.timestamp.toISOString()}`);
  }

  return log;
}

/**
 * Log CEO activity specifically
 */
export function logCEOActivity(
  action: AuditAction,
  resource: string,
  details?: Record<string, unknown>
): AuditLog {
  return createAuditLog({
    userId: CEO_PROFILE.id,
    username: CEO_PROFILE.username,
    action,
    resource,
    details,
  });
}

/**
 * Get audit logs with filters
 */
export function getAuditLogs(filters?: {
  username?: string;
  action?: AuditAction;
  resource?: string;
  limit?: number;
  offset?: number;
}): AuditLog[] {
  let filtered = [...auditLogs];
  if (filters?.username) filtered = filtered.filter((l) => l.username === filters.username);
  if (filters?.action) filtered = filtered.filter((l) => l.action === filters.action);
  if (filters?.resource) filtered = filtered.filter((l) => l.resource === filters.resource);
  if (filters?.offset) filtered = filtered.slice(filters.offset);
  if (filters?.limit) filtered = filtered.slice(0, filters.limit);
  // Latest first
  return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

/**
 * Get CEO-specific logs
 */
export function getCEOAuditLogs(limit = 50): AuditLog[] {
  return getAuditLogs({ username: CEO_PROFILE.username, limit });
}

/**
 * Clear logs (only for testing, firewall prevents CEO log deletion in prod)
 */
export function clearAuditLogs(requesterUsername: string): void {
  if (requesterUsername === CEO_PROFILE.username) {
    throw new Error("FIREWALL: Cannot clear audit logs containing CEO activity");
  }
  auditLogs.length = 0;
}

// Seed initial CEO login log
if (auditLogs.length === 0) {
  logCEOActivity("CEO_LOGIN", "system", { phase: "Phase 1 Complete", version: "v1.0.0" });
}
