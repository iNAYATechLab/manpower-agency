/**
 * Steps 176-177: Contract Agreement Uploader + Start/End Calendar
 */
"use client";
export function ContractUploadForm({ data, onChange }: { data: Record<string, string>; onChange: (d: Record<string, string>) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Steps 176-177: Contract Agreement</h3>
      <div>
        <label className="text-sm text-white/60">Contract File (PDF)</label>
        <input type="file" accept=".pdf" onChange={(e) => onChange({ ...data, fileName: e.target.files?.[0]?.name || "" })} className="mt-1 text-sm text-white/60" />
        {data.fileName && <p className="text-xs text-green-400">{data.fileName} selected</p>}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Start Date</label>
          <input type="date" value={data.startDate || ""} onChange={(e) => onChange({ ...data, startDate: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60">End Date</label>
          <input type="date" value={data.endDate || ""} onChange={(e) => onChange({ ...data, endDate: e.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        </div>
      </div>
    </div>
  );
}
