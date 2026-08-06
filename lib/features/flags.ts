/**
 * Step 38: Feature Flags Control Panel
 * Allows CEO to toggle features system-wide
 */

import { CEO_PROFILE } from "@/lib/ceo";
import { logCEOActivity } from "@/lib/audit/logger";

export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "core" | "experimental" | "premium";
  updatedBy?: string;
  updatedAt?: Date;
  rolloutPercent?: number; // 0-100 for gradual rollout
}

const featureFlags: Record<string, FeatureFlag> = {
  geofencing: {
    key: "geofencing",
    name: "GPS Geofencing",
    description: "Track worker presence via GPS + Geofencing",
    enabled: true,
    category: "core",
  },
  sos: {
    key: "sos",
    name: "SOS Emergency Button",
    description: "Emergency alert for remote workers",
    enabled: true,
    category: "core",
  },
  payroll_auto: {
    key: "payroll_auto",
    name: "Auto Payroll Engine",
    description: "Generate payroll from approved timesheets",
    enabled: true,
    category: "core",
  },
  multi_currency: {
    key: "multi_currency",
    name: "Multi-Currency Billing",
    description: "USD, SAR, BDT, EUR real-time conversion",
    enabled: true,
    category: "core",
  },
  audit_logs: {
    key: "audit_logs",
    name: "Audit Trail",
    description: "System-wide audit logging",
    enabled: true,
    category: "core",
  },
  ai_matching: {
    key: "ai_matching",
    name: "AI Worker Matching",
    description: "Smart worker-to-project matching (experimental)",
    enabled: false,
    category: "experimental",
  },
  advanced_analytics: {
    key: "advanced_analytics",
    name: "Advanced Analytics",
    description: "Profitability & utilization charts",
    enabled: true,
    category: "premium",
  },
};

/**
 * Step 38: Get all feature flags
 */
export function getFeatureFlags(): FeatureFlag[] {
  return Object.values(featureFlags);
}

/**
 * Get single flag
 */
export function getFeatureFlag(key: string): FeatureFlag | null {
  return featureFlags[key] || null;
}

/**
 * Check if feature is enabled
 */
export function isFeatureEnabled(key: string): boolean {
  return featureFlags[key]?.enabled ?? false;
}

/**
 * Toggle feature flag (CEO only)
 */
export function toggleFeatureFlag(
  key: string,
  enabled: boolean,
  updatedByUsername: string
): FeatureFlag {
  if (updatedByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can toggle feature flags");
  }
  const flag = featureFlags[key];
  if (!flag) throw new Error(`Feature flag not found: ${key}`);

  flag.enabled = enabled;
  flag.updatedBy = updatedByUsername;
  flag.updatedAt = new Date();

  logCEOActivity("CEO_TOGGLE_FEATURE_FLAG", "feature_flags", {
    key,
    enabled,
  });

  return { ...flag };
}

/**
 * Update rollout percent (for gradual rollout)
 */
export function updateFeatureRollout(
  key: string,
  percent: number,
  updatedByUsername: string
): FeatureFlag {
  if (updatedByUsername !== CEO_PROFILE.username) throw new Error("ACCESS_DENIED");
  if (percent < 0 || percent > 100) throw new Error("Rollout percent must be 0-100");
  const flag = featureFlags[key];
  if (!flag) throw new Error(`Feature not found: ${key}`);
  flag.rolloutPercent = percent;
  flag.updatedBy = updatedByUsername;
  flag.updatedAt = new Date();
  return { ...flag };
}
