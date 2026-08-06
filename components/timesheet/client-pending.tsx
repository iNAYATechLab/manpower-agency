/**
 * Step 206: Client Portal Pending Timesheets List
 */
"use client";
import { Button } from "@/components/ui/button";

const pending = [
  { id: "ts_001", site: "NEOM Site A", week: "4 Aug - 8 Aug", workers: 12, totalHours: 480, status: "submitted" },
  { id: "ts_002", site: "NEOM Site A", week: "28 Jul - 1 Aug", workers: 10, totalHours: 400, status: "submitted" },
];

export function ClientPendingList({ onSelect }: { onSelect?: (id: string) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 206: Pending Timesheets (Client Portal)</h3>
      <div className="space-y-2">
        {pending.map((ts) => (
          <div key={ts.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#2A1143] p-4">
            <div>
              <p className="font-medium">{ts.site} — {ts.week}</p>
              <p className="text-xs text-white/60">{ts.workers} workers • {ts.totalHours} hrs • {ts.status}</p>
            </div>
            <Button size="sm" onClick={() => onSelect?.(ts.id)}>
              Review
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
