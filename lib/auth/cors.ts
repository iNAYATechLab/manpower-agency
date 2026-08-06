/**
 * Step 125: CORS Security Headers Config
 */

export const CORS_CONFIG = {
  allowedOrigins: [
    "https://manpower.inayatechlab.com",
    "https://manpower-agency.pages.dev",
    "https://manpower-agency.vercel.app",
    "http://localhost:3000",
  ],
  allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token", "X-Requested-With"],
  allowCredentials: true,
  maxAge: 86400,
};

export function isOriginAllowed(origin?: string): boolean {
  if (!origin) return false;
  return CORS_CONFIG.allowedOrigins.includes(origin);
}

export function getCORSHeaders(origin?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": CORS_CONFIG.allowedMethods.join(", "),
    "Access-Control-Allow-Headers": CORS_CONFIG.allowedHeaders.join(", "),
    "Access-Control-Max-Age": String(CORS_CONFIG.maxAge),
  };
  if (origin && isOriginAllowed(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Credentials"] = "true";
  }
  // Security headers
  headers["X-Content-Type-Options"] = "nosniff";
  headers["X-Frame-Options"] = "DENY";
  headers["X-XSS-Protection"] = "1; mode=block";
  headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
  return headers;
}
