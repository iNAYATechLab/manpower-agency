/**
 * Step 112: Reset Password Email Dispatcher
 */

export interface ResetEmailPayload {
  to: string;
  token: string;
  resetUrl: string;
}

// In-memory sent log (Resend/SendGrid in production)
const sentEmails: ResetEmailPayload[] = [];

export function dispatchResetPasswordEmail(to: string, token: string): ResetEmailPayload {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;
  const payload: ResetEmailPayload = { to, token, resetUrl };
  sentEmails.push(payload);
  console.log(`[EMAIL] Reset password to ${to}: ${resetUrl}`);
  return payload;
}

export function getSentResetEmails(): ResetEmailPayload[] {
  return [...sentEmails];
}
