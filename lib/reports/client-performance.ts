/**
 * Step 270: Client Performance Report Generator
 */

export interface ClientPerformanceReport {
  clientId: string;
  clientName: string;
  totalWorkers: number;
  avgRating: number;
  totalInvoices: number;
  totalPaid: number;
  onTimeRate: number; // 0-100
  generatedAt: Date;
}

const mockReports: ClientPerformanceReport[] = [
  { clientId: "cli_001", clientName: "NEOM Construction Co.", totalWorkers: 87, avgRating: 4.8, totalInvoices: 12, totalPaid: 85000, onTimeRate: 92, generatedAt: new Date() },
  { clientId: "cli_002", clientName: "Qatar Energy Ltd.", totalWorkers: 42, avgRating: 4.5, totalInvoices: 8, totalPaid: 62000, onTimeRate: 85, generatedAt: new Date() },
];

export function generateClientReport(clientId: string): ClientPerformanceReport | null {
  return mockReports.find((r) => r.clientId === clientId) || null;
}

export function getAllClientReports(): ClientPerformanceReport[] {
  return [...mockReports];
}
