/**
 * Step 250: Watermarked Document Preview Viewer UI
 */
"use client";
import { useState } from "react";
import { addWatermark, needsWatermark } from "@/lib/storage/watermark";
import { Button } from "@/components/ui/button";

export function WatermarkedViewer({ fileUrl, fileType }: { fileUrl: string; fileType: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const needs = needsWatermark(fileType);

  const generatePreview = async () => {
    const result = await addWatermark(fileUrl, { text: "iNAYATechLab - Confidential", opacity: 0.15 });
    setPreviewUrl(result.previewUrl);
  };

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-[#2A1143] p-4">
      <h3 className="font-semibold">Step 250: Watermarked Document Preview</h3>
      <p className="text-xs text-white/60">Original: {fileUrl.slice(0, 40)}... | Type: {fileType} | Needs Watermark: {needs ? "Yes" : "No"}</p>
      <div className="flex h-40 items-center justify-center rounded-lg border border-[#B388FF]/20 bg-[#1D0B2E]">
        {previewUrl ? <img src={previewUrl} alt="Watermarked Preview" className="h-full w-full object-contain opacity-80" /> : <span className="text-white/40">No preview yet</span>}
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={generatePreview}>
          Generate Watermarked Preview
        </Button>
        <Button size="sm" variant="outline" onClick={() => window.open(fileUrl, "_blank")}>
          Download Original (Permission Check)
        </Button>
      </div>
      <p className="text-xs text-white/40">Preview has diagonal watermark, original requires permission (Step 249)</p>
    </div>
  );
}
