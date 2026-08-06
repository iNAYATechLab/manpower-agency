/**
 * Step 265: User IP & Device Tracking Visual
 */
"use client";
import { getLoginHistory } from "@/lib/auth/login-tracking";

export function IPTrackingVisual() {
  const logs = getLoginHistory(undefined, 5);
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 265: IP & Device Tracking Visual</h3>
      <div className="space-y-1">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#2A1143] px-3 py-2 text-sm">
            <span>
              {log.username} — {log.ip}
            </span>
            <span className={`text-xs ${log.success ? "text-green-400" : "text-red-400"}`}>{log.success ? "Success" : "Fail"}</span>
            <span className="text-xs text-white/40">{log.timestamp.toLocaleTimeString()}</span>
          </div>
        ))}
        {logs.length === 0 && <p className="text-sm text-white/60">No login history yet — Sign in to generate</p>}
      </div>
    </div>
  );
}
