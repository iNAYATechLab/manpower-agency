/**
 * Step 168: Performance Rating History Tab
 */
"use client";

const history = [
  { date: "2026-07-01", rating: 4.5, reviewer: "NEOM Supervisor", comment: "Excellent welding" },
  { date: "2026-06-01", rating: 4.0, reviewer: "Agency Admin", comment: "Good attendance" },
  { date: "2026-05-01", rating: 3.5, reviewer: "Client", comment: "Needs improvement in safety" },
];

export function PerformanceHistory() {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 168: Performance Rating History</h3>
      <div className="space-y-2">
        {history.map((h, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-[#2A1143] p-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{h.reviewer}</span>
              <span className="text-sm text-[#E5B84B]">★ {h.rating}/5</span>
            </div>
            <p className="text-xs text-white/60">
              {h.date} — {h.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
