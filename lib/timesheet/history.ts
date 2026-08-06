/**
 * Step 203: Timesheet Editing History & Tracking Handler
 */

export interface TimesheetHistoryEntry {
  id: string;
  timesheetId: string;
  editedBy: string;
  editedAt: Date;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  reason?: string;
}

const history: TimesheetHistoryEntry[] = [];

export function logTimesheetEdit(input: Omit<TimesheetHistoryEntry, "id" | "editedAt">): TimesheetHistoryEntry {
  const entry: TimesheetHistoryEntry = { id: `hist_${Date.now()}`, editedAt: new Date(), ...input };
  history.push(entry);
  return entry;
}

export function getTimesheetHistory(timesheetId: string): TimesheetHistoryEntry[] {
  return history.filter((h) => h.timesheetId === timesheetId).sort((a, b) => b.editedAt.getTime() - a.editedAt.getTime());
}
