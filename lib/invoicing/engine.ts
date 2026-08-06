/**
 * Step 221: Client Invoice Generator Engine
 * Generates invoice from billing hours
 */

import { calculateInvoice } from "@/lib/invoicing/calculations";
import { convertCurrency, type Currency } from "@/lib/invoicing/currency";

export interface InvoiceInput {
  clientId: string;
  clientName: string;
  billingHours: number;
  clientRate: number;
  vatPercent?: number;
  serviceChargePercent?: number;
  discount?: number;
  currency?: Currency;
  targetCurrency?: Currency; // For conversion
}

export interface GeneratedInvoice {
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  subtotal: number;
  vatAmount: number;
  serviceCharge: number;
  total: number;
  currency: Currency;
  convertedTotal?: number;
  convertedCurrency?: Currency;
  breakdown: string;
}

export function generateInvoice(input: InvoiceInput): GeneratedInvoice {
  const calc = calculateInvoice({
    billingHours: input.billingHours,
    clientRate: input.clientRate,
    vatPercent: input.vatPercent,
    serviceChargePercent: input.serviceChargePercent,
    discount: input.discount,
  });

  const currency = input.currency ?? "USD";
  let convertedTotal: number | undefined;
  let convertedCurrency: Currency | undefined;

  if (input.targetCurrency && input.targetCurrency !== currency) {
    convertedTotal = convertCurrency(calc.total, currency, input.targetCurrency);
    convertedCurrency = input.targetCurrency;
  }

  return {
    invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
    clientId: input.clientId,
    clientName: input.clientName,
    subtotal: calc.subtotal,
    vatAmount: calc.vatAmount,
    serviceCharge: calc.serviceCharge,
    total: calc.total,
    currency,
    convertedTotal,
    convertedCurrency,
    breakdown: calc.breakdown,
  };
}
