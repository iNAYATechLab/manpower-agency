/**
 * Phase 8: Client & Contact Management Types (171-190)
 */

export interface ClientOnboardingData {
  companyName: string;
  registeredName?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  logoUrl?: string;
  contactPerson: { fullName: string; email?: string; phone?: string; position?: string };
  jobSites: Array<{ name: string; city?: string; country?: string; latitude?: string; longitude?: string }>;
  contract: { fileUrl?: string; startDate?: string; endDate?: string };
  billingRate?: string;
  payRate?: string;
  profitMargin?: string;
}

export const MOCK_CLIENTS = [
  { id: "cli_001", companyName: "NEOM Construction Co.", companyCode: "NEOM-001", country: "SA", email: "hr@neom.com", activeWorkers: 87, demands: 1, contractExpiry: "2027-08-31", rating: 4.8 },
  { id: "cli_002", companyName: "Qatar Energy Ltd.", companyCode: "QAT-002", country: "QA", email: "jobs@qatarenergy.qa", activeWorkers: 42, demands: 2, contractExpiry: "2026-12-15", rating: 4.5 },
  { id: "cli_003", companyName: "Dubai Builders", companyCode: "DXB-003", country: "AE", email: "hr@dubaibuilders.ae", activeWorkers: 15, demands: 1, contractExpiry: "2026-10-20", rating: 4.2 },
];

export const MOCK_DEMANDS = [
  { id: "dem_001", title: "50 Welders for NEOM", quantity: 50, filled: 12, billingRate: 25, payRate: 18, profit: 7 },
];

export function calcProfitMargin(billing: string, pay: string): string {
  const b = parseFloat(billing) || 0;
  const p = parseFloat(pay) || 0;
  return (b - p).toFixed(2);
}
