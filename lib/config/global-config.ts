/**
 * Step 29: System Wide Global Configuration Panel Backend
 * Global config that only super_admin (CEO) can modify
 */

import { CEO_PROFILE } from "@/lib/ceo";
import { logCEOActivity } from "@/lib/audit/logger";

export interface GlobalConfig {
  // Branding
  companyName: string;
  companyStartDate: string; // 2026-08-01
  supportEmail: string;
  // System
  maintenanceMode: boolean;
  allowNewAgencyRegistration: boolean;
  defaultCurrency: string;
  supportedCurrencies: string[];
  // Security
  require2FAForAdmins: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  // Features (Step 38)
  featureFlags: Record<string, boolean>;
  // Limits
  maxAgencies: number;
  maxWorkersPerAgency: number;
}

// Default global config - Step 29
const defaultConfig: GlobalConfig = {
  companyName: "iNAYATechLab Inc.",
  companyStartDate: "2026-08-01",
  supportEmail: "iNAYATechLab@gmail.com",
  maintenanceMode: false,
  allowNewAgencyRegistration: true,
  defaultCurrency: "USD",
  supportedCurrencies: ["USD", "SAR", "BDT", "EUR"],
  require2FAForAdmins: true,
  sessionTimeoutMinutes: 30,
  maxLoginAttempts: 5,
  featureFlags: {
    geofencing: true,
    sos: true,
    payroll_auto: true,
    multi_currency: true,
    audit_logs: true,
  },
  maxAgencies: 1000,
  maxWorkersPerAgency: 10000,
};

let currentConfig: GlobalConfig = { ...defaultConfig };
const configHistory: Array<{ config: GlobalConfig; updatedBy: string; timestamp: Date }> = [];

/**
 * Step 29: Get global config (anyone can read)
 */
export function getGlobalConfig(): GlobalConfig {
  return { ...currentConfig };
}

/**
 * Step 29: Update global config (only CEO)
 */
export function updateGlobalConfig(
  updates: Partial<GlobalConfig>,
  updatedByUsername: string
): GlobalConfig {
  if (updatedByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO (Super Admin) can update global config");
  }

  const previous = { ...currentConfig };
  currentConfig = { ...currentConfig, ...updates };
  configHistory.push({
    config: previous,
    updatedBy: updatedByUsername,
    timestamp: new Date(),
  });

  logCEOActivity("CEO_UPDATE_CONFIG", "global_config", {
    updates,
    previous,
  });

  return getGlobalConfig();
}

/**
 * Reset to defaults (CEO only)
 */
export function resetGlobalConfig(updatedByUsername: string): GlobalConfig {
  return updateGlobalConfig(defaultConfig, updatedByUsername);
}

/**
 * Get config history
 */
export function getConfigHistory(limit = 20) {
  return configHistory.slice(-limit).reverse();
}
