/**
 * Step 252: Revenue vs Payout Chart Visualization
 */
"use client";
import { getRevenuePayoutData } from "@/lib/analytics/charts";

export function RevenuePayoutChart() {
  const data = getRevenuePayoutData();
  const max = Math.max(...data.map((d) => Math.max(d.revenue, d.payout)));
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 252: Revenue vs Payout</h3>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.month} className="space-y-1">
            <p className="text-xs text-white/60">{d.month}</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="h-3 rounded bg-[#E5B84B]" style={{ width: `${(d.revenue / max) * 100}%` }} />
                <p className="text-xs">Revenue ${d.revenue.toLocaleString()}</p>
              </div>
              <div className="flex-1">
                <div className="h-3 rounded bg-[#B388FF]" style={{ width: `${(d.payout / max) * 100}%` }} />
                <p className="text-xs">Payout ${d.payout.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
