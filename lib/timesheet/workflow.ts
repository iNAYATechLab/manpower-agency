/**
 * Steps 205 & 210: Timesheet Submission Workflow + Locked Status
 */

export type TimesheetStatus = "draft" | "submitted" | "approved" | "locked" | "rejected";

export interface TimesheetWorkflow {
  id: string;
  status: TimesheetStatus;
  isLocked: boolean;
  submittedAt?: Date;
  approvedAt?: Date;
  lockedAt?: Date;
  rejectedAt?: Date;
  rejectionComment?: string;
  digitalSignature?: string;
}

const store = new Map<string, TimesheetWorkflow>();

export function getWorkflow(id: string): TimesheetWorkflow {
  if (!store.has(id)) store.set(id, { id, status: "draft", isLocked: false });
  return store.get(id)!;
}

/**
 * Step 205: Submission Workflow
 */
export function submitTimesheet(id: string, submittedBy: string): TimesheetWorkflow {
  const w = getWorkflow(id);
  if (w.isLocked) throw new Error("Cannot submit locked timesheet");
  w.status = "submitted";
  w.submittedAt = new Date();
  return { ...w };
}

/**
 * Step 208: Rejection with Comment
 */
export function rejectTimesheet(id: string, comment: string): TimesheetWorkflow {
  const w = getWorkflow(id);
  w.status = "rejected";
  w.rejectedAt = new Date();
  w.rejectionComment = comment;
  return { ...w };
}

/**
 * Approve (Step 207 bulk) -> then lock (Step 210)
 */
export function approveTimesheet(id: string, signature?: string): TimesheetWorkflow {
  const w = getWorkflow(id);
  w.status = "approved";
  w.approvedAt = new Date();
  w.digitalSignature = signature;
  // Step 210: Move to locked status after approval
  w.status = "locked";
  w.isLocked = true;
  w.lockedAt = new Date();
  return { ...w };
}

export function isLocked(id: string): boolean {
  return getWorkflow(id).isLocked;
}
