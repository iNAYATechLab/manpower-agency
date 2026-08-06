/**
 * Step 161: Digitized Skill Certificate Uploader
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CertificateUpload({ certs, onChange }: { certs: Array<{ title: string; url: string }>; onChange: (c: Array<{ title: string; url: string }>) => void }) {
  const [title, setTitle] = useState("");

  const add = () => {
    if (!title) return;
    onChange([...certs, { title, url: `https://storage.inayatechlab.com/certs/${Date.now()}.pdf` }]);
    setTitle("");
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 161: Skill Certificates</h3>
      <div className="flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Certificate title (e.g., Welder Grade A)" className="flex-1 rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        <Button size="sm" onClick={add}>
          Add
        </Button>
      </div>
      <input type="file" accept=".pdf,image/*" className="text-sm text-white/60" />
      <ul className="space-y-1 text-sm">
        {certs.map((c, i) => (
          <li key={i} className="flex justify-between rounded border border-white/10 bg-[#2A1143] px-3 py-2">
            <span>{c.title}</span>
            <button onClick={() => onChange(certs.filter((_, idx) => idx !== i))} className="text-red-400">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
