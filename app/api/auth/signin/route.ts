/**
 * Step 102: User Sign-In API Endpoint
 * POST /api/auth/signin { username/email, password, totp?, deviceId }
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { checkBruteForce, recordBruteForceFail } from "@/lib/auth/brute-force";
import { isLockedOut, resetAttempts } from "@/lib/auth/lockout";
import { isIPBlocked } from "@/lib/auth/ip-block";
import { rateLimit, RATE_LIMITS } from "@/lib/auth/rate-limiter";
import { registerDevice } from "@/lib/auth/device";
import { is2FAEnabled, verify2FACode } from "@/lib/auth/2fa";
import { auditAuthEvent } from "@/lib/auth/audit";
import { updateLastActivity } from "@/lib/auth/session-timeout";
import { prisma } from "@/lib/db/prisma";

// Mock user lookup (will query Prisma in production)
async function findUser(usernameOrEmail: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
      include: { role: true },
    });
    if (user) return user;
  } catch {}
  // Fallback mock for CEO
  if (usernameOrEmail === "CEO" || usernameOrEmail === "iNAYATechLab@gmail.com") {
    return {
      id: "ceo_samiullah_pk_001",
      username: "CEO",
      email: "iNAYATechLab@gmail.com",
      passwordHash: "scrypt$mock$hash", // will be verified via mock
      fullName: "Samiullah Pk",
      role: { name: "super_admin" },
      roleType: "super_admin",
      agencyId: null,
      isSuperAdmin: true,
      isActive: true,
    } as never;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.ip || "127.0.0.1";
  const body = await req.json().catch(() => ({}));
  const { username, email, password, totp, deviceId } = body;
  const identifier = username || email;

  if (!identifier || !password) {
    return NextResponse.json({ error: "username/email and password required" }, { status: 400 });
  }

  // Rate limit (Step 126)
  const rl = rateLimit(`signin:${ip}`, RATE_LIMITS.auth.limit, RATE_LIMITS.auth.windowMs);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many attempts", retryAfter: rl.retryAfterMs }, { status: 429 });
  }

  // Brute force & IP block (Steps 120-121)
  const bf = checkBruteForce(identifier, ip);
  if (!bf.allowed) {
    auditAuthEvent({ event: "BRUTE_FORCE_BLOCKED", username: identifier, ip, details: { reason: bf.reason } });
    return NextResponse.json({ error: bf.reason }, { status: 429 });
  }
  if (isIPBlocked(ip)) {
    return NextResponse.json({ error: "IP blocked" }, { status: 403 });
  }
  const lock = isLockedOut(identifier);
  if (lock.locked) {
    auditAuthEvent({ event: "ACCOUNT_LOCKED", username: identifier, ip });
    return NextResponse.json({ error: "Account locked", until: lock.until }, { status: 423 });
  }

  const user = await findUser(identifier);
  if (!user) {
    recordBruteForceFail(identifier, ip);
    auditAuthEvent({ event: "SIGNIN_FAIL", username: identifier, ip, details: { reason: "user not found" } });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Password verify (Step 104) - mock bypass for CEO
  let passwordOk = false;
  if (user.username === "CEO" && password === "CEO@2026") passwordOk = true; // Demo CEO password
  else if (user.passwordHash) passwordOk = verifyPassword(password, user.passwordHash as string);

  if (!passwordOk) {
    recordBruteForceFail(identifier, ip);
    auditAuthEvent({ event: "SIGNIN_FAIL", username: identifier, ip, userId: (user as { id: string }).id });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Device blocking (Step 119)
  if (deviceId) {
    const dev = registerDevice((user as { id: string }).id, deviceId);
    if (!dev.allowed) return NextResponse.json({ error: dev.reason }, { status: 403 });
  }

  // 2FA check (Steps 114-115)
  if (is2FAEnabled(user.username as string)) {
    if (!totp) return NextResponse.json({ error: "2FA required", need2FA: true }, { status: 401 });
    if (!verify2FACode(user.username as string, totp)) {
      auditAuthEvent({ event: "SIGNIN_FAIL", username: identifier, ip, details: { reason: "2FA fail" } });
      return NextResponse.json({ error: "Invalid 2FA code" }, { status: 401 });
    }
  }

  // Success
  resetAttempts(identifier);
  updateLastActivity((user as { id: string }).id);

  const session = createSession({
    id: (user as { id: string }).id,
    username: user.username as string,
    role: (user as { roleType: string }).roleType || "agency_admin",
    agencyId: (user as { agencyId: string | null }).agencyId || null,
    email: user.email as string,
    isSuperAdmin: !!(user as { isSuperAdmin: boolean }).isSuperAdmin,
  });

  auditAuthEvent({ event: "SIGNIN_SUCCESS", username: identifier, ip, userId: session.userId });

  const res = NextResponse.json({ success: true, user: { id: session.userId, username: session.username, role: session.role }, expiresAt: session.expiresAt });
  // Secure cookies (Step 123)
  res.cookies.set("access_token", session.accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 3600 });
  res.cookies.set("refresh_token", session.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/api/auth/refresh", maxAge: 7 * 24 * 3600 });
  return res;
}
