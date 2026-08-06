/**
 * Step 268: Custom Representative Report Filter
 */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ReportFilter({ onFilter }: { onFilter?: (filters: Record<string, string>) => void }) {
  const [filters, setFilters] = useState({ agency: "", dateFrom: "", dateTo: "", status: "" });

  const apply = () => onFilter?.(filters);

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-[#2A1143] p-4">
      <h3 className="font-semibold">Step 268: Custom Report Filter</h3>
      <div className="grid gap-3 md:grid-cols-4">
        <input value={filters.agency} onChange={(e) => setFilters({ ...filters, agency: e.target.value })} placeholder="Agency" className="rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} className="rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} className="rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <Button size="sm" onClick={apply}>
        Apply Filter
      </Button>
    </div>
  );
}
