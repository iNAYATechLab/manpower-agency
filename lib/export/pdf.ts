/**
 * Step 260: PDF Report Printer Engine Setup
 */

export function generatePDFReport(title: string, rows: Record<string, unknown>[]): { html: string; filename: string } {
  const headers = Object.keys(rows[0] || {});
  const html = `
  <div style="font-family: sans-serif; padding: 24px; max-width: 800px; margin: 0 auto;">
    <div style="background: #1D0B2E; color: white; padding: 16px; text-align: center;">
      <h1 style="color: #E5B84B; margin:0;">iNAYATechLab Inc.</h1>
      <p style="color: #B388FF; margin:0;">${title} - ${new Date().toLocaleDateString()}</p>
    </div>
    <table style="width:100%; border-collapse: collapse; margin-top: 16px; font-size: 12px;">
      <thead style="background: #2A1143; color: white;"><tr>${headers.map((h) => `<th style="padding:8px; text-align:left;">${h}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${headers.map((h) => `<td style="padding:8px; border-bottom: 1px solid #eee;">${String(r[h] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
    <p style="text-align:center; font-size: 10px; color: #999; margin-top: 16px;">Generated: ${new Date().toISOString()} | iNAYATechLab Manpower SaaS</p>
  </div>
  `;
  const filename = `${title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
  return { html, filename };
}

export function printPDFReport(title: string, rows: Record<string, unknown>[]): void {
  const { html, filename } = generatePDFReport(title, rows);
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.title = filename;
    w.print();
  }
}
