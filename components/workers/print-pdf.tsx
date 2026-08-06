/**
 * Step 166: Worker Info Print & PDF Download Option
 */
"use client";
import { Button } from "@/components/ui/button";

export function PrintPDFButtons({ workerId }: { workerId?: string }) {
  const onPrint = () => window.print();
  const onPDF = () => {
    // In real, generate PDF via jsPDF or backend `pdfUrl`
    const url = `/api/workers/${workerId || "WRK-2026-001"}/pdf`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={onPrint}>
        🖨️ Print
      </Button>
      <Button size="sm" onClick={onPDF}>
        📄 Download PDF
      </Button>
    </div>
  );
}
