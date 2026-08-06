/**
 * Step 253: Worker Utilization Rate (Active vs Idle) Donut Chart
 */
"use client";
import { getUtilizationData } from "@/lib/analytics/charts";

export function UtilizationDonut() {
  const data = getUtilizationData();
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const active = data[0]!.value;
  const idle = data[1]!.value;
  const activePct = Math.round((active / total) * 100);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 253: Worker Utilization (Active vs Idle)</h3>
      <div className="flex items-center gap-4">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full" style={{ background: `conic-gradient(#B388FF ${activePct}%, #E5B84B ${activePct}% 100%)` }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1D0B2E]">
            <span className="text-sm font-bold">{activePct}%</span>
          </div>
        </div>
        <div className="space-y-1 text-sm">
          {data.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: d.color }} />
              {d.label}: {d.value} ({Math.round((d.value / total) * 100)}%)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
