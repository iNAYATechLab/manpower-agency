/**
 * Step 209: Canvas based Digital Signature Component
 */
"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function DigitalSignature({ onSign }: { onSign?: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signed, setSigned] = useState(false);

  const startDraw = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#E5B84B";
    ctx.lineWidth = 2;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    const move = (ev: MouseEvent) => {
      ctx.lineTo(ev.clientX - rect.left, ev.clientY - rect.top);
      ctx.stroke();
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      setSigned(true);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
  };

  const save = () => {
    const url = canvasRef.current?.toDataURL() || "";
    onSign?.(url);
    alert("Signature saved (mock)!");
  };

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-[#2A1143] p-4">
      <h3 className="font-semibold">Step 209: Digital Signature (Canvas)</h3>
      <canvas ref={canvasRef} width={400} height={150} onMouseDown={startDraw} className="w-full cursor-crosshair rounded border border-[#B388FF]/30 bg-white" />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={clear}>
          Clear
        </Button>
        <Button size="sm" onClick={save} disabled={!signed}>
          Save Signature
        </Button>
      </div>
      <p className="text-xs text-white/40">Client draws signature to approve timesheet</p>
    </div>
  );
}
