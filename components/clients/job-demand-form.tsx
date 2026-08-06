/**
 * Steps 181-182: Job Demand Quota + Real-time Progress Bar
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function JobDemandForm() {
  const [quantity, setQuantity] = useState(50);
  const [filled, setFilled] = useState(12);
  const percent = Math.round((filled / quantity) * 100);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Steps 181-182: Job Demand Quota</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Demand Title</label>
          <input placeholder="50 Welders for NEOM" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Quantity (Demand)</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
      </div>
      {/* Step 182: Real-time Progress Bar */}
      <div>
        <div className="flex justify-between text-sm">
          <span>Filled: {filled}/{quantity}</span>
          <span>{percent}%</span>
        </div>
        <div className="mt-1 h-3 w-full rounded-full bg-white/10">
          <div className="h-3 rounded-full bg-[#E5B84B] transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-1 text-xs text-white/40">Real-time: Demand vs Deployed</p>
        <div className="mt-2 flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setFilled((f) => Math.min(f + 1, quantity))}>
            + Fill 1
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setFilled(0)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
