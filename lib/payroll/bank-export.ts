/**
 * Step 219: Bank Disbursement CSV/Excel File Generator
 */

import { type PayrollForWorker } from "@/lib/payroll/engine";

export function generateBankCSV(payrolls: PayrollForWorker[]): string {
  const header = ["Worker Code", "Worker Name", "Bank Account", "Amount", "Currency"];
  const rows = payrolls.map((p) => [
    p.workerId,
    p.workerName,
    `ACC-${p.workerId.slice(-4)}`, // Mock account
    p.payroll.netPayable.toFixed(2),
    "SAR",
  ]);
  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  return csv;
}

export function generateBankExcelData(payrolls: PayrollForWorker[]): Array<Record<string, string>> {
  return payrolls.map((p) => ({
    workerCode: p.workerId,
    workerName: p.workerName,
    account: `ACC-${p.workerId.slice(-4)}`,
    amount: p.payroll.netPayable.toFixed(2),
    currency: "SAR",
  }));
}
