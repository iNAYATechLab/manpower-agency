/**
 * Step 160: Worker Photo Upload & Cropping UI
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PhotoUpload({ url, onChange }: { url?: string; onChange: (url: string) => void }) {
  const [preview, setPreview] = useState(url || "");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fakeUrl = URL.createObjectURL(file);
    setPreview(fakeUrl);
    onChange(fakeUrl);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Step 160: Photo Upload & Cropping</h3>
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#2A1143]">
          {preview ? <img src={preview} alt="Preview" className="h-full w-full object-cover" /> : <span className="text-white/40">No Photo</span>}
        </div>
        <div>
          <input type="file" accept="image/*" onChange={onFile} className="text-sm text-white/80" />
          <p className="mt-1 text-xs text-white/40">JPG/PNG, max 5MB. Cropping simulated (in prod use react-image-crop).</p>
        </div>
      </div>
      {preview && <Button size="sm" variant="outline" onClick={() => setPreview("")}>Remove</Button>}
    </div>
  );
}
