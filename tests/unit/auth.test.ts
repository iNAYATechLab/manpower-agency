/**
 * Step 272: Authentication API Unit Test
 */
import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createJWT, verifyJWT } from "@/lib/auth/session";

describe("Auth API", () => {
  it("should hash and verify password", () => {
    const hash = hashPassword("Test@1234");
    expect(verifyPassword("Test@1234", hash)).toBe(true);
    expect(verifyPassword("Wrong", hash)).toBe(false);
  });

  it("should create and verify JWT", () => {
    const token = createJWT({ sub: "user1", username: "test", role: "agency_admin", agencyId: "agency1", email: "test@test.com", isSuperAdmin: false });
    const payload = verifyJWT(token);
    expect(payload?.username).toBe("test");
    expect(payload?.role).toBe("agency_admin");
  });

  it("should reject invalid JWT", () => {
    expect(verifyJWT("invalid.token.here")).toBeNull();
  });
});
