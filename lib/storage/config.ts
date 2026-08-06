/**
 * Steps 93-95: Central File Storage Buckets + Security Policies
 */

// Step 93: Buckets
export const STORAGE_BUCKETS = {
  private: "private-documents", // Encrypted, CEO/worker docs, passport, akama
  public: "public-assets", // Logos, avatars, public images
  temp: "temp-uploads", // Temp before processing
} as const;

export type BucketName = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

// Step 94: Security policies per bucket
export const BUCKET_POLICIES = {
  [STORAGE_BUCKETS.private]: {
    public: false,
    allowedRoles: ["super_admin", "agency_admin", "worker"] as const,
    encryption: "AES-256-CBC" as const,
    maxSizeMB: 10,
    allowedMimeTypes: ["application/pdf", "image/jpeg", "image/png", "application/octet-stream"],
  },
  [STORAGE_BUCKETS.public]: {
    public: true,
    allowedRoles: ["*"] as const,
    encryption: null,
    maxSizeMB: 5,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  },
  [STORAGE_BUCKETS.temp]: {
    public: false,
    allowedRoles: ["agency_admin", "field_supervisor"] as const,
    encryption: null,
    maxSizeMB: 20,
    allowedMimeTypes: ["*"] as const,
    autoDeleteHours: 24,
  },
} as const;

// Step 95: Private vs Public permission check
export function canAccessBucket(bucket: BucketName, userRole: string, isSuperAdmin: boolean): boolean {
  if (isSuperAdmin) return true;
  const policy = BUCKET_POLICIES[bucket];
  if (!policy) return false;
  if (policy.allowedRoles.includes("*" as never)) return true;
  return (policy.allowedRoles as readonly string[]).includes(userRole);
}

export function isPrivateBucket(bucket: BucketName): boolean {
  return !BUCKET_POLICIES[bucket]?.public;
}
