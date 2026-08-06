/**
 * Step 220: Worker Portal Pay-slip Download Feature
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const payslips = [
  { period: "Aug 2026", gross: 3024, net: 2874, status: "Paid" },
  { period: "Jul 2026", gross: 2880, net: 2730, status: "Paid" },
  { period: "Jun 2026", gross: 2950, net: 2800, status: "Paid" },
];

export default function WorkerPayslipsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Worker", href: "/worker" }, { label: "Payslips (220)" }]} />
      <div>
        <h1 className="text-2xl font-bold">My Pay-slips (Step 220) — Worker Portal</h1>
        <p className="text-sm text-white/60">Download PDF payslips generated from payroll (Steps 217-218)</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {payslips.map((p) => (
          <Card key={p.period}>
            <CardHeader>
              <CardTitle className="text-base">{p.period}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Gross: ${p.gross}</p>
              <p className="text-sm font-bold text-[#E5B84B]">Net: ${p.net}</p>
              <p className="text-xs text-green-400">{p.status}</p>
              <Button size="sm" variant="outline" className="mt-2">
                Download PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
