/**
 * Steps 194, 203-205, 209-210: Timesheet Details (Worker Entry, History, Dispute, Workflow, Signature, Locked)
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WorkerEntry } from "@/components/timesheet/worker-entry";
import { HistoryView } from "@/components/timesheet/history-view";
import { DisputeSystem } from "@/components/timesheet/dispute-system";
import { DigitalSignature } from "@/components/timesheet/digital-signature";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TimesheetDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Timesheets", href: "/agency/timesheets" }, { label: `Timesheet ${id}` }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Timesheet {id} — Week 4 Aug - 8 Aug</h1>
          <p className="text-sm text-white/60">NEOM Site A • 12 Workers • Status: Draft → Submitted → Locked</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm">Submit (205)</Button>
        </div>
      </div>

      <WorkerEntry />

      <div className="grid gap-4 md:grid-cols-2">
        <HistoryView timesheetId={id} />
        <DisputeSystem timesheetId={id} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Step 205 & 210: Submission Workflow & Locked Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>Draft → Submitted (Supervisor) → Approved (Client) → <span className="font-bold text-[#E5B84B]">Locked (Read-Only)</span></p>
          <p className="text-xs text-white/60">Once Locked, no edits allowed — Firewall prevents tampering (Step 210)</p>
          <div className="flex gap-2">
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs">Draft</span>
            <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs">Submitted</span>
            <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs">Approved</span>
            <span className="rounded-full bg-[#E5B84B]/20 px-2 py-1 text-xs font-bold">Locked</span>
          </div>
        </CardContent>
      </Card>

      <DigitalSignature onSign={(url) => console.log("signed", url.slice(0, 20))} />

      <Link href="/agency/timesheets" className="text-sm text-[#B388FF] hover:underline">
        ← Back to Timesheets
      </Link>
    </div>
  );
}
