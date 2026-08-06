/**
 * Step 152: Personal Information Input Component
 */
"use client";
export function PersonalInfoStep({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 152: Personal Information</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          { key: "fullName", label: "Full Name (EN)", placeholder: "Abdul Karim" },
          { key: "fullNameBn", label: "Full Name (BN)", placeholder: "আব্দুল করিম" },
          { key: "dob", label: "Date of Birth", type: "date" },
          { key: "nationality", label: "Nationality", placeholder: "Bangladeshi" },
          { key: "phone", label: "Phone", placeholder: "+880..." },
          { key: "email", label: "Email", placeholder: "abdul@example.com" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-sm text-white/60">{f.label}</label>
            <input
              type={f.type || "text"}
              placeholder={f.placeholder}
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
