/**
 * Step 242: Resend/SendGrid Email Dispatcher Connect
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const sentEmails: EmailPayload[] = [];

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; id: string }> {
  const id = `email_${Date.now()}`;
  sentEmails.push(payload);
  // In prod: await resend.emails.send({ from: payload.from || "noreply@inayatechlab.com", to: payload.to, subject: payload.subject, html: payload.html })
  // Or: await sgMail.send(...)
  console.log(`[EMAIL_DISPATCH] To: ${payload.to}, Subject: ${payload.subject}`);
  return { success: true, id };
}

export function getSentEmails(): EmailPayload[] {
  return [...sentEmails];
}
