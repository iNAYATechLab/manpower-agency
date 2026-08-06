/**
 * Step 147: Worker Personal Dashboard Screen
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WorkerDashboardPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Dashboard" }]} />
      <div>
        <h1 className="text-2xl font-bold">Worker Personal Dashboard (Step 147)</h1>
        <p className="text-sm text-white/60">Abdul Karim — Welder (Grade A) • NEOM Site A</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Hours (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#E5B84B]">168 hrs</p>
            <p className="text-xs text-white/60">Regular 160 + OT 8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payslip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$3,024</p>
            <p className="text-xs text-white/60">Aug 2026 • Paid</p>
            <Button size="sm" variant="outline" className="mt-2">
              Download PDF
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documents Expiry</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Passport: 28 Dec 2028 ✓</p>
            <p className="text-sm text-yellow-400">Akama: 60 days left ⚠️</p>
            <Button size="sm" variant="ghost" className="mt-2">
              View All
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="text-base text-red-400">🆘 SOS Emergency</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/60">Press to alert supervisor & agency admin</p>
          <Button variant="destructive" size="sm" className="mt-2">
            SOS Alert
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
