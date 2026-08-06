/**
 * Row Level Security (RLS) Helper for Multi-Tenancy
 * Ensures agency isolation at DB level
 */

import { prisma } from "@/lib/db/prisma";

/**
 * RLS Policies to be applied in PostgreSQL (for reference, to be run as migration)
 *
 * -- Enable RLS on all tenant tables
 * ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
 * -- ... for all agencyId tables
 *
 * -- Policy: agency can only see own data
 * CREATE POLICY agency_isolation ON workers
 *   FOR ALL
 *   USING (agency_id = current_setting('app.current_agency_id')::text);
 *
 * -- Super admin bypass: if current_setting is empty, allow all (CEO)
 * CREATE POLICY super_admin_bypass ON workers
 *   FOR ALL
 *   USING (current_setting('app.current_agency_id', true) = '');
 */

export const RLS_ENABLED_TABLES = [
  "users",
  "workers",
  "worker_contacts",
  "worker_documents",
  "clients",
  "client_contacts",
  "job_sites",
  "contracts",
  "job_demands",
  "worker_deployments",
  "timesheets",
  "payrolls",
  "invoices",
  "audit_logs",
] as const;

/**
 * Check if current agency context is valid
 */
export async function validateAgencyAccess(agencyId: string, userAgencyId: string | null, isSuperAdmin: boolean): Promise<boolean> {
  if (isSuperAdmin) return true; // CEO sees all
  if (!userAgencyId) return false; // Non-super admin must have agency
  return agencyId === userAgencyId;
}

/**
 * Get agency-scoped prisma filter
 */
export function agencyFilter<T extends { agencyId?: string | null }>(agencyId: string | null, isSuperAdmin: boolean): T | {} {
  if (isSuperAdmin || !agencyId) return {}; // No filter for super admin
  return { agencyId } as T;
}
