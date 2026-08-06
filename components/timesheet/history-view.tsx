/**
 * Step 203: Timesheet Editing History & Tracking Handler View
 */
"use client";
import { getTimesheetHistory } from "@/lib/timesheet/history";

export function HistoryView({ timesheetId }: { timesheetId: string }) {
  const history = getTimesheetHistory(timesheetId);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 203: Editing History</h3>
      {history.length === 0 ? (
        <p className="text-sm text-white/60">No edits yet — All changes will be tracked here</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {history.map((h) => (
            <li key={h.id} className="rounded border border-white/10 bg-[#2A1143] px-3 py-2">
              <span className="font-medium">{h.editedBy}</span> changed <span className="text-[#B388FF]">{h.field}</span> from {String(h.oldValue)} to {String(h.newValue)} at {h.editedAt.toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
