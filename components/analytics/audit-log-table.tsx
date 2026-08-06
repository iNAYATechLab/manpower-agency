/**
 * Step 263: Audit Log Table UI
 */
"use client";
import { getAuditLogs } from "@/lib/audit/logger";

export function AuditLogTable() {
  const logs = getAuditLogs({ limit: 10 });
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 263: Audit Log Table UI</h3>
      <div className="overflow-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#2A1143] text-white/60">
            <tr>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Resource</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-white/5">
                <td className="p-2 text-xs">{log.timestamp.toLocaleTimeString()}</td>
                <td className="p-2">{log.username}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.resource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
