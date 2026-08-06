/**
 * Steps 162-166: All Workers Data Table + Filters + Print/PDF
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WorkersDataTable } from "@/components/workers/data-table";
import { WorkerFilters } from "@/components/workers/filter-dropdown";
import { PrintPDFButtons } from "@/components/workers/print-pdf";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WorkersPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Workers" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workers Directory (Steps 162-170)</h1>
          <p className="text-sm text-white/60">All workers • Filter • Print/PDF • Profile • Blacklist</p>
        </div>
        <Link href="/agency/workers/onboarding">
          <Button>＋ Onboard Worker</Button>
        </Link>
      </div>

      <WorkerFilters onFilter={(f) => console.log("filter", f)} />

      <WorkersDataTable onSelect={setSelected} />

      {selected && (
        <div className="rounded-xl border border-[#E5B84B]/20 bg-[#2A1143] p-4">
          <p className="text-sm">Selected: {selected}</p>
          <div className="mt-2 flex gap-2">
            <Link href={`/agency/workers/${selected}`}>
              <Button size="sm">View Profile (167)</Button>
            </Link>
            <PrintPDFButtons workerId={selected} />
          </div>
        </div>
      )}
    </div>
  );
}
