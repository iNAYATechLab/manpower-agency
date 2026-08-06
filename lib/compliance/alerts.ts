/**
 * Steps 234-235: Passport & Work Permit Automated Alert Service
 */

import { trackCompliance, type ComplianceDoc } from "@/lib/compliance/tracker";
import { sendInvoiceEmail } from "@/lib/invoicing/email"; // Reuse email dispatcher

export interface Alert {
  workerId: string;
  workerName: string;
  type: string;
  daysLeft: number;
  message: string;
  sentAt: Date;
}

const sentAlerts: Alert[] = [];

export function checkAndSendAlerts(docs: ComplianceDoc[]): Alert[] {
  const statuses = trackCompliance(docs);
  const alerts: Alert[] = [];

  for (const s of statuses) {
    if (s.status === "critical" || s.status === "expiring_soon") {
      const isPassport = s.type === "passport";
      const message = isPassport
        ? `Passport expiring in ${s.daysLeft} days for ${s.workerName} (${s.type})` // Step 234
        : `Work permit expiring in ${s.daysLeft} days for ${s.workerName} (${s.type})`; // Step 235
      const alert: Alert = { workerId: s.workerId, workerName: s.workerName, type: s.type, daysLeft: s.daysLeft, message, sentAt: new Date() };
      sentAlerts.push(alert);
      alerts.push(alert);
      // Simulate email
      console.log(`[ALERT] ${message}`);
    }
  }
  return alerts;
}

export function getSentAlerts(): Alert[] {
  return [...sentAlerts];
}
