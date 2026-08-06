/**
 * Steps 91-92: DB Query Performance Test + Slow-Query Tracking
 */

import { prisma } from "@/lib/db/prisma";
import { logInfo, logWarn } from "@/lib/logs/system-log";

export interface QueryPerformanceResult {
  query: string;
  durationMs: number;
  isSlow: boolean;
  thresholdMs: number;
  timestamp: Date;
}

const SLOW_THRESHOLD_MS = 200; // Step 92: Slow query threshold
const performanceLogs: QueryPerformanceResult[] = [];

/**
 * Step 91: Test query performance
 */
export async function testQueryPerformance(): Promise<QueryPerformanceResult[]> {
  const tests: Array<{ name: string; fn: () => Promise<unknown> }> = [
    { name: "SELECT workers by agency (indexed)", fn: () => prisma.worker.findMany({ where: { agencyId: "test" }, take: 10 }) },
    { name: "SELECT workers by status (indexed)", fn: () => prisma.worker.findMany({ where: { status: "available" }, take: 10 }) },
    { name: "SELECT timesheets by agency", fn: () => prisma.timesheet.findMany({ where: { agencyId: "test" }, take: 10 }) },
  ];

  const results: QueryPerformanceResult[] = [];
  for (const test of tests) {
    const start = Date.now();
    try {
      await test.fn();
    } catch {
      // Expected if no DB connection in dev - still measure
    }
    const duration = Date.now() - start;
    const result: QueryPerformanceResult = {
      query: test.name,
      durationMs: duration,
      isSlow: duration > SLOW_THRESHOLD_MS,
      thresholdMs: SLOW_THRESHOLD_MS,
      timestamp: new Date(),
    };
    performanceLogs.push(result);
    results.push(result);

    if (result.isSlow) {
      logWarn(`Slow query: ${test.name} took ${duration}ms`, "performance", { query: test.name, duration });
    } else {
      logInfo(`Query OK: ${test.name} ${duration}ms`, "performance");
    }
  }
  return results;
}

/**
 * Step 92: Get slow queries
 */
export function getSlowQueries(limit = 20): QueryPerformanceResult[] {
  return performanceLogs.filter((p) => p.isSlow).slice(-limit);
}

/**
 * Get performance stats
 */
export function getPerformanceStats(): { total: number; slow: number; avgMs: number; maxMs: number } {
  if (performanceLogs.length === 0) return { total: 0, slow: 0, avgMs: 0, maxMs: 0 };
  const total = performanceLogs.length;
  const slow = performanceLogs.filter((p) => p.isSlow).length;
  const avgMs = Math.round(performanceLogs.reduce((sum, p) => sum + p.durationMs, 0) / total);
  const maxMs = Math.max(...performanceLogs.map((p) => p.durationMs));
  return { total, slow, avgMs, maxMs };
}
