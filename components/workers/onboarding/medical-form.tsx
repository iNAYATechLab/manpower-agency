/**
 * Step 154: Health & Medical Fitness Input Field
 */
"use client";
export function MedicalForm({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 154: Medical & Fitness</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Medical Status</label>
          <select value={data.medicalStatus || ""} onChange={(e) => onChange({ ...data, medicalStatus: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm">
            <option value="">Select</option>
            <option value="fit">Fit</option>
            <option value="unfit">Unfit</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-white/60">Medical Expiry</label>
          <input type="date" value={data.medicalExpiry || ""} onChange={(e) => onChange({ ...data, medicalExpiry: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Blood Group</label>
          <input value={data.bloodGroup || ""} onChange={(e) => onChange({ ...data, bloodGroup: e.target.value })} placeholder="A+, B+" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-white/60">Fitness Notes</label>
          <textarea value={data.fitnessNotes || ""} onChange={(e) => onChange({ ...data, fitnessNotes: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" rows={2} />
        </div>
      </div>
    </div>
  );
}
