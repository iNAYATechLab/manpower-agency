/**
 * Step 105: Token Rotation & Refresh Endpoint
 * POST /api/auth/refresh { refreshToken } -> new access + refresh
 */

import { NextRequest, NextResponse } from "next/server";
import { rotateTokens } from "@/lib/auth/token";
import { rateLimit, RATE_LIMITS } from "@/lib/auth/rate-limiter";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const token = body.refreshToken || req.cookies.get("refresh_token")?.value;

  if (!token) return NextResponse.json({ error: "refreshToken required" }, { status: 400 });

  const rl = rateLimit(`refresh:${token.slice(0, 10)}`, RATE_LIMITS.api.limit, RATE_LIMITS.api.windowMs);
  if (!rl.allowed) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  const rotated = rotateTokens(token);
  if (!rotated) return NextResponse.json({ error: "Invalid or reused refresh token" }, { status: 401 });

  const res = NextResponse.json({ success: true, accessToken: rotated.accessToken, refreshToken: rotated.refreshToken });
  res.cookies.set("access_token", rotated.accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 3600 });
  res.cookies.set("refresh_token", rotated.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/api/auth/refresh", maxAge: 7 * 24 * 3600 });
  return res;
}
