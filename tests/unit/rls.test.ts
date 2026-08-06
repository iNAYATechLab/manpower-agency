/**
 * Step 275: RLS Data Isolation Security Test
 */
import { describe, it, expect } from "vitest";
import { canDeleteUser, canTruncateUsersTable } from "@/lib/db/firewall";
import { validateAgencyAccess } from "@/lib/db/rls";

describe("RLS Data Isolation", () => {
  it("should block CEO delete", () => {
    const result = canDeleteUser({ username: "CEO", isNonDeletable: true, isSuperAdmin: true });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain("FIREWALL_BLOCK");
  });

  it("should allow normal user delete", () => {
    const result = canDeleteUser({ username: "john", isNonDeletable: false, isSuperAdmin: false });
    expect(result.allowed).toBe(true);
  });

  it("should block truncate if CEO exists", () => {
    const result = canTruncateUsersTable([{ username: "CEO" }, { username: "john" }]);
    expect(result.allowed).toBe(false);
  });

  it("should validate agency access for super_admin", async () => {
    const allowed = await validateAgencyAccess("agency1", null, true);
    expect(allowed).toBe(true);
  });

  it("should block cross-agency access", async () => {
    const allowed = await validateAgencyAccess("agency1", "agency2", false);
    expect(allowed).toBe(false);
  });
});
