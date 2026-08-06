/**
 * Steps 206-210: Client Portal Timesheets (Pending, Bulk Approve, Rejection, Signature, Locked)
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ClientPendingList } from "@/components/timesheet/client-pending";
import { BulkApprove } from "@/components/timesheet/bulk-approve";
import { RejectionFlow } from "@/components/timesheet/rejection-flow";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ClientTimesheetsPage() {
  const [selected, setSelected] = useState<string | null>("ts_001");

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/client" }, { label: "Timesheets (Client Portal)" }]} />
      <div>
        <h1 className="text-2xl font-bold">Client Portal — Timesheet Approval (Steps 206-210)</h1>
        <p className="text-sm text-white/60">Pending list, Bulk Approve All, Rejection with Comment, Digital Signature, Locked Status</p>
      </div>

      <ClientPendingList onSelect={setSelected} />

      {selected && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timesheet {selected} — Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>NEOM Site A • Week 4 Aug - 8 Aug • 12 Workers • Total 480 hrs</p>
              <p className="text-xs text-white/60">Regular 384h • OT 96h (1.5x/2.0x) • Night 12h • Hazard 5h</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <BulkApprove timesheetIds={[selected]} />
            <RejectionFlow timesheetId={selected} />
          </div>
        </>
      )}
    </div>
  );
}
