/**
 * Step 231: Passport File Uploader & Validator
 */

export interface PassportUpload {
  workerId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  passportNumber: string;
  expiryDate: string;
}

export function validatePassportFile(file: { name: string; size: number; type: string }): { valid: boolean; reason?: string } {
  const allowed = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowed.includes(file.type)) return { valid: false, reason: "Only PDF/JPG/PNG allowed" };
  if (file.size > 10 * 1024 * 1024) return { valid: false, reason: "Max 10MB" };
  if (!file.name.toLowerCase().includes("passport")) return { valid: false, reason: "Filename should contain 'passport'" };
  return { valid: true };
}

export function processPassportUpload(input: PassportUpload): { success: boolean; url: string } {
  const validation = validatePassportFile({ name: input.fileName, size: input.fileSize, type: input.mimeType as string });
  if (!validation.valid) throw new Error(validation.reason);
  const url = `https://storage.inayatechlab.com/private-documents/workers/${input.workerId}/passport/${input.passportNumber}.pdf`;
  return { success: true, url };
}
