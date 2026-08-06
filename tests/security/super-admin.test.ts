/**
 * Step 278: Super Admin Non-Deletable Feature Validation Test
 */
import { describe, it, expect } from "vitest";
import { isNonDeletableUser, CEO_USER } from "@/lib/db/types";
import { CEO_PROFILE } from "@/lib/ceo";

describe("Super Admin Non-Deletable", () => {
  it("should mark CEO as non-deletable", () => {
    expect(isNonDeletableUser(CEO_USER)).toBe(true);
    expect(CEO_USER.isNonDeletable).toBe(true);
    expect(CEO_USER.username).toBe("CEO");
  });

  it("should validate CEO profile", () => {
    expect(CEO_PROFILE.username).toBe("CEO");
    expect(CEO_PROFILE.isNonDeletable).toBe(true);
    expect(CEO_PROFILE.isFounder).toBe(true);
  });

  it("should block CEO deletion via firewall", async () => {
    const { canDeleteUser } = await import("@/lib/db/firewall");
    const result = canDeleteUser(CEO_USER);
    expect(result.allowed).toBe(false);
  });
});
