/**
 * Step 262: Frontend Form Error Processor
 */

export interface FormErrors {
  [field: string]: string;
}

export function processFormErrors(errors: Record<string, string>): FormErrors {
  return Object.fromEntries(Object.entries(errors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])) as FormErrors;
}

export function getFieldError(errors: FormErrors, field: string): string | undefined {
  return errors[field];
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function formatErrorsForDisplay(errors: FormErrors): string {
  return Object.entries(errors)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
}
