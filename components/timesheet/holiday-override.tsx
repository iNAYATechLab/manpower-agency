/**
 * Step 202: Holiday Rate Override Policy
 */
"use client";
import { isPublicHoliday } from "@/lib/timesheet/calculations";

export function HolidayOverride({ date }: { date: string }) {
  const isHoliday = isPublicHoliday(date);
  return (
    <div className={`rounded-lg border p-3 ${isHoliday ? "border-[#E5B84B]/30 bg-[#E5B84B]/10" : "border-white/10 bg-[#2A1143]"}`}>
      <p className="text-sm font-medium">Step 202: Holiday Override — {date}</p>
      <p className={`text-sm ${isHoliday ? "text-[#E5B84B]" : "text-white/60"}`}>{isHoliday ? "🎉 Public Holiday — 2.0x rate for all hours" : "Normal day — Standard rates"}</p>
    </div>
  );
}
