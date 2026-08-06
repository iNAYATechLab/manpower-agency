/**
 * Step 239: BMET & Immigration Permit Tracking Module
 */

export interface BMETRecord {
  id: string;
  workerId: string;
  bmetNumber: string;
  status: "pending" | "approved" | "rejected" | "expired";
  issueDate: string;
  expiryDate: string;
  fileUrl?: string;
}

const bmetRecords: BMETRecord[] = [];

export function addBMETRecord(record: Omit<BMETRecord, "id">): BMETRecord {
  const r: BMETRecord = { id: `bmet_${Date.now()}`, ...record };
  bmetRecords.push(r);
  return r;
}

export function getBMETRecords(workerId?: string): BMETRecord[] {
  if (workerId) return bmetRecords.filter((r) => r.workerId === workerId);
  return [...bmetRecords];
}

export function getPendingBMET(): BMETRecord[] {
  return bmetRecords.filter((r) => r.status === "pending");
}
