/**
 * Steps 251-270: Analytics, Logger & Export Engine Dashboard
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProfitabilityChart } from "@/components/analytics/profitability-chart";
import { RevenuePayoutChart } from "@/components/analytics/revenue-payout-chart";
import { UtilizationDonut } from "@/components/analytics/utilization-donut";
import { CountryMap } from "@/components/analytics/country-map";
import { SkillDistributionChart } from "@/components/analytics/skill-distribution";
import { OverdueChart } from "@/components/analytics/overdue-chart";
import { AuditLogTable } from "@/components/analytics/audit-log-table";
import { DiffViewer } from "@/components/analytics/diff-viewer";
import { IPTrackingVisual } from "@/components/analytics/ip-tracking";
import { ReportFilter } from "@/components/analytics/report-filter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_WORKERS } from "@/lib/workers/types";
import { downloadXLSX } from "@/lib/export/xlsx";
import { downloadCSV } from "@/lib/export/csv";
import { printPDFReport } from "@/lib/export/pdf";
import { validateWorkerOnboarding } from "@/lib/validation/zod-schemas";
import { trackError, getTrackedErrors } from "@/lib/logger/error-tracking";
import { logPerformance, getPerformanceMetrics } from "@/lib/logger/performance";
import { generateWeeklySummaryEmail } from "@/lib/email/weekly-summary";
import { getAllClientReports } from "@/lib/reports/client-performance";

export default function AnalyticsPage() {
  const [validationResult, setValidationResult] = useState<string>("");

  const testValidation = () => {
    const result = validateWorkerOnboarding({ fullName: "A", passportNumber: "123", phone: "123" });
    setValidationResult(result.success ? "✓ Valid" : `✗ Errors: ${JSON.stringify(result.errors)}`);
    if (!result.success) trackError("Validation failed", "validation", JSON.stringify(result.errors));
    logPerformance("validation_test", 42);
  };

  const exportAll = (type: "xlsx" | "csv" | "pdf") => {
    const rows = MOCK_WORKERS.map((w) => ({ Code: w.workerCode, Name: w.fullName, Skill: w.skill, Grade: w.grade, Status: w.status }));
    if (type === "xlsx") downloadXLSX(rows, "Workers");
    if (type === "csv") downloadCSV(rows);
    if (type === "pdf") printPDFReport("Workers Report", rows);
  };

  const weeklyEmail = generateWeeklySummaryEmail({ week: "4 Aug - 8 Aug 2026", totalWorkers: 124, deployed: 87, idle: 37, totalTimesheets: 12, totalPayroll: 28500, overdueInvoices: 3 });
  const clientReports = getAllClientReports();
  const errors = getTrackedErrors();
  const perf = getPerformanceMetrics();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Analytics (251-270)" }]} />
      <div>
        <h1 className="text-2xl font-bold">Analytics, Logger & Export Engine (Steps 251-270)</h1>
        <p className="text-sm text-white/60">Profitability, Utilization, Maps, Exports, Validation, Audit Logs</p>
      </div>

      {/* 251-256 Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <ProfitabilityChart />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <RevenuePayoutChart />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <UtilizationDonut />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CountryMap />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <SkillDistributionChart />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="pt-6">
          <OverdueChart />
        </CardContent>
      </Card>
      <p className="text-xs text-white/40">Step 257: React Custom Chart Component Binder — All charts via lib/analytics/charts.ts</p>

      {/* 258-260 Export */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Steps 258-260: Export Engine</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => exportAll("xlsx")}>
            258 Export XLSX
          </Button>
          <Button size="sm" variant="outline" onClick={() => exportAll("csv")}>
            259 Export CSV
          </Button>
          <Button size="sm" variant="outline" onClick={() => exportAll("pdf")}>
            260 Print PDF Report
          </Button>
        </CardContent>
      </Card>

      {/* 261-262 Validation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Steps 261-262: Zod Validation & Form Error Processor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button size="sm" onClick={testValidation}>
            Test Validation (Invalid Data)
          </Button>
          <p className="text-sm">{validationResult}</p>
        </CardContent>
      </Card>

      {/* 263-265 Audit, Diff, IP */}
      <AuditLogTable />
      <DiffViewer oldValue={{ name: "Abdul Karim", grade: "B", status: "available" }} newValue={{ name: "Abdul Karim", grade: "A", status: "deployed" }} />
      <IPTrackingVisual />

      {/* 266-267 Error & Performance Logger */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">266 System Error Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <Button size="sm" variant="outline" onClick={() => trackError("Test error from analytics", "analytics")}>
              Track Error
            </Button>
            <div className="space-y-1">
              {errors.slice(0, 3).map((e) => (
                <div key={e.id} className="rounded bg-red-500/10 px-2 py-1 text-xs">
                  {e.context}: {e.message} (×{e.count})
                </div>
              ))}
              {errors.length === 0 && <p className="text-white/40">No errors yet</p>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">267 Performance Metrics Logger</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <Button size="sm" variant="outline" onClick={() => logPerformance("page_load", Math.floor(Math.random() * 200) + 50)}>
              Log Performance
            </Button>
            {perf.slice(0, 3).map((m) => (
              <div key={m.id} className="text-xs">
                {m.metric}: {m.value}
                {m.unit}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 268-270 Filters, Weekly Email, Client Report */}
      <ReportFilter onFilter={(f) => console.log("filter", f)} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">269 Auto-Generated Weekly Summary Email</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Subject: {weeklyEmail.subject}</p>
          <div className="mt-2 rounded border border-white/10 bg-white p-3 text-xs text-black" dangerouslySetInnerHTML={{ __html: weeklyEmail.html.slice(0, 500) + "..." }} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">270 Client Performance Report Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {clientReports.map((r) => (
            <div key={r.clientId} className="rounded-lg border border-white/10 bg-[#1D0B2E] p-3 text-sm">
              <p className="font-medium">{r.clientName} — ★ {r.avgRating} — On-Time {r.onTimeRate}%</p>
              <p className="text-xs text-white/60">Workers: {r.totalWorkers} • Invoices: {r.totalInvoices} • Paid: ${r.totalPaid}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
