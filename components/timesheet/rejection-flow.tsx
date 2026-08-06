/**
 * Step 208: Timesheet Rejection with Comment Flow
 */
"use client";
import { useState } from "react";
import { rejectTimesheet } from "@/lib/timesheet/workflow";
import { Button } from "@/components/ui/button";

export function RejectionFlow({ timesheetId }: { timesheetId: string }) {
  const [comment, setComment] = useState("");
  const [rejected, setRejected] = useState(false);

  const reject = () => {
    if (!comment) return;
    rejectTimesheet(timesheetId, comment);
    setRejected(true);
  };

  return (
    <div className="space-y-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <h3 className="font-semibold text-red-300">Step 208: Rejection with Comment</h3>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Reason for rejection (e.g., Wrong hours for Abdul Karim on 5 Aug)" rows={3} className="w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
      <Button size="sm" variant="destructive" onClick={reject} disabled={!comment || rejected}>
        {rejected ? "✓ Rejected" : "Reject Timesheet"}
      </Button>
      {rejected && <p className="text-xs text-white/60">Worker/Supervisor will be notified to correct and resubmit</p>}
    </div>
  );
}
