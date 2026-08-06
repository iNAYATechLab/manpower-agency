/**
 * Step 28: Super Admin Dashboard Page
 * Shows CEO profile, audit logs, health, impersonation, etc.
 */
import { CEO_PROFILE } from "@/lib/ceo";
import { getCEOAuditLogs } from "@/lib/audit/logger";
import { getSystemHealthReport } from "@/lib/monitoring/health";
import { getSystemMetrics } from "@/lib/monitoring/system-metrics";
import { getBackupJobs } from "@/lib/db/backup";
import { getFeatureFlags } from "@/lib/features/flags";
import { getAllBroadcasts } from "@/lib/notifications/broadcast";
import { getMasterKeyInfo } from "@/lib/security/master-key";
import { getRecoveryCodesInfo } from "@/lib/security/recovery";
import { is2FAEnabled } from "@/lib/auth/2fa";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuperAdminDashboardPage() {
  const auditLogs = getCEOAuditLogs(5);
  const health = getSystemHealthReport();
  const metrics = getSystemMetrics();
  const backups = getBackupJobs(3);
  const flags = getFeatureFlags();
  const broadcasts = getAllBroadcasts(3);
  const masterKey = getMasterKeyInfo();
  const recovery = getRecoveryCodesInfo();
  const twoFA = is2FAEnabled(CEO_PROFILE.username);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl border border-[#B388FF]/20 bg-gradient-to-br from-[#2A1143] to-[#1D0B2E] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            <p className="mt-1 text-white/60">
              Welcome, <span className="font-semibold text-white">{CEO_PROFILE.fullName}</span> — {CEO_PROFILE.title} · Unrestricted Access
            </p>
            <p className="mt-2 text-sm text-[#E5B84B]">Step 21-40 · Super Admin & Company Backbone · IVCS v1.0.0</p>
          </div>
          <div className="rounded-xl bg-[#1D0B2E] p-3 text-xs">
            <p className="text-white/60">Master Key</p>
            <p className="font-mono text-[#B388FF]">{masterKey?.id.slice(0, 16)}... v{masterKey?.version}</p>
            <p className="mt-1 text-white/60">2FA: {twoFA ? "✓ Enabled" : "✗ Disabled"} · Recovery: {recovery.filter((r) => !r.used).length} codes</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/super-admin/health">
            <Button size="sm">Health Monitor</Button>
          </Link>
          <Link href="/super-admin/backup">
            <Button variant="outline" size="sm">
              Trigger Backup
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            Impersonate Agency →
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Health</CardTitle>
            <CardDescription>Overall: {health.overall}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${health.overall === "healthy" ? "text-green-400" : "text-yellow-400"}`}>
              {health.overall.toUpperCase()}
            </p>
            <p className="text-xs text-white/60">Uptime: {Math.floor(health.uptimeSeconds / 3600)}h · {health.checks.length} services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Server Metrics</CardTitle>
            <CardDescription>CPU & Memory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">CPU: {metrics.cpu.usagePercent}% · Cores: {metrics.cpu.cores}</p>
            <p className="text-sm">Memory: {metrics.memory.usagePercent}% ({metrics.memory.usedMB}/{metrics.memory.totalMB} MB)</p>
            <p className="text-xs text-white/60">Heap: {metrics.memory.processHeapUsedMB} MB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Feature Flags</CardTitle>
            <CardDescription>{flags.filter((f) => f.enabled).length}/{flags.length} enabled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {flags.slice(0, 4).map((f) => (
                <span
                  key={f.key}
                  className={`rounded-full px-2 py-1 text-xs ${f.enabled ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/60"}`}
                >
                  {f.key}
                </span>
              ))}
            </div>
            <Link href="/super-admin/features" className="mt-2 inline-block text-xs text-[#B388FF] hover:underline">
              Manage →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Audit + Broadcast + Backup */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">CEO Audit Log (Step 27)</CardTitle>
            <CardDescription>Last 5 activities · Non-deletable</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {auditLogs.map((log) => (
                <li key={log.id} className="flex justify-between border-b border-white/5 py-2 last:border-0">
                  <span>
                    <span className="font-medium text-[#E5B84B]">{log.action}</span> on {log.resource}
                  </span>
                  <span className="text-xs text-white/40">{log.timestamp.toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Backups & Broadcasts</CardTitle>
            <CardDescription>Step 37 & 40</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold">Recent Backups</p>
              {backups.length === 0 ? (
                <p className="text-xs text-white/60">No backups yet — Trigger from Backup page</p>
              ) : (
                <ul className="text-xs text-white/70">
                  {backups.map((b) => (
                    <li key={b.id}>
                      {b.id.slice(0, 12)} · {b.status} · {b.type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">Broadcasts</p>
              {broadcasts.length === 0 ? (
                <p className="text-xs text-white/60">No broadcasts</p>
              ) : (
                <ul className="text-xs text-white/70">
                  {broadcasts.map((b) => (
                    <li key={b.id}>
                      {b.title} → {b.target} ({b.priority})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CEO Protection Notice */}
      <Card className="border-[#E5B84B]/30">
        <CardHeader>
          <CardTitle className="text-base text-[#E5B84B]">🛡️ CEO Firewall Active (Steps 23-24)</CardTitle>
          <CardDescription>Database-level protection for CEO account</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-white/70">
          <ul className="list-disc pl-5">
            <li>BLOCK_CEO_SOFT_DELETE — deletedAt prevented</li>
            <li>BLOCK_CEO_HARD_DELETE — DELETE prevented</li>
            <li>BLOCK_CEO_TRUNCATE — TRUNCATE users blocked</li>
            <li>Non-Deletable Flag: true · isSuperAdmin: true · Unrestricted: *</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
