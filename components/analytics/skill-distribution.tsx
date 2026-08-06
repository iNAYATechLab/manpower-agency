/**
 * Step 255: Skill Category-wise Manpower Distribution Chart
 */
"use client";
import { getSkillDistribution } from "@/lib/analytics/charts";

export function SkillDistributionChart() {
  const data = getSkillDistribution();
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 255: Skill Category Distribution</h3>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-24 text-sm">{d.label}</span>
            <div className="flex-1">
              <div className="h-3 rounded" style={{ width: `${(d.value / max) * 100}%`, background: d.color as string }} />
            </div>
            <span className="w-8 text-sm">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
