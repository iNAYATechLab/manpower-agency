/**
 * Step 127: Onboarding Email Verification Link Generator
 */

import { randomBytes, createHmac } from "crypto";

const VERIFY_SECRET = process.env.VERIFY_SECRET || "verify_secret_32_chars_min_here";

export function generateVerificationToken(email: string): { token: string; link: string; expiresAt: Date } {
  const token = randomBytes(32).toString("hex");
  const signature = createHmac("sha256", VERIFY_SECRET).update(`${email}:${token}`).digest("hex");
  const fullToken = `${token}.${signature}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  const link = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${fullToken}&email=${encodeURIComponent(email)}`;
  return { token: fullToken, link, expiresAt };
}

export function verifyVerificationToken(email: string, token: string): boolean {
  try {
    const [raw, sig] = token.split(".");
    if (!raw || !sig) return false;
    const expected = createHmac("sha256", VERIFY_SECRET).update(`${email}:${raw}`).digest("hex");
    return sig === expected;
  } catch {
    return false;
  }
}
