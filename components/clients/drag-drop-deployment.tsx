/**
 * Steps 183-185: Drag-and-Drop Deployment, Bulk Assignment, Site Transfer
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialBench = [
  { id: "wrk_001", name: "Abdul Karim — Welder A" },
  { id: "wrk_003", name: "Rahim Uddin — Plumber A" },
  { id: "wrk_005", name: "Jamal Hossain — Welder B" },
];
const initialSiteA = [{ id: "wrk_002", name: "Mohammad Ali — Electrician B" }];

export function DragDropDeployment() {
  const [bench, setBench] = useState(initialBench);
  const [siteA, setSiteA] = useState(initialSiteA);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const moveToSite = () => {
    const toMove = bench.filter((w) => selected.includes(w.id));
    setBench(bench.filter((w) => !selected.includes(w.id)));
    setSiteA([...siteA, ...toMove]);
    setSelected([]);
  };

  const moveToBench = (id: string) => {
    const worker = siteA.find((w) => w.id === id);
    if (!worker) return;
    setSiteA(siteA.filter((w) => w.id !== id));
    setBench([...bench, worker]);
  };

  const bulkAssign = () => {
    // Step 184: Bulk assign all bench to site
    setSiteA([...siteA, ...bench]);
    setBench([]);
    setSelected([]);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Steps 183-185: Deployment Assignment</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bench */}
        <div className="rounded-xl border border-white/10 bg-[#2A1143] p-4">
          <h4 className="font-medium">Bench (Available) — {bench.length}</h4>
          <p className="text-xs text-white/60">Drag or select → Assign to Site</p>
          <div className="mt-3 space-y-2">
            {bench.map((w) => (
              <label key={w.id} className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2">
                <input type="checkbox" checked={selected.includes(w.id)} onChange={() => toggleSelect(w.id)} />
                <span className="text-sm">{w.name}</span>
              </label>
            ))}
            {bench.length === 0 && <p className="text-sm text-white/40">No bench workers</p>}
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={moveToSite} disabled={selected.length === 0}>
              Assign Selected → Site A (183)
            </Button>
            <Button size="sm" variant="outline" onClick={bulkAssign} disabled={bench.length === 0}>
              Bulk Assign All (184)
            </Button>
          </div>
        </div>

        {/* Site A */}
        <div className="rounded-xl border border-[#E5B84B]/30 bg-[#1D0B2E] p-4">
          <h4 className="font-medium">NEOM Site A — {siteA.length} Deployed</h4>
          <p className="text-xs text-white/60">Site Transfer & Release (185)</p>
          <div className="mt-3 space-y-2">
            {siteA.map((w) => (
              <div key={w.id} className="flex items-center justify-between rounded-lg border border-[#E5B84B]/20 bg-[#2A1143] px-3 py-2">
                <span className="text-sm">{w.name}</span>
                <Button size="sm" variant="ghost" onClick={() => moveToBench(w.id)}>
                  ← Release
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-white/40">Step 183: Drag-and-Drop simulated via checkbox + button. In prod use @dnd-kit.</p>
    </div>
  );
}
