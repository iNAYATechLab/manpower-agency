/**
 * Step 243: Twilio/SMS Gateway API Link
 */

export interface SMSPayload {
  to: string;
  message: string;
}

const sentSMS: SMSPayload[] = [];

export async function sendSMS(payload: SMSPayload): Promise<{ success: boolean; sid: string }> {
  const sid = `SM${Date.now().toString(36)}`;
  sentSMS.push(payload);
  // In prod: await twilioClient.messages.create({ body: payload.message, from: process.env.TWILIO_PHONE, to: payload.to })
  console.log(`[SMS_GATEWAY] To: ${payload.to}, Message: ${payload.message.slice(0, 30)}...`);
  return { success: true, sid };
}

export function getSentSMS(): SMSPayload[] {
  return [...sentSMS];
}
