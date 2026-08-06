/**
 * Step 259: All-Data CSV Exporter
 */

export function generateCSV(rows: Record<string, unknown>[]): { filename: string; csv: string } {
  if (rows.length === 0) return { filename: "export.csv", csv: "" };
  const headers = Object.keys(rows[0]!);
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
  return { filename: `export_${new Date().toISOString().split("T")[0]}.csv`, csv };
}

export function downloadCSV(rows: Record<string, unknown>[]): void {
  const { filename, csv } = generateCSV(rows);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
