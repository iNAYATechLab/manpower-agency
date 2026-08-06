/**
 * Step 124: CSRF Token Validation Middleware
 */

import { randomBytes, createHmac } from "crypto";

const CSRF_SECRET = process.env.CSRF_SECRET || "csrf_secret_32_chars_min_here_1234";

export function generateCSRFToken(sessionId: string): string {
  const token = randomBytes(32).toString("hex");
  const signature = createHmac("sha256", CSRF_SECRET).update(`${sessionId}:${token}`).digest("hex");
  return `${token}.${signature}`;
}

export function verifyCSRFToken(sessionId: string, csrfToken: string): boolean {
  try {
    const [token, sig] = csrfToken.split(".");
    if (!token || !sig) return false;
    const expected = createHmac("sha256", CSRF_SECRET).update(`${sessionId}:${token}`).digest("hex");
    return sig === expected;
  } catch {
    return false;
  }
}
