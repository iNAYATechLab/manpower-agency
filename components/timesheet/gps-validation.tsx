/**
 * Steps 200-201: GPS Clocking Validation + Geofencing Radius Check UI
 */
"use client";
import { useState } from "react";
import { validateClocking } from "@/lib/timesheet/validation";
import { Button } from "@/components/ui/button";

export function GPSValidation() {
  const [lat, setLat] = useState("28.0005");
  const [lng, setLng] = useState("35.0005");
  const [result, setResult] = useState<{ valid: boolean; reason: string } | null>(null);

  const check = () => {
    const res = validateClocking({ latitude: parseFloat(lat), longitude: parseFloat(lng) }, { latitude: 28.0, longitude: 35.0 }, 100);
    setResult(res);
  };

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-[#1D0B2E] p-4">
      <h3 className="font-semibold">Steps 200-201: GPS Clocking & Geofencing</h3>
      <div className="grid gap-2 md:grid-cols-2">
        <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Worker Lat" className="rounded border border-white/10 bg-[#2A1143] px-3 py-2 text-sm" />
        <input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Worker Lng" className="rounded border border-white/10 bg-[#2A1143] px-3 py-2 text-sm" />
      </div>
      <p className="text-xs text-white/40">Site: 28.0, 35.0 • Radius: 100m</p>
      <Button size="sm" onClick={check}>
        Validate Clocking
      </Button>
      {result && <p className={`text-sm ${result.valid ? "text-green-400" : "text-red-400"}`}>{result.reason}</p>}
    </div>
  );
}
