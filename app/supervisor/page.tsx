/**
 * Step 146: Field Supervisor Mobile Dashboard UI
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupervisorDashboardPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Supervisor Dashboard" }]} />
      <div>
        <h1 className="text-2xl font-bold">Field Supervisor Dashboard (Step 146) — Mobile-First</h1>
        <p className="text-sm text-white/60">NEOM Site A — Attendance, Geofencing, Quick Deploy</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#E5B84B]">87 / 90 Present</p>
            <p className="text-xs text-white/60">3 Absent • GPS Verified 82</p>
            <Button size="sm" className="mt-3">
              Mark Attendance (Geofenced)
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Workers (Site A)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-white/5 py-1">
              <span>Abdul Karim — Welder</span>
              <span className="text-green-400">✓ Present</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Karim Mia — Helper</span>
              <span className="text-red-400">✗ Absent</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-[#E5B84B]/20">
        <CardHeader>
          <CardTitle className="text-base">SOS Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/60">No SOS alerts — All workers safe</p>
        </CardContent>
      </Card>
    </div>
  );
}
