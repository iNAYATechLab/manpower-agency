/**
 * Step 277: Role-Based Permission Access Audit
 */
import { describe, it, expect } from "vitest";
import { checkRBAC } from "@/lib/auth/rbac-middleware";
import { createJWT, verifyJWT } from "@/lib/auth/session";

describe("RBAC Access Audit", () => {
  const agencyAdminToken = createJWT({ sub: "1", username: "admin", role: "agency_admin", agencyId: "a1", email: "a@test.com", isSuperAdmin: false });
  const payload = verifyJWT(agencyAdminToken);

  it("should allow agency_admin to access workers:read", () => {
    const result = checkRBAC(payload, undefined, "workers:read");
    expect(result.allowed).toBe(true);
  });

  it("should deny worker to access payroll", () => {
    const workerPayload = { ...payload!, role: "worker" };
    const result = checkRBAC(workerPayload, undefined, "payroll:write");
    expect(result.allowed).toBe(false);
  });

  it("should allow super_admin to bypass", () => {
    const superPayload = { ...payload!, role: "super_admin", username: "CEO", isSuperAdmin: true };
    const result = checkRBAC(superPayload, "agency_admin", "any:permission");
    expect(result.allowed).toBe(true);
  });
});
