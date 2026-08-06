/**
 * Step 130: Authentication Audit Logger Ready
 * Logs all auth events to audit_logs + system logs
 */

import { logLoginAttempt } from "@/lib/auth/login-tracking";
import { createAuditLog } from "@/lib/audit/logger";

export type AuthAuditEvent =
  | "SIGNIN_SUCCESS"
  | "SIGNIN_FAIL"
  | "SIGNUP_SUCCESS"
  | "SIGNOUT"
  | "PASSWORD_RESET_REQUEST"
  | "PASSWORD_RESET_SUCCESS"
  | "2FA_ENABLED"
  | "2FA_VERIFIED"
  | "OAUTH_LOGIN"
  | "ACCOUNT_LOCKED"
  | "BRUTE_FORCE_BLOCKED";

export function auditAuthEvent(input: {
  event: AuthAuditEvent;
  username: string;
  userId?: string;
  ip: string;
  userAgent?: string;
  details?: Record<string, unknown>;
}): void {
  const success = !["SIGNIN_FAIL", "ACCOUNT_LOCKED", "BRUTE_FORCE_BLOCKED"].includes(input.event);

  // Login tracking
  logLoginAttempt({
    username: input.username,
    userId: input.userId,
    ip: input.ip,
    userAgent: input.userAgent,
    success,
  });

  // Audit log
  createAuditLog({
    userId: input.userId || "unknown",
    username: input.username,
    action: input.event as never,
    resource: "auth",
    details: { ip: input.ip, ...input.details },
    ipAddress: input.ip,
    userAgent: input.userAgent,
  });

  console.log(`[AUTH_AUDIT] ${input.event} for ${input.username} from ${input.ip}`);
}
