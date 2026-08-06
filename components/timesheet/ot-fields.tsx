/**
 * Step 196: Regular vs Overtime Separate Fields
 */
"use client";
import { useState } from "react";

export function OTFields() {
  const [regular, setRegular] = useState("8");
  const [ot, setOt] = useState("2");

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div>
        <label className="text-sm text-white/60">Step 196: Regular Hours (Duty)</label>
        <input value={regular} onChange={(e) => setRegular(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        <p className="text-xs text-white/40">Standard duty (e.g., 8h)</p>
      </div>
      <div>
        <label className="text-sm text-white/60">Overtime (OT) Hours</label>
        <input value={ot} onChange={(e) => setOt(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#E5B84B]/10 px-3 py-2 text-sm" />
        <p className="text-xs text-[#E5B84B]">Separate field — OT 1.5x/2.0x applied</p>
      </div>
    </div>
  );
}
