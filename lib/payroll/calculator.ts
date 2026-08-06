/**
 * Steps 212-215: Payroll Calculator Algorithms
 */

export interface PayrollInput {
  regularHours: number;
  overtimeHours: number;
  payRate: number;
  otRate?: number; // Usually payRate * 1.5 or 2.0
  deductions?: number;
  advanceLoan?: number;
}

export interface PayrollResult {
  basicSalary: number; // 212
  overtimePay: number; // 213
  grossPay: number;
  totalDeductions: number; // 214
  advanceCut: number;
  netPayable: number; // 215
  breakdown: string;
}

/**
 * Step 212: Basic Salary Calculator
 * Step 213: Overtime Pay Calculation
 * Step 214: Advance Loan & Deduction Cutting Logic
 * Step 215: Net Payable Logic
 */
export function calculatePayroll(input: PayrollInput): PayrollResult {
  const basicSalary = input.regularHours * input.payRate; // 212
  const otRate = input.otRate ?? input.payRate * 1.5;
  const overtimePay = input.overtimeHours * otRate; // 213
  const grossPay = basicSalary + overtimePay;
  const deductions = input.deductions ?? 0;
  const advanceCut = input.advanceLoan ?? 0;
  const totalDeductions = deductions + advanceCut; // 214
  const netPayable = grossPay - totalDeductions; // 215

  const breakdown = `Basic: ${input.regularHours}h x $${input.payRate} = $${basicSalary.toFixed(2)} | OT: ${input.overtimeHours}h x $${otRate.toFixed(2)} = $${overtimePay.toFixed(2)} | Gross: $${grossPay.toFixed(2)} | Deductions: $${deductions} + Advance: $${advanceCut} = $${totalDeductions} | Net: $${netPayable.toFixed(2)}`;

  return { basicSalary, overtimePay, grossPay, totalDeductions, advanceCut, netPayable, breakdown };
}
