/**
 * Step 192: Weekly Roster Calendar View
 */
"use client";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const workers = ["Abdul Karim", "Mohammad Ali", "Rahim Uddin"];

export function WeeklyRoster() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 192: Weekly Roster Calendar</h3>
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
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w} className="border-t border-white/5">
                <td className="p-2 font-medium">{w}</td>
                {days.map((d) => (
                  <td key={d} className="p-2 text-center">
                    <span className={`rounded px-2 py-1 text-xs ${Math.random() > 0.3 ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/40"}`}>{Math.random() > 0.3 ? "M" : "—"}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-white/40">M = Morning shift, — = Off. Weekly view for supervisor.</p>
    </div>
  );
}
