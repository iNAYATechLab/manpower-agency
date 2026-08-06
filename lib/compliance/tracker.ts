/**
 * Step 233: Smart Compliance Date Tracker Algorithm
 */

export interface ComplianceDoc {
  workerId: string;
  workerName: string;
  type: "passport" | "akama" | "work_permit" | "medical" | "insurance" | "bmet";
  expiryDate: string;
  fileUrl?: string;
}

export interface ComplianceStatus {
  workerId: string;
  workerName: string;
  type: string;
  expiryDate: string;
  daysLeft: number;
  status: "valid" | "expiring_soon" | "expired" | "critical";
}

export function trackCompliance(docs: ComplianceDoc[]): ComplianceStatus[] {
  const now = new Date();
  return docs.map((doc) => {
    const expiry = new Date(doc.expiryDate);
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    let status: ComplianceStatus["status"] = "valid";
    if (daysLeft < 0) status = "expired";
    else if (daysLeft <= 30) status = "critical";
    else if (daysLeft <= 60) status = "expiring_soon";
    return { workerId: doc.workerId, workerName: doc.workerName, type: doc.type, expiryDate: doc.expiryDate, daysLeft, status };
  });
}
