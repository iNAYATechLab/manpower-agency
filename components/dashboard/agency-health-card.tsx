/**
 * Step 137: Agency System Health Visualization Card
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AgencyHealthCard({ health = "healthy", cpu = 32, memory = 58 }: { health?: string; cpu?: number; memory?: number }) {
  const color = health === "healthy" ? "bg-green-500" : health === "degraded" ? "bg-yellow-500" : "bg-red-500";
  return (
    <Card className="border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <span className={`h-3 w-3 rounded-full ${color}`} /> System Health — {health.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-white/60">CPU {cpu}%</p>
          <div className="h-2 w-full rounded bg-white/10">
            <div className="h-2 rounded bg-[#E5B84B]" style={{ width: `${cpu}%` }} />
          </div>
        </div>
        <div>
          <p className="text-xs text-white/60">Memory {memory}%</p>
          <div className="h-2 w-full rounded bg-white/10">
            <div className="h-2 rounded bg-[#B388FF]" style={{ width: `${memory}%` }} />
          </div>
        </div>
        <p className="text-xs text-white/40">Uptime 12d 4h • Version v1.4.0</p>
      </CardContent>
    </Card>
  );
}
