/**
 * Step 101: Supabase Auth/JWT based Session Manager
 * Handles JWT create/verify, session store, refresh
 * Uses Node crypto (HS256) - no external deps, Supabase-compatible
 */

import { createHmac } from "crypto";

const JWT_SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev_auth_secret_32_chars_minimum_required_here";
const JWT_EXPIRES_IN = 60 * 60; // 1 hour
const REFRESH_EXPIRES_IN = 7 * 24 * 60 * 60; // 7 days

export interface JWTPayload {
  sub: string; // userId
  username: string;
  role: string;
  agencyId?: string | null;
  email: string;
  isSuperAdmin: boolean;
  iat: number;
  exp: number;
  jti: string; // JWT ID for rotation
}

export interface Session {
  userId: string;
  username: string;
  role: string;
  agencyId?: string | null;
  email: string;
  isSuperAdmin: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

// In-memory refresh store (Redis in production)
const refreshStore = new Map<string, { userId: string; expiresAt: Date }>();

function base64UrlEncode(str: string): string {
  return Buffer.from(str).toString("base64url");
}

function base64UrlDecode(str: string): string {
  return Buffer.from(str, "base64url").toString("utf8");
}

function sign(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

/**
 * Step 101: Create JWT
 */
export function createJWT(payload: Omit<JWTPayload, "iat" | "exp" | "jti">, expiresInSec = JWT_EXPIRES_IN): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const jti = Math.random().toString(36).slice(2, 10);
  const fullPayload: JWTPayload = { ...payload, iat: now, exp: now + expiresInSec, jti };
  const payloadB64 = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = sign(`${header}.${payloadB64}`, JWT_SECRET);
  return `${header}.${payloadB64}.${signature}`;
}

/**
 * Verify JWT
 */
export function verifyJWT(token: string): JWTPayload | null {
  try {
    const [header, payloadB64, signature] = token.split(".");
    if (!header || !payloadB64 || !signature) return null;
    const expectedSig = sign(`${header}.${payloadB64}`, JWT_SECRET);
    if (signature !== expectedSig) return null;
    const payload: JWTPayload = JSON.parse(base64UrlDecode(payloadB64));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Create session (access + refresh)
 */
export function createSession(user: { id: string; username: string; role: string; agencyId?: string | null; email: string; isSuperAdmin: boolean }): Session {
  const accessToken = createJWT(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
      agencyId: user.agencyId,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
    },
    JWT_EXPIRES_IN
  );
  const refreshToken = createJWT(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
      agencyId: user.agencyId,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
    },
    REFRESH_EXPIRES_IN
  );
  // Store refresh
  const payload = verifyJWT(refreshToken)!;
  refreshStore.set(payload.jti, { userId: user.id, expiresAt: new Date(payload.exp * 1000) });

  return {
    userId: user.id,
    username: user.username,
    role: user.role,
    agencyId: user.agencyId,
    email: user.email,
    isSuperAdmin: user.isSuperAdmin,
    accessToken,
    refreshToken,
    expiresAt: new Date(Date.now() + JWT_EXPIRES_IN * 1000),
  };
}

/**
 * Get session from request (Authorization header or cookie)
 */
export function getSessionFromToken(token?: string): JWTPayload | null {
  if (!token) return null;
  const clean = token.replace(/^Bearer\s+/i, "");
  return verifyJWT(clean);
}

/**
 * Invalidate refresh token (logout)
 */
export function invalidateRefreshToken(jti: string): void {
  refreshStore.delete(jti);
}
