/**
 * Step 39: License & Subscription Management Backbone
 * Manages agency licenses, plans, billing cycles
 */

import { CEO_PROFILE } from "@/lib/ceo";
import { logCEOActivity } from "@/lib/audit/logger";

export type LicensePlan = "starter" | "growth" | "enterprise" | "custom";
export type LicenseStatus = "active" | "trial" | "expired" | "suspended" | "cancelled";

export interface License {
  id: string;
  agencyId: string;
  agencyName: string;
  plan: LicensePlan;
  status: LicenseStatus;
  maxWorkers: number;
  maxClients: number;
  maxProjects: number;
  features: string[]; // Feature keys allowed
  startDate: Date;
  endDate: Date;
  trialEndsAt?: Date;
  autoRenew: boolean;
  createdBy: string; // CEO
  createdAt: Date;
  updatedAt: Date;
}

const licenses: License[] = [];

const PLAN_LIMITS: Record<LicensePlan, { workers: number; clients: number; projects: number; features: string[] }> = {
  starter: { workers: 100, clients: 10, projects: 10, features: ["geofencing", "payroll_auto"] },
  growth: { workers: 500, clients: 50, projects: 50, features: ["geofencing", "payroll_auto", "multi_currency", "advanced_analytics"] },
  enterprise: { workers: 10000, clients: 500, projects: 500, features: ["*"] },
  custom: { workers: 999999, clients: 999999, projects: 999999, features: ["*"] },
};

/**
 * Step 39: Create license (CEO only)
 */
export function createLicense(input: {
  agencyId: string;
  agencyName: string;
  plan: LicensePlan;
  durationMonths?: number;
  createdByUsername: string;
}): License {
  if (input.createdByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can create licenses");
  }

  const limits = PLAN_LIMITS[input.plan];
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + (input.durationMonths ?? 12));

  const license: License = {
    id: `lic_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    agencyId: input.agencyId,
    agencyName: input.agencyName,
    plan: input.plan,
    status: "active",
    maxWorkers: limits.workers,
    maxClients: limits.clients,
    maxProjects: limits.projects,
    features: limits.features,
    startDate,
    endDate,
    autoRenew: true,
    createdBy: input.createdByUsername,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  licenses.push(license);

  logCEOActivity("CEO_MANAGE_LICENSE", "license", {
    licenseId: license.id,
    agencyId: input.agencyId,
    plan: input.plan,
  });

  return license;
}

/**
 * Get license for agency
 */
export function getLicenseForAgency(agencyId: string): License | null {
  return licenses.find((l) => l.agencyId === agencyId) || null;
}

/**
 * Get all licenses (CEO view)
 */
export function getAllLicenses(): License[] {
  return [...licenses];
}

/**
 * Check if agency can add workers (within license limits)
 */
export function canAgencyAddWorkers(agencyId: string, currentWorkerCount: number): boolean {
  const license = getLicenseForAgency(agencyId);
  if (!license) return false;
  if (license.status !== "active") return false;
  return currentWorkerCount < license.maxWorkers;
}

/**
 * Update license status
 */
export function updateLicenseStatus(
  licenseId: string,
  status: LicenseStatus,
  updatedByUsername: string
): License {
  if (updatedByUsername !== CEO_PROFILE.username) throw new Error("ACCESS_DENIED");
  const lic = licenses.find((l) => l.id === licenseId);
  if (!lic) throw new Error("License not found");
  lic.status = status;
  lic.updatedAt = new Date();
  return { ...lic };
}
