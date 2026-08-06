/**
 * Steps 167-170: Worker Profile Details View + Performance + Complaint + Blacklist
 */

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PrintPDFButtons } from "@/components/workers/print-pdf";
import { PerformanceHistory } from "@/components/workers/performance-history";
import { ComplaintForm } from "@/components/workers/complaint-form";
import { BlacklistButton } from "@/components/workers/blacklist-button";
import { MOCK_WORKERS } from "@/lib/workers/types";

export default function WorkerProfilePage({ params }: { params: { id: string } }) {
  const worker = MOCK_WORKERS.find((w) => w.id === params.id) || MOCK_WORKERS[0]!;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Workers", href: "/agency/workers" }, { label: worker.fullName }]} />

      {/* Step 167: Profile Details View */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E5B84B] text-2xl font-bold text-[#1D0B2E]">{worker.fullName.slice(0, 2)}</div>
          <div>
            <h1 className="text-2xl font-bold">{worker.fullName} (Step 167)</h1>
            <p className="text-sm text-white/60">
              {worker.workerCode} • {worker.skill} • Grade {worker.grade} • {worker.status}
            </p>
            <p className="text-xs text-white/40">Location: {worker.location} • Phone: {worker.phone}</p>
          </div>
        </div>
        <PrintPDFButtons workerId={worker.id} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal & Passport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>Passport: PP123456 • Expiry: 2028-12-31</p>
            <p>Akama: 123456789 • Expiry: 2027-06-30</p>
            <p>Medical: Fit • Expiry: 2027-12-31</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bank & Emergency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>Bank: Islami Bank • IBAN: SA123...</p>
            <p>Emergency: Father — +88018...</p>
          </CardContent>
        </Card>
      </div>

      {/* Step 168: Performance History Tab */}
      <PerformanceHistory />

      {/* Steps 169-170 */}
      <div className="grid gap-4 md:grid-cols-2">
        <ComplaintForm workerId={worker.id} />
        <BlacklistButton workerId={worker.id} />
      </div>
    </div>
  );
}
