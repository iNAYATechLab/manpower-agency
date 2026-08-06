/**
 * Step 193: Hourly Timesheet Input Grid Table
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const workers = ["Abdul Karim", "Mohammad Ali", "Rahim Uddin"];
const days = ["Mon 4/8", "Tue 5/8", "Wed 6/8", "Thu 7/8", "Fri 8/8"];

export function HourlyGrid() {
  const [data, setData] = useState<Record<string, string>>({});

  const setVal = (w: string, d: string, v: string) => setData({ ...data, [`${w}-${d}`]: v });

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 193: Hourly Timesheet Input Grid</h3>
      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#2A1143] text-white/60">
            <tr>
              <th className="p-2 text-left">Worker</th>
              {days.map((d) => (
                <th key={d} className="p-2 text-center">
                  {d}
                </th>
              ))}
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w} className="border-t border-white/5">
                <td className="p-2">{w}</td>
                {days.map((d) => (
                  <td key={d} className="p-1">
                    <input value={data[`${w}-${d}`] || ""} onChange={(e) => setVal(w, d, e.target.value)} placeholder="8" className="w-12 rounded border border-white/10 bg-[#1D0B2E] px-1 py-1 text-center text-sm" />
                  </td>
                ))}
                <td className="p-2 text-center font-bold text-[#E5B84B]">40</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button size="sm">Save Grid</Button>
    </div>
  );
}
