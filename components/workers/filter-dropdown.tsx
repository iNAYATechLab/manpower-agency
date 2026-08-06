/**
 * Steps 164-165: Skill & Location/Project Filtering Dropdowns
 */
"use client";
import { useState } from "react";

export function WorkerFilters({ onFilter }: { onFilter?: (filters: Record<string, string>) => void }) {
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");

  const apply = () => onFilter?.({ skill, location });

  return (
    <div className="flex flex-wrap gap-3">
      <div>
        <label className="text-xs text-white/60">Step 164: Skill Filter</label>
        <select value={skill} onChange={(e) => setSkill(e.target.value)} className="ml-2 rounded-lg border border-white/10 bg-[#2A1143] px-3 py-2 text-sm">
          <option value="">All Skills</option>
          <option value="Welder">Welder</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
        </select>
      </div>
      <div>
        <label className="text-xs text-white/60">Step 165: Location/Project</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="ml-2 rounded-lg border border-white/10 bg-[#2A1143] px-3 py-2 text-sm">
          <option value="">All Locations</option>
          <option value="Bench">Bench (Idle)</option>
          <option value="NEOM Site A">NEOM Site A</option>
          <option value="NEOM Site B">NEOM Site B</option>
        </select>
      </div>
      <button onClick={apply} className="rounded-lg bg-[#E5B84B] px-4 py-2 text-sm font-semibold text-[#1D0B2E]">
        Apply Filter
      </button>
    </div>
  );
}
