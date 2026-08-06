/**
 * Step 211: Approved Timesheet to Payroll Generation Engine
 * Step 216: Bulk Payroll Processing Service
 */

import { calculatePayroll } from "@/lib/payroll/calculator";
import type { PayrollInput } from "@/lib/payroll/calculator";

export interface TimesheetForPayroll {
  workerId: string;
  workerName: string;
  regularHours: number;
  overtimeHours: number;
  payRate: number;
  deductions?: number;
  advanceLoan?: number;
}

export interface PayrollForWorker {
  workerId: string;
  workerName: string;
  payroll: ReturnType<typeof calculatePayroll>;
}

/**
 * Step 211: Generate payroll from approved timesheet (single worker)
 */
export function generatePayrollFromTimesheet(input: TimesheetForPayroll): PayrollForWorker {
  const payroll = calculatePayroll({
    regularHours: input.regularHours,
    overtimeHours: input.overtimeHours,
    payRate: input.payRate,
    deductions: input.deductions,
    advanceLoan: input.advanceLoan,
  });
  return { workerId: input.workerId, workerName: input.workerName, payroll };
}

/**
 * Step 216: Bulk payroll processing
 */
export function generateBulkPayroll(timesheets: TimesheetForPayroll[]): PayrollForWorker[] {
  return timesheets.map(generatePayrollFromTimesheet);
}

export function calculateBulkTotals(payrolls: PayrollForWorker[]): { totalGross: number; totalNet: number; totalDeductions: number } {
  const totalGross = payrolls.reduce((sum, p) => sum + p.payroll.grossPay, 0);
  const totalDeductions = payrolls.reduce((sum, p) => sum + p.payroll.totalDeductions, 0);
  const totalNet = payrolls.reduce((sum, p) => sum + p.payroll.netPayable, 0);
  return { totalGross, totalNet, totalDeductions };
}
