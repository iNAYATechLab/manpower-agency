/**
 * Step 37: Notification Broadcast System
 * Allows CEO to broadcast to all agencies / roles
 */

import { CEO_PROFILE } from "@/lib/ceo";
import { logCEOActivity } from "@/lib/audit/logger";
import { logInfo } from "@/lib/logs/system-log";

export type BroadcastTarget = "all" | "agency_admins" | "clients" | "workers" | "specific_agency";
export type BroadcastPriority = "low" | "normal" | "high" | "critical";

export interface BroadcastNotification {
  id: string;
  title: string;
  message: string;
  target: BroadcastTarget;
  targetAgencyId?: string;
  priority: BroadcastPriority;
  createdBy: string; // CEO username
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  readBy: string[]; // userIds
}

const broadcasts: BroadcastNotification[] = [];

/**
 * Step 37: Create broadcast (CEO only)
 */
export function createBroadcast(input: {
  title: string;
  message: string;
  target: BroadcastTarget;
  targetAgencyId?: string;
  priority?: BroadcastPriority;
  expiresInHours?: number;
  createdByUsername: string;
}): BroadcastNotification {
  if (input.createdByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can broadcast");
  }

  const broadcast: BroadcastNotification = {
    id: `bc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    title: input.title,
    message: input.message,
    target: input.target,
    targetAgencyId: input.targetAgencyId,
    priority: input.priority || "normal",
    createdBy: input.createdByUsername,
    createdAt: new Date(),
    expiresAt: input.expiresInHours ? new Date(Date.now() + input.expiresInHours * 3600 * 1000) : undefined,
    isActive: true,
    readBy: [],
  };

  broadcasts.push(broadcast);

  logCEOActivity("CEO_BROADCAST_NOTIFICATION", "broadcast", {
    broadcastId: broadcast.id,
    target: broadcast.target,
    priority: broadcast.priority,
  });
  logInfo(`Broadcast created: ${broadcast.title} -> ${broadcast.target}`, "notifications", {
    broadcastId: broadcast.id,
  });

  return broadcast;
}

/**
 * Get broadcasts for a user (filtered by target)
 */
export function getBroadcastsForUser(
  userRole: string,
  agencyId?: string,
  limit = 20
): BroadcastNotification[] {
  let filtered = broadcasts.filter((b) => b.isActive && (!b.expiresAt || b.expiresAt > new Date()));

  // Filter by target (simplified)
  filtered = filtered.filter((b) => {
    if (b.target === "all") return true;
    if (b.target === "agency_admins" && userRole === "agency_admin") return true;
    if (b.target === "clients" && userRole === "client") return true;
    if (b.target === "workers" && userRole === "worker") return true;
    if (b.target === "specific_agency" && b.targetAgencyId === agencyId) return true;
    return false;
  });

  return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
}

/**
 * Mark as read
 */
export function markBroadcastRead(broadcastId: string, userId: string): void {
  const bc = broadcasts.find((b) => b.id === broadcastId);
  if (bc && !bc.readBy.includes(userId)) bc.readBy.push(userId);
}

/**
 * Get all broadcasts (CEO view)
 */
export function getAllBroadcasts(limit = 50): BroadcastNotification[] {
  return [...broadcasts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
}
