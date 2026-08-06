/**
 * Step 229: Invoice Payment Status Tracker (Unpaid, Paid, Partial)
 */

export type InvoicePaymentStatus = "unpaid" | "paid" | "partial" | "overdue" | "cancelled";

export interface InvoiceStatusRecord {
  invoiceNumber: string;
  status: InvoicePaymentStatus;
  total: number;
  paidAmount: number;
  remaining: number;
  updatedAt: Date;
}

const statusStore = new Map<string, InvoiceStatusRecord>();

export function trackInvoiceStatus(invoiceNumber: string, total: number, paidAmount: number): InvoiceStatusRecord {
  let status: InvoicePaymentStatus = "unpaid";
  if (paidAmount >= total) status = "paid";
  else if (paidAmount > 0) status = "partial";
  else if (new Date() > new Date(Date.now() + 30 * 24 * 3600 * 1000)) status = "overdue"; // simplified

  const record: InvoiceStatusRecord = {
    invoiceNumber,
    status,
    total,
    paidAmount,
    remaining: total - paidAmount,
    updatedAt: new Date(),
  };
  statusStore.set(invoiceNumber, record);
  return record;
}

export function getInvoiceStatus(invoiceNumber: string): InvoiceStatusRecord | null {
  return statusStore.get(invoiceNumber) || null;
}

export function getAllInvoiceStatuses(): InvoiceStatusRecord[] {
  return Array.from(statusStore.values());
}
