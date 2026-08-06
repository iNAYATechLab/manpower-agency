/**
 * Step 245: User's Email Preference Option
 */

export interface EmailPreferences {
  userId: string;
  marketing: boolean;
  complianceAlerts: boolean;
  payroll: boolean;
  invoice: boolean;
  broadcast: boolean;
}

const prefs = new Map<string, EmailPreferences>();

export function getEmailPreferences(userId: string): EmailPreferences {
  if (!prefs.has(userId)) {
    prefs.set(userId, { userId, marketing: false, complianceAlerts: true, payroll: true, invoice: true, broadcast: true });
  }
  return prefs.get(userId)!;
}

export function updateEmailPreferences(userId: string, updates: Partial<EmailPreferences>): EmailPreferences {
  const current = getEmailPreferences(userId);
  const next = { ...current, ...updates, userId };
  prefs.set(userId, next);
  return next;
}
