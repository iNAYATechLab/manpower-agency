/**
 * Step 155: Skill Catalog Selector Component
 */
"use client";
import { SKILL_CATALOG } from "@/lib/workers/types";

export function SkillSelector({ selected, onChange }: { selected: string[]; onChange: (ids: string[]) => void }) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 155: Skill Catalog</h3>
      <p className="text-xs text-white/60">Select one or more skills</p>
      <div className="grid gap-2 md:grid-cols-2">
        {SKILL_CATALOG.map((skill) => (
          <label key={skill.id} className={`flex items-center gap-3 rounded-lg border p-3 ${selected.includes(skill.id) ? "border-[#E5B84B] bg-[#E5B84B]/10" : "border-white/10 bg-[#1D0B2E] hover:bg-white/5"}`}>
            <input type="checkbox" checked={selected.includes(skill.id)} onChange={() => toggle(skill.id)} className="accent-[#E5B84B]" />
            <div>
              <p className="text-sm font-medium">{skill.name}</p>
              <p className="text-xs text-white/60">{skill.category}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
