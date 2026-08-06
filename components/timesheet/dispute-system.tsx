/**
 * Step 204: Dispute Flagging System
 */
"use client";
import { useState } from "react";
import { flagDispute, getDisputesForTimesheet } from "@/lib/timesheet/dispute";
import { Button } from "@/components/ui/button";

export function DisputeSystem({ timesheetId }: { timesheetId: string }) {
  const [reason, setReason] = useState("");
  const disputes = getDisputesForTimesheet(timesheetId);

  const flag = () => {
    if (!reason) return;
    flagDispute({ timesheetId, raisedBy: "worker", reason });
    setReason("");
  };

  return (
    <div className="space-y-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
      <h3 className="font-semibold text-yellow-300">Step 204: Dispute Flagging</h3>
      <div className="flex gap-2">
        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Wrong hours, 8h entered as 6h" className="flex-1 rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        <Button size="sm" onClick={flag}>
          Flag Dispute
        </Button>
      </div>
      <div className="space-y-1 text-sm">
        {disputes.map((d) => (
          <div key={d.id} className="rounded border border-white/10 bg-[#2A1143] px-3 py-2">
            {d.reason} — <span className={d.status === "open" ? "text-yellow-400" : "text-green-400"}>{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
