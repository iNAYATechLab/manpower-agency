/**
 * Step 261: Zod Schema Input Validation
 * Simple Zod-like validation without external dep (simulated)
 * In prod: use actual zod library
 */

export interface ValidationResult {
  success: boolean;
  errors?: Record<string, string>;
  data?: Record<string, unknown>;
}

export function validateWorkerOnboarding(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  if (!data.fullName || String(data.fullName).length < 2) errors.fullName = "Full name required (min 2)";
  if (!data.passportNumber || String(data.passportNumber).length < 6) errors.passportNumber = "Passport number required";
  if (!data.phone || !String(data.phone).match(/^\+?[0-9]{10,15}$/)) errors.phone = "Valid phone required";
  return Object.keys(errors).length === 0 ? { success: true, data } : { success: false, errors };
}

export function validateClientOnboarding(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  if (!data.companyName) errors.companyName = "Company name required";
  if (!data.email || !String(data.email).includes("@")) errors.email = "Valid email required";
  return Object.keys(errors).length === 0 ? { success: true, data } : { success: false, errors };
}

export function validateTimesheetEntry(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  const hours = Number(data.regularHours);
  if (isNaN(hours) || hours < 0 || hours > 24) errors.regularHours = "0-24 required";
  return Object.keys(errors).length === 0 ? { success: true, data } : { success: false, errors };
}
