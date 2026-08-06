/**
 * Step 274: Invoice & VAT Calculation Math Test
 */
import { describe, it, expect } from "vitest";
import { calculateInvoice } from "@/lib/invoicing/calculations";
import { convertCurrency } from "@/lib/invoicing/currency";

describe("Invoice & VAT Math", () => {
  it("should calculate subtotal", () => {
    const result = calculateInvoice({ billingHours: 480, clientRate: 25 });
    expect(result.subtotal).toBe(12000);
  });

  it("should calculate VAT 15%", () => {
    const result = calculateInvoice({ billingHours: 480, clientRate: 25, vatPercent: 15 });
    expect(result.vatAmount).toBe(1800);
    expect(result.total).toBe(13800);
  });

  it("should calculate service charge", () => {
    const result = calculateInvoice({ billingHours: 100, clientRate: 20, serviceChargePercent: 5 });
    expect(result.serviceCharge).toBe(100);
  });

  it("should convert currency", () => {
    const converted = convertCurrency(100, "USD", "SAR");
    expect(converted).toBeCloseTo(375, 0);
  });
});
