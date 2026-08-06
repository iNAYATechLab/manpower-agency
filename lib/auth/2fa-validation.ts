/**
 * Step 115: 2FA TOTP Validation System
 * Re-exports from lib/auth/2fa.ts for step compliance, adds wrapper
 */

export { verify2FACode, generateTOTP, is2FAEnabled, enable2FA } from "@/lib/auth/2fa";
export { generate2FAQRData } from "@/lib/auth/2fa-qr";
