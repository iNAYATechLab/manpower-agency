/**
 * Step 21 & 26: CEO Super Admin Profile - Samiullah Pk
 * Unique Super Admin Profile Generator for username `CEO`
 * Non-deletable, unrestricted, founder metadata binding
 */

export const CEO_PROFILE = {
  // Step 21: Unique username `CEO`
  username: "CEO" as const,
  // Step 26: Samiullah Pk (CEO and Founder) metadata
  fullName: "Samiullah Pk" as const,
  role: "super_admin" as const,
  title: "CEO and Founder" as const,
  company: "iNAYATechLab Inc." as const,
  email: "iNAYATechLab@gmail.com" as const,
  // System identifiers
  id: "ceo_samiullah_pk_001" as const,
  isFounder: true,
  isSuperAdmin: true,
  isNonDeletable: true, // Step 23
  isUnique: true, // Only one CEO in system
  // Profile details
  avatar: "/avatars/ceo-samiullah-pk.png",
  bio: "Founder & CEO of iNAYATechLab Inc. - Building Enterprise Manpower SaaS for global workforce management.",
  joinedAt: new Date("2026-08-01T00:00:00.000Z"),
  // Security
  twoFactorEnabled: true, // Step 30
  masterKeyId: "msk_ceo_001", // Step 31
  // Permissions - Step 25: Unrestricted
  permissions: ["*"] as const, // Wildcard = unrestricted
  // Audit
  auditEnabled: true,
} as const;

export type CEOProfile = typeof CEO_PROFILE;

/**
 * Step 21: Generate unique super admin profile
 * Ensures only one CEO account can exist
 */
export function generateCEOProfile(): CEOProfile {
  return CEO_PROFILE;
}

/**
 * Validate CEO username is exactly "CEO" (case-sensitive, unique)
 */
export function isCEOUsername(username: string): boolean {
  return username === "CEO";
}

/**
 * Validate CEO profile integrity
 */
export function validateCEOProfile(profile: Partial<CEOProfile>): boolean {
  return (
    profile.username === "CEO" &&
    profile.fullName === "Samiullah Pk" &&
    profile.role === "super_admin" &&
    profile.isNonDeletable === true &&
    profile.isFounder === true
  );
}
