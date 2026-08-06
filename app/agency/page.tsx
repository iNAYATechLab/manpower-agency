/**
 * Step 138: Agency Main Management Dashboard
 * Steps 139-144: Metric Cards
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TotalActiveWorkersCard, DeployedWorkersCard, IdleWorkersCard, ActiveContractsCard, PendingTimesheetsCard, OverdueInvoicesCard } from "@/components/dashboard/metric-card";
import { AgencyHealthCard } from "@/components/dashboard/agency-health-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AgencyDashboardPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Agency Dashboard" }]} />
      <div>
        <h1 className="text-2xl font-bold">Agency Management Dashboard (Step 138)</h1>
        <p className="text-sm text-white/60">Total overview — Workers, Contracts, Timesheets, Revenue</p>
      </div>

      {/* Metrics 139-144 */}
      <div className="grid gap-4 md:grid-cols-3">
        <TotalActiveWorkersCard count={124} />
        <DeployedWorkersCard count={87} />
        <IdleWorkersCard count={37} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <ActiveContractsCard count={12} />
        <PendingTimesheetsCard count={9} />
        <OverdueInvoicesCard count={3} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <AgencyHealthCard health="healthy" cpu={32} memory={58} />
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Deployments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-white/5 py-2">
              <span>Abdul Karim → NEOM Site A (Welder, Grade A)</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between border-b border-white/5 py-2">
              <span>Mohammad Ali → NEOM Site A (Electrician)</span>
              <span className="text-yellow-400">Pending</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Rahim Uddin — Bench (Available)</span>
              <span className="text-white/60">Idle</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
