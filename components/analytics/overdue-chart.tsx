/**
 * Step 256: Invoice Overdue Receivable Chart
 */
"use client";
import { getOverdueData } from "@/lib/analytics/charts";

export function OverdueChart() {
  const data = getOverdueData();
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 256: Invoice Overdue Receivable</h3>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2">
            <span className="flex items-center gap-2 text-sm">
              <span className="h-3 w-3 rounded-full" style={{ background: d.color }} /> {d.label}
            </span>
            <span className="font-bold">${d.value.toLocaleString()} ({Math.round((d.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
