/**
 * Steps 139-144: Metric Cards
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MetricCard({
  title,
  value,
  icon,
  trend,
  sub,
  accent = "#E5B84B",
}: {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <Card className="border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-white/60">
          {title} <span className="text-lg">{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold" style={{ color: accent }}>
          {value}
        </p>
        {trend && <p className="text-xs text-green-400">{trend}</p>}
        {sub && <p className="text-xs text-white/40">{sub}</p>}
      </CardContent>
    </Card>
  );
}

// Step 139: Total Active Workers
export function TotalActiveWorkersCard({ count = 124 }: { count?: number }) {
  return <MetricCard title="Total Active Workers" value={count} icon="👷" trend="↑ 12% from last month" sub="Available + Deployed" accent="#E5B84B" />;
}

// Step 140: Deployed Workers
export function DeployedWorkersCard({ count = 87 }: { count?: number }) {
  return <MetricCard title="Deployed Workers" value={count} icon="🚀" trend="↑ 8% deployed" sub="On-site active" accent="#B388FF" />;
}

// Step 141: Idle/Bench Workers
export function IdleWorkersCard({ count = 37 }: { count?: number }) {
  return <MetricCard title="Idle / Bench Workers" value={count} icon="⏸️" sub="Available for deployment" accent="#FFFFFF" />;
}

// Step 142: Active Client Contracts
export function ActiveContractsCard({ count = 12 }: { count?: number }) {
  return <MetricCard title="Active Client Contracts" value={count} icon="📄" trend="2 expiring soon" sub="Across 8 clients" accent="#E5B84B" />;
}

// Step 143: Pending Timesheets
export function PendingTimesheetsCard({ count = 9 }: { count?: number }) {
  return <MetricCard title="Pending Timesheets" value={count} icon="⏱️" sub="Awaiting approval" accent="#B388FF" />;
}

// Step 144: Overdue Invoices
export function OverdueInvoicesCard({ count = 3, amount = "$12,400" }: { count?: number; amount?: string }) {
  return <MetricCard title="Overdue Invoices" value={`${count} • ${amount}`} icon="⚠️" trend="Action required" sub="Revenue alert" accent="#EF4444" />;
}
