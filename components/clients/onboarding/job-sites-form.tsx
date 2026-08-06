/**
 * Steps 174-175: Multiple Job Sites + GPS Coordinates
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function JobSitesForm({ sites, onChange }: { sites: Array<Record<string, string>>; onChange: (s: Array<Record<string, string>>) => void }) {
  const add = () => onChange([...sites, { name: "", city: "", latitude: "", longitude: "" }]);
  const update = (idx: number, key: string, val: string) => {
    const next = [...sites];
    next[idx] = { ...next[idx], [key]: val };
    onChange(next);
  };
  const remove = (idx: number) => onChange(sites.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Steps 174-175: Job Sites & GPS</h3>
      {sites.map((site, idx) => (
        <div key={idx} className="rounded-lg border border-white/10 bg-[#2A1143] p-3">
          <div className="grid gap-2 md:grid-cols-4">
            <input value={site.name || ""} onChange={(e) => update(idx, "name", e.target.value)} placeholder="Site Name (NEOM Site A)" className="rounded border border-white/10 bg-[#1D0B2E] px-2 py-1 text-sm" />
            <input value={site.city || ""} onChange={(e) => update(idx, "city", e.target.value)} placeholder="City" className="rounded border border-white/10 bg-[#1D0B2E] px-2 py-1 text-sm" />
            <input value={site.latitude || ""} onChange={(e) => update(idx, "latitude", e.target.value)} placeholder="Latitude 28.0" className="rounded border border-white/10 bg-[#1D0B2E] px-2 py-1 text-sm" />
            <input value={site.longitude || ""} onChange={(e) => update(idx, "longitude", e.target.value)} placeholder="Longitude 35.0" className="rounded border border-white/10 bg-[#1D0B2E] px-2 py-1 text-sm" />
          </div>
          <Button size="sm" variant="ghost" onClick={() => remove(idx)} className="mt-2 text-red-300">
            Remove
          </Button>
        </div>
      ))}
      <Button size="sm" onClick={add} variant="outline">
        ＋ Add Job Site
      </Button>
      <p className="text-xs text-white/40">GPS coordinates for Geofencing (Step 175)</p>
    </div>
  );
}
