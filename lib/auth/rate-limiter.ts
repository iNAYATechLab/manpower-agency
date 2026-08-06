/**
 * Step 126: API Rate Limiter
 */

const buckets = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfterMs?: number;
}

export function rateLimit(
  key: string,
  limit = 60,
  windowMs = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  const remaining = Math.max(0, limit - bucket.count);
  const allowed = bucket.count <= limit;
  return {
    allowed,
    remaining,
    resetAt: new Date(bucket.resetAt),
    retryAfterMs: allowed ? undefined : bucket.resetAt - now,
  };
}

// Presets
export const RATE_LIMITS = {
  auth: { limit: 5, windowMs: 15 * 60 * 1000 }, // 5 per 15 min
  api: { limit: 60, windowMs: 60 * 1000 }, // 60 per min
  upload: { limit: 10, windowMs: 60 * 1000 },
};
