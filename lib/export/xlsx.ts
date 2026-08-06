/**
 * Step 258: All-Data Excel (XLSX) Exporter Engine
 * Uses simple CSV-like XLSX generation (in prod use exceljs)
 */

export function generateXLSXData(rows: Record<string, unknown>[], sheetName = "Sheet1"): { filename: string; data: string } {
  // Simulate XLSX as CSV with XLSX header (real: use exceljs)
  const headers = Object.keys(rows[0] || {});
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => String(r[h] ?? "")).join(","))].join("\n");
  // In prod: const workbook = new ExcelJS.Workbook(); workbook.addWorksheet(sheetName).addRows(rows); await workbook.xlsx.writeBuffer()
  return { filename: `${sheetName}_${new Date().toISOString().split("T")[0]}.xlsx`, data: csv };
}

export function downloadXLSX(rows: Record<string, unknown>[], sheetName?: string): void {
  const { filename, data } = generateXLSXData(rows, sheetName);
  const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
