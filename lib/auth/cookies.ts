/**
 * Step 123: Secure Cookie Management Setup
 */

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60, // 1 hour
};

export const REFRESH_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: 7 * 24 * 60 * 60, // 7 days
  path: "/api/auth/refresh",
};

export function getSecureCookieHeader(name: string, value: string, options: typeof COOKIE_OPTIONS): string {
  const parts = [`${name}=${value}`, `Path=${options.path}`, `HttpOnly`, `SameSite=${options.sameSite}`];
  if (options.secure) parts.push("Secure");
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  return parts.join("; ");
}
