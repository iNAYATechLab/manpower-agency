/**
 * Steps 197-199,202: Overtime, Night Allowance, Hazard Pay, Holiday Override
 */

export interface OTCalculationInput {
  regularHours: number;
  overtimeHours: number;
  isNightShift?: boolean;
  isHazard?: boolean;
  isHoliday?: boolean;
  payRate: number; // $/hr
  overtimeMultiplier1?: number; // 1.5x
  overtimeMultiplier2?: number; // 2.0x
  nightAllowance?: number;
  hazardPay?: number;
}

export interface OTCalculationResult {
  regularPay: number;
  overtimePay: number;
  nightPay: number;
  hazardPay: number;
  totalPay: number;
  breakdown: string;
}

/**
 * Step 197: 1.5x & 2.0x Overtime Multiplier Backend Algorithm
 * - First 2 OT hrs at 1.5x, beyond at 2.0x (common in GCC)
 */
export function calculateOTPay(input: OTCalculationInput): OTCalculationResult {
  const m1 = input.overtimeMultiplier1 ?? 1.5;
  const m2 = input.overtimeMultiplier2 ?? 2.0;

  const regularPay = input.regularHours * input.payRate;

  let overtimePay = 0;
  let breakdown = `Regular: ${input.regularHours}h x $${input.payRate} = $${regularPay.toFixed(2)}`;

  if (input.overtimeHours > 0) {
    const first2 = Math.min(input.overtimeHours, 2);
    const beyond2 = Math.max(input.overtimeHours - 2, 0);
    overtimePay = first2 * input.payRate * m1 + beyond2 * input.payRate * m2;
    breakdown += ` | OT: ${first2}h x $${input.payRate} x ${m1} + ${beyond2}h x $${input.payRate} x ${m2} = $${overtimePay.toFixed(2)}`;
  }

  // Step 198: Night Shift Allowance
  const nightPay = input.isNightShift ? (input.nightAllowance ?? 5) : 0;
  if (nightPay) breakdown += ` | Night: $${nightPay}`;

  // Step 199: Hazard Pay
  const hazardPay = input.isHazard ? (input.hazardPay ?? 10) : 0;
  if (hazardPay) breakdown += ` | Hazard: $${hazardPay}`;

  // Step 202: Holiday Override - 2.0x for all hours if holiday
  let totalPay = regularPay + overtimePay + nightPay + hazardPay;
  if (input.isHoliday) {
    totalPay = (input.regularHours + input.overtimeHours) * input.payRate * 2.0 + nightPay + hazardPay;
    breakdown += ` | HOLIDAY 2.0x Override: $${totalPay.toFixed(2)}`;
  }

  return { regularPay, overtimePay, nightPay, hazardPay, totalPay, breakdown };
}

/**
 * Step 202: Holiday Rate Override Policy
 * Public holidays get 2.0x for all hours
 */
export const PUBLIC_HOLIDAYS_2026 = ["2026-08-15", "2026-12-25", "2026-01-01"]; // Example

export function isPublicHoliday(date: string): boolean {
  return PUBLIC_HOLIDAYS_2026.includes(date);
}
