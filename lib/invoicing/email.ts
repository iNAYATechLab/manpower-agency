/**
 * Step 228: Invoice Auto-Email Service
 */

export interface InvoiceEmailPayload {
  to: string;
  invoiceNumber: string;
  pdfUrl: string;
  total: number;
  currency: string;
}

const sentInvoiceEmails: InvoiceEmailPayload[] = [];

export function sendInvoiceEmail(payload: InvoiceEmailPayload): InvoiceEmailPayload {
  sentInvoiceEmails.push(payload);
  console.log(`[INVOICE_EMAIL] Sent ${payload.invoiceNumber} to ${payload.to}: $${payload.total} ${payload.currency} - ${payload.pdfUrl}`);
  return payload;
}

export function getSentInvoiceEmails(): InvoiceEmailPayload[] {
  return [...sentInvoiceEmails];
}
