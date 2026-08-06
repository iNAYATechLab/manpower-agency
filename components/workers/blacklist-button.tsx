/**
 * Step 170: Blacklist Worker / Deactivate Button
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BlacklistButton({ workerId, initialBlacklisted = false }: { workerId: string; initialBlacklisted?: boolean }) {
  const [blacklisted, setBlacklisted] = useState(initialBlacklisted);
  const [reason, setReason] = useState("");

  const toggle = () => {
    if (!blacklisted && !reason) {
      alert("Enter blacklist reason");
      return;
    }
    setBlacklisted(!blacklisted);
  };

  return (
    <div className="space-y-2 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <h3 className="font-semibold text-red-300">Step 170: Blacklist Worker</h3>
      {!blacklisted ? (
        <>
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for blacklisting..." className="w-full rounded-lg border border-red-500/20 bg-[#1D0B2E] px-3 py-2 text-sm" />
          <Button size="sm" variant="destructive" onClick={toggle}>
            Blacklist {workerId}
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-red-300">⚠️ Blacklisted: {reason || "No reason"}</p>
          <Button size="sm" variant="outline" onClick={toggle}>
            Reactivate Worker
          </Button>
        </>
      )}
    </div>
  );
}
