/**
 * Steps 211-220: Payroll Management
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { generateBulkPayroll, calculateBulkTotals } from "@/lib/payroll/engine";
import { generateBankCSV } from "@/lib/payroll/bank-export";
import { generatePayslipPDF } from "@/lib/payroll/payslip";

const mockTimesheets = [
  { workerId: "WRK-2026-001", workerName: "Abdul Karim", regularHours: 160, overtimeHours: 8, payRate: 18, deductions: 50, advanceLoan: 100 },
  { workerId: "WRK-2026-002", workerName: "Mohammad Ali", regularHours: 168, overtimeHours: 12, payRate: 20, deductions: 0, advanceLoan: 0 },
];

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<ReturnType<typeof generateBulkPayroll> | null>(null);
  const totals = payrolls ? calculateBulkTotals(payrolls) : null;

  const generate = () => {
    const result = generateBulkPayroll(mockTimesheets);
    setPayrolls(result);
  };

  const downloadCSV = () => {
    if (!payrolls) return;
    const csv = generateBankCSV(payrolls);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bank_disbursement_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Payroll" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payroll & Salary Generation (Steps 211-220)</h1>
          <p className="text-sm text-white/60">211 Auto Generate from Timesheet • 216 Bulk • 219 Bank CSV • 220 Worker Portal</p>
        </div>
        <Button onClick={generate}>211 Generate Payroll from Approved Timesheet</Button>
      </div>

      {payrolls && totals && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Gross</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#E5B84B]">${totals.totalGross.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-400">-${totals.totalDeductions.toFixed(2)}</p>
                <p className="text-xs text-white/60">214 Advance & Loan Cutting</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Net Payable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-400">${totals.totalNet.toFixed(2)}</p>
                <p className="text-xs text-white/60">215 Net Payable Success Logic</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payroll Details (212-215 Calculator)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {payrolls.map((p) => (
                  <div key={p.workerId} className="rounded-lg border border-white/10 bg-[#1D0B2E] p-3">
                    <p className="font-medium">{p.workerName} ({p.workerId})</p>
                    <p className="text-xs text-white/60">{p.payroll.breakdown}</p>
                    <p className="font-bold text-[#E5B84B]">Net: ${p.payroll.netPayable.toFixed(2)}</p>
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const { html, filename } = generatePayslipPDF({
                            workerName: p.workerName,
                            workerCode: p.workerId,
                            period: "Aug 2026",
                            basicSalary: p.payroll.basicSalary,
                            overtimePay: p.payroll.overtimePay,
                            grossPay: p.payroll.grossPay,
                            deductions: p.payroll.totalDeductions - p.payroll.advanceCut,
                            advanceCut: p.payroll.advanceCut,
                            netPayable: p.payroll.netPayable,
                            payRate: mockTimesheets.find((t) => t.workerId === p.workerId)?.payRate || 18,
                            regularHours: mockTimesheets.find((t) => t.workerId === p.workerId)?.regularHours || 0,
                            overtimeHours: mockTimesheets.find((t) => t.workerId === p.workerId)?.overtimeHours || 0,
                          });
                          const w = window.open("", "_blank");
                          if (w) {
                            w.document.write(html);
                            w.document.title = filename;
                          }
                        }}
                      >
                        217-218 Payslip PDF (217 Generate, 218 Template)
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={downloadCSV} className="mt-4" variant="outline">
                219 Download Bank CSV/Excel
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
