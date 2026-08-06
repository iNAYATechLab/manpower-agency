/**
 * Step 145: Client Dashboard Interface
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Client Dashboard" }]} />
      <div>
        <h1 className="text-2xl font-bold">Client Dashboard (Step 145)</h1>
        <p className="text-sm text-white/60">NEOM Construction Co. — Demands, Approvals, Billing</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Demands</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#E5B84B]">1 Open</p>
            <p className="text-xs text-white/60">50 Welders for NEOM — 12 Filled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#B388FF]">9</p>
            <p className="text-xs text-white/60">Timesheets awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Outstanding Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-white/60">$42,000 Due</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button>Approve Timesheets</Button>
          <Button variant="outline">View Billing</Button>
          <Button variant="ghost">New Demand</Button>
        </CardContent>
      </Card>
    </div>
  );
}
