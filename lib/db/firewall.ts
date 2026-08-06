/**
 * Step 24: Database Firewall Rules - Prevent CEO Delete/Truncate
 * DB-level protection against DELETE or TRUNCATE on CEO account
 */

import { CEO_USER, isNonDeletableUser, type User } from "@/lib/db/types";
import { CEO_PROFILE } from "@/lib/ceo";

export class DatabaseFirewallError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseFirewallError";
  }
}

export const FIREWALL_RULES = {
  // Step 24: Block CEO deletion
  blockCEOSoftDelete: {
    rule: "BLOCK_CEO_SOFT_DELETE",
    description: "Prevent soft-delete (deletedAt) on CEO account",
    protectedUsernames: ["CEO"] as const,
  },
  blockCEOHardDelete: {
    rule: "BLOCK_CEO_HARD_DELETE",
    description: "Prevent hard DELETE on CEO account",
    protectedUsernames: ["CEO"] as const,
  },
  blockCEOTuncate: {
    rule: "BLOCK_CEO_TRUNCATE",
    description: "Prevent TRUNCATE on users table if CEO exists",
    protectedUsernames: ["CEO"] as const,
  },
  blockCEOUpdateRole: {
    rule: "BLOCK_CEO_ROLE_DOWNGRADE",
    description: "Prevent downgrading CEO from super_admin",
  },
} as const;

/**
 * Step 24: Firewall - Check if DELETE is allowed
 */
export function canDeleteUser(user: Pick<User, "username" | "isNonDeletable" | "isSuperAdmin">): {
  allowed: boolean;
  reason?: string;
} {
  if (isNonDeletableUser(user)) {
    return {
      allowed: false,
      reason: `FIREWALL_BLOCK: User '${user.username}' is non-deletable (CEO/Super Admin). Rule: ${FIREWALL_RULES.blockCEOHardDelete.rule}`,
    };
  }
  return { allowed: true };
}

/**
 * Firewall - Check if TRUNCATE is allowed on users table
 */
export function canTruncateUsersTable(existingUsers: Pick<User, "username">[]): {
  allowed: boolean;
  reason?: string;
} {
  const hasCEO = existingUsers.some((u) => u.username === "CEO");
  if (hasCEO) {
    return {
      allowed: false,
      reason: `FIREWALL_BLOCK: Cannot TRUNCATE users table - protected CEO account exists. Rule: ${FIREWALL_RULES.blockCEOTuncate.rule}`,
    };
  }
  return { allowed: true };
}

/**
 * Firewall - Check if UPDATE role is allowed
 */
export function canUpdateUserRole(
  targetUser: Pick<User, "username" | "role">,
  newRole: string
): { allowed: boolean; reason?: string } {
  if (targetUser.username === CEO_PROFILE.username && newRole !== "super_admin") {
    return {
      allowed: false,
      reason: `FIREWALL_BLOCK: Cannot downgrade CEO from super_admin. Rule: ${FIREWALL_RULES.blockCEOUpdateRole.rule}`,
    };
  }
  return { allowed: true };
}

/**
 * Simulate DB trigger - to be used as Prisma middleware or DB trigger
 */
export function createFirewallMiddleware() {
  return {
    // Prisma Middleware style
    async beforeDelete(user: User): Promise<void> {
      const check = canDeleteUser(user);
      if (!check.allowed) throw new DatabaseFirewallError(check.reason!);
    },
    async beforeTruncate(users: User[]): Promise<void> {
      const check = canTruncateUsersTable(users);
      if (!check.allowed) throw new DatabaseFirewallError(check.reason!);
    },
    async beforeUpdateRole(user: User, newRole: string): Promise<void> {
      const check = canUpdateUserRole(user, newRole);
      if (!check.allowed) throw new DatabaseFirewallError(check.reason!);
    },
  };
}

// Example SQL triggers (for documentation - to be applied in real DB)
/*
-- PostgreSQL triggers for Step 24
CREATE OR REPLACE FUNCTION prevent_ceo_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.username = 'CEO' THEN
    RAISE EXCEPTION 'FIREWALL_BLOCK: CEO account cannot be deleted';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER block_ceo_delete
BEFORE DELETE ON users
FOR EACH ROW EXECUTE FUNCTION prevent_ceo_delete();

-- Prevent TRUNCATE via event trigger
CREATE OR REPLACE FUNCTION prevent_users_truncate()
RETURNS event_trigger AS $$
BEGIN
  RAISE EXCEPTION 'FIREWALL_BLOCK: TRUNCATE on users blocked - CEO exists';
END;
$$ LANGUAGE plpgsql;
*/
