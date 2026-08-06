/**
 * Step 254: Country-wise Worker Distribution Map UI
 */
"use client";
import { getCountryDistribution } from "@/lib/analytics/charts";

export function CountryMap() {
  const data = getCountryDistribution();
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 254: Country-wise Distribution (Map UI)</h3>
      <div className="rounded-xl border border-white/10 bg-[#1D0B2E] p-4">
        <div className="flex h-32 items-center justify-around">
          {data.map((d) => (
            <div key={d.label} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold" style={{ background: d.color, color: d.label === "UAE" ? "#1D0B2E" : "#fff" }}>
                {d.value}
              </div>
              <p className="mt-1 text-xs">{d.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-white/40">Map UI simulated — In prod use react-simple-maps</p>
      </div>
    </div>
  );
}
