/**
 * Step 41: Prisma Client Singleton for Multi-Tenant PostgreSQL
 * Handles connection pooling + RLS context
 */

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;

/**
 * Set RLS context for multi-tenancy
 * Usage: await prisma.$executeRaw`SET app.current_agency_id = ${agencyId}`;
 */
export async function setAgencyContext(agencyId: string | null) {
  if (!agencyId) {
    // Super admin (CEO) - unrestricted, no agency filter
    await prisma.$executeRaw`RESET app.current_agency_id`;
    return;
  }
  await prisma.$executeRaw`SET app.current_agency_id = ${agencyId}`;
}

/**
 * With agency context helper
 */
export async function withAgencyContext<T>(agencyId: string | null, fn: () => Promise<T>): Promise<T> {
  await setAgencyContext(agencyId);
  try {
    return await fn();
  } finally {
    await prisma.$executeRaw`RESET app.current_agency_id`;
  }
}
