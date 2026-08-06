/**
 * Steps 34 & 35: Global System Health + CPU/Memory Tracking
 */
import { getSystemHealthReport } from "@/lib/monitoring/health";
import { getSystemMetrics, getMetricsHistory } from "@/lib/monitoring/system-metrics";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function HealthPage() {
  const health = getSystemHealthReport();
  const metrics = getSystemMetrics();
  const history = getMetricsHistory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">System Health Monitoring (Steps 34-35)</h1>
        <p className="text-sm text-white/60">Global health + CPU/Memory tracking · Auto-refresh</p>
      </div>

      {/* Overall */}
      <Card className={health.overall === "healthy" ? "border-green-500/30" : "border-yellow-500/30"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${health.overall === "healthy" ? "bg-green-500" : health.overall === "degraded" ? "bg-yellow-500" : "bg-red-500"}`} />
            Overall: {health.overall.toUpperCase()}
          </CardTitle>
          <CardDescription>Version {health.version} · Uptime {Math.floor(health.uptimeSeconds / 60)} min · {health.timestamp.toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3">
            {health.checks.map((c) => (
              <div key={c.service} className="rounded-lg border border-white/10 bg-[#1D0B2E] p-3">
                <p className="text-sm font-medium">{c.service}</p>
                <p className={`text-xs ${c.status === "healthy" ? "text-green-400" : c.status === "degraded" ? "text-yellow-400" : "text-red-400"}`}>{c.status} · {c.latencyMs}ms</p>
                {c.details && <p className="text-xs text-white/60">{c.details}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CPU / Memory */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">CPU Tracking (Step 35)</CardTitle>
            <CardDescription>{metrics.cpu.cores} cores · Load Avg {metrics.cpu.loadAvg1m.toFixed(2)}/{metrics.cpu.loadAvg5m.toFixed(2)}/{metrics.cpu.loadAvg15m.toFixed(2)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.cpu.usagePercent}%</p>
            <p className="text-xs text-white/60">Process CPU usage</p>
            <div className="mt-3 h-2 w-full rounded bg-white/10">
              <div className="h-2 rounded bg-[#E5B84B]" style={{ width: `${metrics.cpu.usagePercent}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Memory Tracking</CardTitle>
            <CardDescription>{metrics.memory.usedMB} / {metrics.memory.totalMB} MB used</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics.memory.usagePercent}%</p>
            <p className="text-xs text-white/60">Heap: {metrics.memory.processHeapUsedMB}/{metrics.memory.processHeapTotalMB} MB</p>
            <div className="mt-3 h-2 w-full rounded bg-white/10">
              <div className="h-2 rounded bg-[#B388FF]" style={{ width: `${metrics.memory.usagePercent}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Metrics History (Last {history.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-sm text-white/60">No history yet — Refresh to collect</p>
          ) : (
            <div className="space-y-1 text-xs">
              {history.slice(-5).map((m, i) => (
                <div key={i} className="flex justify-between border-b border-white/5 py-1">
                  <span>{m.timestamp.toLocaleTimeString()}</span>
                  <span>CPU {m.cpu.usagePercent}% · Mem {m.memory.usagePercent}%</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
