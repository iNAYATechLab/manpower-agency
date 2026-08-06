/**
 * Step 114: 2FA QR-Code Generator
 * Generates otpauth URL + QR data URI (simulated)
 */

import { randomBytes } from "crypto";

export function generate2FAQRData(username: string, issuer = "iNAYATechLab"): { secret: string; otpauthUrl: string; qrDataUrl: string } {
  const secret = randomBytes(20).toString("hex").toUpperCase();
  const otpauthUrl = `otpauth://totp/${encodeURIComponent(`${issuer}:${username}`)}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
  // Simulated QR data URI (in prod, use qrcode library to generate PNG)
  const qrDataUrl = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='%231D0B2E'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23E5B84B' font-size='10'>QR:${secret.slice(0,8)}</text></svg>`;
  return { secret, otpauthUrl, qrDataUrl };
}
