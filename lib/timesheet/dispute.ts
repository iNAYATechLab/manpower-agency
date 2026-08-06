/**
 * Step 204: Timesheet Wrong Entry Flagging Dispute System
 */

export interface Dispute {
  id: string;
  timesheetId: string;
  entryId?: string;
  raisedBy: string;
  reason: string;
  status: "open" | "resolved" | "rejected";
  createdAt: Date;
  resolvedAt?: Date;
  resolution?: string;
}

const disputes: Dispute[] = [];

export function flagDispute(input: Omit<Dispute, "id" | "createdAt" | "status">): Dispute {
  const d: Dispute = { id: `disp_${Date.now()}`, createdAt: new Date(), status: "open", ...input };
  disputes.push(d);
  return d;
}

export function resolveDispute(id: string, resolution: string, status: "resolved" | "rejected" = "resolved"): Dispute | null {
  const d = disputes.find((x) => x.id === id);
  if (!d) return null;
  d.status = status;
  d.resolution = resolution;
  d.resolvedAt = new Date();
  return d;
}

export function getDisputesForTimesheet(timesheetId: string): Dispute[] {
  return disputes.filter((d) => d.timesheetId === timesheetId);
}
