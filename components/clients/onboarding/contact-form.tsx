/**
 * Step 173: Contact Person & Official Contact Form
 */
"use client";
export function ClientContactForm({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 173: Contact Person</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Full Name</label>
          <input value={data.fullName || ""} onChange={(e) => onChange({ ...data, fullName: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Position</label>
          <input value={data.position || ""} onChange={(e) => onChange({ ...data, position: e.target.value })} placeholder="HR Manager" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Email</label>
          <input value={data.email || ""} onChange={(e) => onChange({ ...data, email: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Phone</label>
          <input value={data.phone || ""} onChange={(e) => onChange({ ...data, phone: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  );
}
