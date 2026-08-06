/**
 * Steps 162-163: All-Workers Data Table + Column Customization & Sorting
 */
"use client";
import { useState } from "react";
import { MOCK_WORKERS } from "@/lib/workers/types";
import { Button } from "@/components/ui/button";

type SortKey = "fullName" | "skill" | "grade" | "status";
type SortDir = "asc" | "desc";

export function WorkersDataTable({ onSelect }: { onSelect?: (id: string) => void }) {
  const [sortKey, setSortKey] = useState<SortKey>("fullName");
  const [dir, setDir] = useState<SortDir>("asc");
  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>({ workerCode: true, fullName: true, skill: true, grade: true, status: true, location: true });

  const sorted = [...MOCK_WORKERS].sort((a, b) => {
    const av = (a as Record<string, string>)[sortKey] || "";
    const bv = (b as Record<string, string>)[sortKey] || "";
    return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setDir(dir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setDir("asc");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">Step 162: All Workers Data Table</h3>
        <div className="flex gap-1 text-xs">
          {Object.keys(visibleCols).map((col) => (
            <label key={col} className="flex items-center gap-1 rounded bg-white/10 px-2 py-1">
              <input type="checkbox" checked={visibleCols[col]} onChange={(e) => setVisibleCols({ ...visibleCols, [col]: e.target.checked })} />
              {col}
            </label>
          ))}
        </div>
      </div>
      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#2A1143] text-white/60">
            <tr>
              {visibleCols.workerCode && <th className="p-3 text-left">Code</th>}
              {visibleCols.fullName && <th className="cursor-pointer p-3 text-left" onClick={() => toggleSort("fullName")}>Name {sortKey === "fullName" && (dir === "asc" ? "↑" : "↓")}</th>}
              {visibleCols.skill && <th className="cursor-pointer p-3 text-left" onClick={() => toggleSort("skill")}>Skill</th>}
              {visibleCols.grade && <th className="p-3 text-left">Grade</th>}
              {visibleCols.status && <th className="p-3 text-left">Status</th>}
              {visibleCols.location && <th className="p-3 text-left">Location</th>}
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((w) => (
              <tr key={w.id} className="border-t border-white/5 hover:bg-white/5">
                {visibleCols.workerCode && <td className="p-3 font-mono text-xs">{w.workerCode}</td>}
                {visibleCols.fullName && <td className="p-3">{w.fullName}</td>}
                {visibleCols.skill && <td className="p-3">{w.skill}</td>}
                {visibleCols.grade && <td className="p-3">{w.grade}</td>}
                {visibleCols.status && <td className={`p-3 ${w.status === "deployed" ? "text-[#B388FF]" : "text-green-400"}`}>{w.status}</td>}
                {visibleCols.location && <td className="p-3">{w.location}</td>}
                <td className="p-3">
                  <Button size="sm" variant="ghost" onClick={() => onSelect?.(w.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-white/40">Step 163: Column customization & sorting implemented — Click headers to sort</p>
    </div>
  );
}
