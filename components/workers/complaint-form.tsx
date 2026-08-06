/**
 * Step 169: Complaint Form Against Worker
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ComplaintForm({ workerId, onSubmit }: { workerId: string; onSubmit?: (data: Record<string, string>) => void }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const submit = () => {
    onSubmit?.({ workerId, reason, details });
    setReason("");
    setDetails("");
    alert(`Complaint submitted for ${workerId}: ${reason}`);
  };

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-[#2A1143] p-4">
      <h3 className="font-semibold">Step 169: Complaint Against Worker</h3>
      <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm">
        <option value="">Select Reason</option>
        <option value="absent">Absent without notice</option>
        <option value="misconduct">Misconduct</option>
        <option value="low_performance">Low Performance</option>
        <option value="safety">Safety Violation</option>
      </select>
      <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Details..." rows={3} className="w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
      <Button size="sm" onClick={submit} disabled={!reason}>
        Submit Complaint
      </Button>
    </div>
  );
}
