/**
 * Steps 221-230: Client Invoicing
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateInvoice } from "@/lib/invoicing/engine";
import { convertCurrency } from "@/lib/invoicing/currency";
import { InvoicePDFPreview } from "@/components/invoicing/invoice-pdf";
import { sendInvoiceEmail } from "@/lib/invoicing/email";
import { trackInvoiceStatus } from "@/lib/invoicing/status";
import { generatePaymentLink } from "@/lib/invoicing/payment-gateway";

export default function InvoicesPage() {
  const [invoice, setInvoice] = useState<ReturnType<typeof generateInvoice> | null>(null);
  const [hours, setHours] = useState("480");
  const [rate, setRate] = useState("25");
  const [vat, setVat] = useState("15");
  const [service, setService] = useState("5");

  const generate = () => {
    const inv = generateInvoice({
      clientId: "cli_001",
      clientName: "NEOM Construction Co.",
      billingHours: parseFloat(hours) || 0,
      clientRate: parseFloat(rate) || 0,
      vatPercent: parseFloat(vat) || 0,
      serviceChargePercent: parseFloat(service) || 0,
      currency: "SAR",
      targetCurrency: "USD",
    });
    setInvoice(inv);
    // 228 Auto-email
    sendInvoiceEmail({ to: "hr@neom.com", invoiceNumber: inv.invoiceNumber, pdfUrl: `https://cdn.inayatechlab.com/invoices/${inv.invoiceNumber}.pdf`, total: inv.total, currency: inv.currency });
    // 229 Track status
    trackInvoiceStatus(inv.invoiceNumber, inv.total, 0);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Invoices" }]} />
      <div>
        <h1 className="text-2xl font-bold">Client Invoicing (Steps 221-230)</h1>
        <p className="text-sm text-white/60">221 Invoice Engine • 222 Billing Hours×Rate • 223 VAT • 224 Service Charge • 225-226 Multi-Currency • 227 PDF • 228 Email • 229 Status • 230 Stripe/PayPal</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">221: Invoice Generator Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <label className="text-xs text-white/60">222 Billing Hours</label>
              <input value={hours} onChange={(e) => setHours(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-white/60">Client Rate ($/hr)</label>
              <input value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-white/60">223 VAT %</label>
              <input value={vat} onChange={(e) => setVat(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-white/60">224 Service Charge %</label>
              <input value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="rounded-lg bg-[#E5B84B]/10 p-3 text-sm">
            <p>225 Multi-Currency: SAR → USD: ${invoice ? convertCurrency(invoice.total, "SAR", "USD").toFixed(2) : "—"} (Rate 0.2667)</p>
            <p className="text-xs text-white/60">226 Real-time API: fetchRealTimeRate (mock) → 100ms</p>
          </div>
          <Button onClick={generate}>221 Generate Invoice</Button>
        </CardContent>
      </Card>

      {invoice && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Generated Invoice — {invoice.invoiceNumber}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>{invoice.breakdown}</p>
              <p>
                Total: <span className="font-bold text-[#E5B84B]">${invoice.total.toFixed(2)} {invoice.currency}</span>
                {invoice.convertedTotal && <span className="text-white/60"> → ${invoice.convertedTotal.toFixed(2)} {invoice.convertedCurrency} (225 Conversion)</span>}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => alert(`Email sent to hr@neom.com (228)`)}>228 Auto-Email Sent ✓</Button>
                <Button size="sm" variant="outline">229 Status: Unpaid</Button>
              </div>
              <div className="flex gap-2">
                <a href={generatePaymentLink({ gateway: "stripe", invoiceNumber: invoice.invoiceNumber, amount: invoice.total, currency: invoice.currency }).url} target="_blank">
                  <Button size="sm">230 Stripe Pay</Button>
                </a>
                <a href={generatePaymentLink({ gateway: "paypal", invoiceNumber: invoice.invoiceNumber, amount: invoice.total, currency: invoice.currency }).url} target="_blank">
                  <Button size="sm" variant="outline">230 PayPal Pay</Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <InvoicePDFPreview invoice={{ invoiceNumber: invoice.invoiceNumber, clientName: invoice.clientName, total: invoice.total, currency: invoice.currency, subtotal: invoice.subtotal, vatAmount: invoice.vatAmount, serviceCharge: invoice.serviceCharge }} />
          <p className="text-center text-xs text-white/40">227 Branded Professional PDF Invoice — iNAYATechLab Header, Table, Footer</p>
        </>
      )}
    </div>
  );
}
