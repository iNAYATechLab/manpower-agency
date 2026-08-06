/**
 * Step 116: SMS based OTP API Connect
 * Simulates Twilio/SSL Wireless OTP
 */

import { randomBytes } from "crypto";

const otpStore = new Map<string, { code: string; expiresAt: Date; attempts: number }>();

export function sendSMSOTP(phone: string): { otp: string; expiresAt: Date } {
  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6 digits
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
  otpStore.set(phone, { code, expiresAt, attempts: 0 });
  console.log(`[SMS] OTP to ${phone}: ${code}`);
  return { otp: code, expiresAt };
}

export function verifySMSOTP(phone: string, code: string): boolean {
  const record = otpStore.get(phone);
  if (!record) return false;
  if (record.expiresAt.getTime() < Date.now()) {
    otpStore.delete(phone);
    return false;
  }
  record.attempts += 1;
  if (record.code === code) {
    otpStore.delete(phone);
    return true;
  }
  if (record.attempts >= 5) otpStore.delete(phone);
  return false;
}
