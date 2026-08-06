/**
 * Step 227: Branded Professional PDF Invoice Design
 */
"use client";

export function InvoicePDFPreview({ invoice }: { invoice: { invoiceNumber: string; clientName: string; total: number; currency: string; subtotal: number; vatAmount: number; serviceCharge: number } }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white p-6 text-[#1D0B2E]">
      <div className="flex justify-between border-b border-[#1D0B2E] pb-4">
        <div>
          <h2 className="text-xl font-bold text-[#1D0B2E]">iNAYATechLab Inc.</h2>
          <p className="text-xs text-[#B388FF]">Manpower Supply SaaS — Invoice</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm font-bold">{invoice.invoiceNumber}</p>
          <p className="text-xs">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm">
          <strong>Bill To:</strong> {invoice.clientName}
        </p>
        <table className="mt-4 w-full text-sm">
          <thead className="bg-[#2A1143] text-white">
            <tr>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Subtotal (Billing Hours)</td>
              <td className="p-2 text-right">${invoice.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-2">VAT</td>
              <td className="p-2 text-right">${invoice.vatAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="p-2">Service Charge</td>
              <td className="p-2 text-right">${invoice.serviceCharge.toFixed(2)}</td>
            </tr>
            <tr className="bg-[#E5B84B]/20 font-bold">
              <td className="p-2">Total ({invoice.currency})</td>
              <td className="p-2 text-right">${invoice.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-[#B388FF]">Thank you for your business! | iNAYATechLab Manpower SaaS v1.9.0</p>
    </div>
  );
}
