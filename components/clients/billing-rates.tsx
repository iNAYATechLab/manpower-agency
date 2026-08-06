/**
 * Steps 178-180: Billing Rate, Pay Rate, Profit Margin ($/hr)
 */
"use client";
import { calcProfitMargin } from "@/lib/clients/types";

export function BillingRatesForm({ billing, pay, onChange }: { billing?: string; pay?: string; onChange: (b: string, p: string) => void }) {
  const profit = calcProfitMargin(billing || "0", pay || "0");

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Steps 178-180: Billing & Pay Rates</h3>
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="text-sm text-white/60">Step 178: Client Billing Rate ($/hr)</label>
          <input type="number" value={billing || ""} onChange={(e) => onChange(e.target.value, pay || "")} placeholder="25" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Step 179: Worker Pay Rate ($/hr)</label>
          <input type="number" value={pay || ""} onChange={(e) => onChange(billing || "", e.target.value)} placeholder="18" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Step 180: Profit Margin ($/hr) Auto</label>
          <div className="mt-1 rounded-lg bg-[#E5B84B]/20 px-3 py-2 text-center font-bold text-[#E5B84B]">${profit} /hr</div>
          <p className="text-xs text-white/40">Auto-calculated: Billing − Pay</p>
        </div>
      </div>
    </div>
  );
}
