/**
 * Step 33: User Impersonation (Admin Feature to View Other Agency)
 * Allows CEO to view as agency_admin/client etc.
 */

import { CEO_PROFILE } from "@/lib/ceo";
import { createRoleProvider, type Role } from "@/lib/auth/roles";
import { logCEOActivity } from "@/lib/audit/logger";

export interface ImpersonationSession {
  id: string;
  superAdminUsername: string; // CEO
  targetUsername: string;
  targetRole: Role;
  targetAgencyId?: string;
  startedAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

let activeSessions: ImpersonationSession[] = [];

/**
 * Step 33: Start impersonation (CEO only)
 */
export function startImpersonation(
  superAdminUsername: string,
  targetUsername: string,
  targetRole: Role,
  targetAgencyId?: string
): ImpersonationSession {
  if (superAdminUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can impersonate");
  }

  const provider = createRoleProvider("super_admin", superAdminUsername);
  if (!provider.canImpersonate(targetRole)) {
    throw new Error(`Cannot impersonate role: ${targetRole}`);
  }

  // End existing sessions for this super admin
  activeSessions = activeSessions.filter((s) => s.superAdminUsername !== superAdminUsername || !s.isActive);

  const session: ImpersonationSession = {
    id: `imp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    superAdminUsername,
    targetUsername,
    targetRole,
    targetAgencyId,
    startedAt: new Date(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    isActive: true,
  };

  activeSessions.push(session);

  logCEOActivity("CEO_IMPERSONATE", "impersonation", {
    targetUsername,
    targetRole,
    targetAgencyId,
    sessionId: session.id,
  });

  return session;
}

/**
 * Stop impersonation
 */
export function stopImpersonation(sessionId: string, requesterUsername: string): void {
  const session = activeSessions.find((s) => s.id === sessionId);
  if (!session) throw new Error("Session not found");
  if (session.superAdminUsername !== requesterUsername && requesterUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED");
  }
  session.isActive = false;
}

/**
 * Get active impersonation for user
 */
export function getActiveImpersonation(superAdminUsername: string): ImpersonationSession | null {
  const session = activeSessions.find((s) => s.superAdminUsername === superAdminUsername && s.isActive);
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    session.isActive = false;
    return null;
  }
  return session;
}

/**
 * Check if currently impersonating
 */
export function isImpersonating(superAdminUsername: string): boolean {
  return getActiveImpersonation(superAdminUsername) !== null;
}

/**
 * Get impersonated role provider (for permission checks during impersonation)
 */
export function getImpersonatedRoleProvider(superAdminUsername: string) {
  const session = getActiveImpersonation(superAdminUsername);
  if (!session) return null;
  return createRoleProvider(session.targetRole, session.targetUsername);
}
