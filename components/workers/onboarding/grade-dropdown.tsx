/**
 * Step 156: Professional Grading (Grade A, B, C) Dropdown
 */
"use client";
export function GradeDropdown({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-semibold">Step 156: Professional Grade</h3>
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm">
        <option value="">Select Grade</option>
        <option value="A">Grade A — Expert (10+ years)</option>
        <option value="B">Grade B — Skilled (5-10 years)</option>
        <option value="C">Grade C — Helper (0-5 years)</option>
      </select>
      {value && <p className="mt-1 text-xs text-[#B388FF]">Selected: Grade {value}</p>}
    </div>
  );
}
