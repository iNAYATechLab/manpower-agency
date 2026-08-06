/**
 * Step 238: Insurance Policy Document Catalog
 */

export interface InsurancePolicy {
  id: string;
  workerId: string;
  policyNumber: string;
  provider: string;
  startDate: string;
  expiryDate: string;
  fileUrl: string;
  coverageAmount: number;
}

const policies: InsurancePolicy[] = [];

export function addInsurancePolicy(policy: Omit<InsurancePolicy, "id">): InsurancePolicy {
  const p: InsurancePolicy = { id: `ins_${Date.now()}`, ...policy };
  policies.push(p);
  return p;
}

export function getInsurancePolicies(workerId?: string): InsurancePolicy[] {
  if (workerId) return policies.filter((p) => p.workerId === workerId);
  return [...policies];
}
