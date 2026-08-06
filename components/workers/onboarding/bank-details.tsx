/**
 * Step 158: Bank Account & Payment Details Input Form
 */
"use client";
export function BankDetailsForm({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 158: Bank & Payment Details</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Bank Name</label>
          <input value={data.bankName || ""} onChange={(e) => onChange({ ...data, bankName: e.target.value })} placeholder="Islami Bank" className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">Account Number</label>
          <input value={data.accountNumber || ""} onChange={(e) => onChange({ ...data, accountNumber: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">IBAN</label>
          <input value={data.iban || ""} onChange={(e) => onChange({ ...data, iban: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">SWIFT</label>
          <input value={data.swift || ""} onChange={(e) => onChange({ ...data, swift: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  );
}
