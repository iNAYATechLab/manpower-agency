/**
 * Step 273: Salary & Overtime Calculation Unit Test
 */
import { describe, it, expect } from "vitest";
import { calculatePayroll } from "@/lib/payroll/calculator";
import { calculateOTPay } from "@/lib/timesheet/calculations";

describe("Salary & OT Calculation", () => {
  it("should calculate basic salary", () => {
    const result = calculatePayroll({ regularHours: 160, overtimeHours: 0, payRate: 18 });
    expect(result.basicSalary).toBe(2880);
    expect(result.netPayable).toBe(2880);
  });

  it("should calculate OT with 1.5x", () => {
    const result = calculateOTPay({ regularHours: 8, overtimeHours: 2, payRate: 18 });
    expect(result.overtimePay).toBe(54); // 2 * 18 * 1.5
    expect(result.totalPay).toBe(198); // 144 + 54
  });

  it("should calculate OT with 1.5x for first 2h and 2.0x beyond", () => {
    const result = calculateOTPay({ regularHours: 8, overtimeHours: 4, payRate: 18 });
    expect(result.overtimePay).toBe(126); // 2*18*1.5=54 + 2*18*2=72 => 126
  });

  it("should add night allowance", () => {
    const result = calculateOTPay({ regularHours: 8, overtimeHours: 0, payRate: 18, isNightShift: true, nightAllowance: 5 });
    expect(result.nightPay).toBe(5);
  });
});
