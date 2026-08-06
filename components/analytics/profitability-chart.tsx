/**
 * Step 251: Project Profitability Dashboard Chart
 */
"use client";
import { getProfitabilityData } from "@/lib/analytics/charts";

export function ProfitabilityChart() {
  const data = getProfitabilityData();
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 251: Project Profitability</h3>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm">
              <span>{d.label}</span>
              <span className="font-bold" style={{ color: d.color }}>
                ${d.value.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full rounded bg-white/10">
              <div className="h-2 rounded" style={{ width: `${(d.value / max) * 100}%`, background: d.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
