/**
 * Step 105: Token Rotation & Refresh Logic
 */

import { createJWT, verifyJWT, type JWTPayload } from "@/lib/auth/session";

// Refresh store is in session.ts, but we need rotation logic here
const usedRefreshJtis = new Set<string>();

/**
 * Step 105: Rotate tokens - verify refresh, issue new access + refresh, invalidate old
 */
export function rotateTokens(refreshToken: string): { accessToken: string; refreshToken: string } | null {
  const payload = verifyJWT(refreshToken);
  if (!payload) return null;
  if (usedRefreshJtis.has(payload.jti)) return null; // Reuse detection

  usedRefreshJtis.add(payload.jti);

  // Issue new tokens with same user data but new jti/exp
  const now = Math.floor(Date.now() / 1000);
  const accessPayload = { sub: payload.sub, username: payload.username, role: payload.role, agencyId: payload.agencyId, email: payload.email, isSuperAdmin: payload.isSuperAdmin };
  const newAccess = createJWT(accessPayload, 60 * 60);
  const newRefresh = createJWT(accessPayload, 7 * 24 * 60 * 60);

  return { accessToken: newAccess, refreshToken: newRefresh };
}

/**
 * Verify access token wrapper
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  return verifyJWT(token);
}
