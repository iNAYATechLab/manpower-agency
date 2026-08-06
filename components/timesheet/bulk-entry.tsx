/**
 * Step 195: Supervisor Bulk Timesheet Entry Grid
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const workers = ["Abdul Karim", "Mohammad Ali", "Rahim Uddin", "Karim Mia", "Jamal Hossain"];

export function BulkEntryGrid() {
  const [hours, setHours] = useState<Record<string, string>>({});

  const fillAll = (val: string) => {
    const next: Record<string, string> = {};
    workers.forEach((w) => (next[w] = val));
    setHours(next);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 195: Bulk Timesheet Entry (Supervisor)</h3>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => fillAll("8")}>
          Fill All 8h
        </Button>
        <Button size="sm" variant="outline" onClick={() => fillAll("0")}>
          Clear All
        </Button>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {workers.map((w) => (
          <div key={w} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2">
            <span className="text-sm">{w}</span>
            <input value={hours[w] || ""} onChange={(e) => setHours({ ...hours, [w]: e.target.value })} placeholder="8" className="w-16 rounded border border-white/10 bg-[#2A1143] px-2 py-1 text-sm" />
          </div>
        ))}
      </div>
      <Button size="sm">Submit Bulk (Supervisor)</Button>
    </div>
  );
}
