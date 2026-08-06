/**
 * Step 159: Emergency Contact Person Info Form
 */
"use client";
export function EmergencyContactForm({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 159: Emergency Contact</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Contact Name</label>
          <input value={data.name || ""} onChange={(e) => onChange({ ...data, name: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Relation</label>
          <input value={data.relation || ""} onChange={(e) => onChange({ ...data, relation: e.target.value })} placeholder="Father, Brother" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Phone</label>
          <input value={data.phone || ""} onChange={(e) => onChange({ ...data, phone: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Address</label>
          <input value={data.address || ""} onChange={(e) => onChange({ ...data, address: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  );
}
