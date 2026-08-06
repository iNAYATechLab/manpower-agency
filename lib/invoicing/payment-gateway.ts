/**
 * Step 230: Stripe/PayPal Payment Gateway Backend Link
 */

export type Gateway = "stripe" | "paypal";

export interface PaymentLink {
  gateway: Gateway;
  url: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
}

const STRIPE_BASE = process.env.STRIPE_BASE_URL || "https://checkout.stripe.com/pay";
const PAYPAL_BASE = process.env.PAYPAL_BASE_URL || "https://www.paypal.com/checkoutnow";

/**
 * Step 230: Generate payment link
 */
export function generatePaymentLink(input: { gateway: Gateway; invoiceNumber: string; amount: number; currency: string }): PaymentLink {
  const base = input.gateway === "stripe" ? STRIPE_BASE : PAYPAL_BASE;
  const url = `${base}?invoice=${input.invoiceNumber}&amount=${input.amount}&currency=${input.currency}&gateway=${input.gateway}`;
  return { gateway: input.gateway, url, invoiceNumber: input.invoiceNumber, amount: input.amount, currency: input.currency };
}

export function getSupportedGateways(): Gateway[] {
  return ["stripe", "paypal"];
}
