/**
 * Step 257: React Custom Chart Component Binder
 * Provides chart data generators for all analytics
 */

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

// Step 251: Project Profitability
export function getProfitabilityData(): ChartDataPoint[] {
  return [
    { label: "NEOM Site A", value: 42000, color: "#E5B84B" },
    { label: "NEOM Site B", value: 28000, color: "#B388FF" },
    { label: "Qatar Energy", value: 35000, color: "#1D0B2E" },
  ];
}

// Step 252: Revenue vs Payout
export function getRevenuePayoutData(): Array<{ month: string; revenue: number; payout: number }> {
  return [
    { month: "May", revenue: 45000, payout: 38000 },
    { month: "Jun", revenue: 52000, payout: 42000 },
    { month: "Jul", revenue: 48000, payout: 39000 },
    { month: "Aug", revenue: 55000, payout: 44000 },
  ];
}

// Step 253: Worker Utilization
export function getUtilizationData(): ChartDataPoint[] {
  return [
    { label: "Active (Deployed)", value: 87, color: "#B388FF" },
    { label: "Idle (Bench)", value: 37, color: "#E5B84B" },
  ];
}

// Step 254: Country-wise distribution
export function getCountryDistribution(): ChartDataPoint[] {
  return [
    { label: "Saudi Arabia", value: 87, color: "#E5B84B" },
    { label: "Qatar", value: 42, color: "#B388FF" },
    { label: "UAE", value: 15, color: "#FFFFFF" },
  ];
}

// Step 255: Skill category distribution
export function getSkillDistribution(): ChartDataPoint[] {
  return [
    { label: "Welder", value: 45, color: "#E5B84B" },
    { label: "Electrician", value: 30, color: "#B388FF" },
    { label: "Plumber", value: 20, color: "#1D0B2E" },
    { label: "Carpenter", value: 18, color: "#2A1143" },
  ];
}

// Step 256: Invoice overdue receivable
export function getOverdueData(): ChartDataPoint[] {
  return [
    { label: "Paid", value: 85000, color: "#10B981" },
    { label: "Overdue", value: 12400, color: "#EF4444" },
    { label: "Pending", value: 42000, color: "#E5B84B" },
  ];
}
