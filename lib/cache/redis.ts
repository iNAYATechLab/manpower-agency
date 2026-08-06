/**
 * Step 283: Caching Layer (Redis) Setup
 * Simulated Redis client (in prod use `ioredis` or `upstash-redis`)
 */

type CacheValue = string | number | object;

const cache = new Map<string, { value: CacheValue; expiresAt: number }>();

export async function redisGet<T extends CacheValue>(key: string): Promise<T | null> {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value as T;
}

export async function redisSet(key: string, value: CacheValue, ttlSeconds = 3600): Promise<void> {
  cache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

export async function redisDel(key: string): Promise<void> {
  cache.delete(key);
}

export async function redisFlush(): Promise<void> {
  cache.clear();
}

export function getCacheStats(): { size: number; keys: string[] } {
  return { size: cache.size, keys: Array.from(cache.keys()) };
}

// Example usage:
// await redisSet("agency:123:workers", workers, 60);
// const cached = await redisGet("agency:123:workers");
