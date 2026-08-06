/**
 * Step 232: Akama / Work Permit File Processor
 */

export interface AkamaUpload {
  workerId: string;
  fileName: string;
  akamaNumber: string;
  expiryDate: string;
}

export function processAkamaFile(input: AkamaUpload): { success: boolean; url: string; daysUntilExpiry: number } {
  const expiry = new Date(input.expiryDate);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const url = `https://storage.inayatechlab.com/private-documents/workers/${input.workerId}/akama/${input.akamaNumber}.pdf`;
  return { success: true, url, daysUntilExpiry };
}
