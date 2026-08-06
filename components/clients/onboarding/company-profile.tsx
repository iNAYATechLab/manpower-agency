/**
 * Steps 171-172: Foreign Client Company Onboarding + Registered Name
 */
"use client";
export function CompanyProfileForm({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Steps 171-172: Company Profile</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Company Name (Foreign Client)</label>
          <input value={data.companyName || ""} onChange={(e) => onChange({ ...data, companyName: e.target.value })} placeholder="NEOM Construction Co." className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Registered Name</label>
          <input value={data.registeredName || ""} onChange={(e) => onChange({ ...data, registeredName: e.target.value })} placeholder="NEOM Construction Company Ltd." className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Email</label>
          <input value={data.email || ""} onChange={(e) => onChange({ ...data, email: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Country</label>
          <input value={data.country || ""} onChange={(e) => onChange({ ...data, country: e.target.value })} placeholder="SA, QA, AE" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  );
}
