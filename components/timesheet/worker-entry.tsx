/**
 * Step 194: Worker-based Time Entry Interface
 */
"use client";
import { useState } from "react";
import { calculateOTPay } from "@/lib/timesheet/calculations";
import { Button } from "@/components/ui/button";

export function WorkerEntry() {
  const [regular, setRegular] = useState("8");
  const [ot, setOt] = useState("2");
  const [isNight, setIsNight] = useState(false);
  const [isHazard, setIsHazard] = useState(false);
  const result = calculateOTPay({ regularHours: parseFloat(regular) || 0, overtimeHours: parseFloat(ot) || 0, payRate: 18, isNightShift: isNight, isHazard: isHazard });

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-[#2A1143] p-4">
      <h3 className="font-semibold">Step 194: Worker-based Entry</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Regular Hours</label>
          <input value={regular} onChange={(e) => setRegular(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Overtime Hours</label>
          <input value={ot} onChange={(e) => setOt(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isNight} onChange={(e) => setIsNight(e.target.checked)} /> Night Shift (+$5)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isHazard} onChange={(e) => setIsHazard(e.target.checked)} /> Hazard Pay (+$10)
        </label>
      </div>
      <div className="rounded-lg bg-[#1D0B2E] p-3 text-sm">
        <p>{result.breakdown}</p>
        <p className="font-bold text-[#E5B84B]">Total Pay: ${result.totalPay.toFixed(2)}</p>
      </div>
      <Button size="sm">Save Entry</Button>
    </div>
  );
}
