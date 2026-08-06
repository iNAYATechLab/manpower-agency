/**
 * Steps 222-224: Billing Hours * Rate, VAT/Tax, Service Charge & Commission
 */

export interface InvoiceCalcInput {
  billingHours: number;
  clientRate: number; // $/hr Step 222
  vatPercent?: number; // Step 223 e.g., 15% for SA VAT
  serviceChargePercent?: number; // Step 224 e.g., 5%
  discount?: number;
}

export interface InvoiceCalcResult {
  subtotal: number; // billingHours * clientRate
  vatAmount: number;
  serviceCharge: number;
  discount: number;
  total: number;
  breakdown: string;
}

export function calculateInvoice(input: InvoiceCalcInput): InvoiceCalcResult {
  const subtotal = input.billingHours * input.clientRate; // 222
  const vatAmount = input.vatPercent ? subtotal * (input.vatPercent / 100) : 0; // 223
  const serviceCharge = input.serviceChargePercent ? subtotal * (input.serviceChargePercent / 100) : 0; // 224
  const discount = input.discount ?? 0;
  const total = subtotal + vatAmount + serviceCharge - discount;

  const breakdown = `Subtotal: ${input.billingHours}h x $${input.clientRate} = $${subtotal.toFixed(2)} | VAT ${input.vatPercent || 0}%: $${vatAmount.toFixed(2)} | Service ${input.serviceChargePercent || 0}%: $${serviceCharge.toFixed(2)} | Discount: -$${discount.toFixed(2)} | Total: $${total.toFixed(2)}`;

  return { subtotal, vatAmount, serviceCharge, discount, total, breakdown };
}
