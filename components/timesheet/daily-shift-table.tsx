/**
 * Step 191: Daily Shift Time Table UI
 */
"use client";
const shifts = [
  { name: "Morning", time: "08:00 - 16:00", break: "60m", workers: 45 },
  { name: "Evening", time: "16:00 - 00:00", break: "45m", workers: 30 },
  { name: "Night", time: "00:00 - 08:00", break: "30m", allowance: "$5", workers: 12 },
];
export function DailyShiftTable() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 191: Daily Shift Time Table</h3>
      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#2A1143] text-white/60">
            <tr>
              <th className="p-3 text-left">Shift</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Break</th>
              <th className="p-3 text-left">Workers</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s) => (
              <tr key={s.name} className="border-t border-white/5">
                <td className="p-3">{s.name} {s.allowance && <span className="text-xs text-[#B388FF]">({s.allowance} night)</span>}</td>
                <td className="p-3">{s.time}</td>
                <td className="p-3">{s.break}</td>
                <td className="p-3">{s.workers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
