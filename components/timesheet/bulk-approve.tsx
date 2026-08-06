/**
 * Step 207: Client Approve All Bulk Action Button UI
 */
"use client";
import { useState } from "react";
import { approveTimesheet } from "@/lib/timesheet/workflow";
import { Button } from "@/components/ui/button";
import { DigitalSignature } from "@/components/timesheet/digital-signature";

export function BulkApprove({ timesheetIds }: { timesheetIds: string[] }) {
  const [signed, setSigned] = useState<string | null>(null);
  const [approved, setApproved] = useState<string[]>([]);

  const approveAll = () => {
    if (!signed) {
      alert("Please sign first (Step 209)");
      return;
    }
    timesheetIds.forEach((id) => {
      approveTimesheet(id, signed);
      setApproved((prev) => [...prev, id]);
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
      <h3 className="font-semibold text-green-300">Step 207: Bulk Approve All</h3>
      <p className="text-sm text-white/60">{timesheetIds.length} timesheets selected</p>
      <DigitalSignature onSign={setSigned} />
      <Button onClick={approveAll} disabled={!signed || approved.length === timesheetIds.length} className="w-full bg-green-600 hover:bg-green-700">
        {approved.length > 0 ? `✓ Approved ${approved.length}/${timesheetIds.length} (Locked)` : "Approve All + Sign (→ Locked Status)"}
      </Button>
      <p className="text-xs text-white/40">Step 210: Approved → Locked Status (Read-Only, no further edits)</p>
    </div>
  );
}
