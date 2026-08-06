/**
 * Step 153: Passport Info & Expiry Entry Form
 */
"use client";
export function PassportForm({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 153: Passport & Visa Info</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          { key: "passportNumber", label: "Passport Number" },
          { key: "passportExpiry", label: "Passport Expiry", type: "date" },
          { key: "akamaNumber", label: "Akama Number" },
          { key: "akamaExpiry", label: "Akama Expiry", type: "date" },
          { key: "workPermitNumber", label: "Work Permit Number" },
          { key: "workPermitExpiry", label: "Work Permit Expiry", type: "date" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-sm text-white/60">{f.label}</label>
            <input
              type={f.type || "text"}
              value={data[f.key] || ""}
              onChange={(e) => onChange({ ...data, [f.key]: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm focus:border-[#B388FF] focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
