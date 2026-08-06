/**
 * Step 281: Database Query Execution Plan Optimize
 */

export interface QueryPlan {
  query: string;
  cost: number;
  indexUsed?: string;
  optimized: boolean;
  suggestion?: string;
}

export function analyzeQueryPlan(query: string): QueryPlan {
  // Simulate EXPLAIN ANALYZE
  const hasIndex = query.includes("WHERE agency_id") || query.includes("WHERE status");
  const cost = hasIndex ? Math.floor(Math.random() * 50) + 10 : Math.floor(Math.random() * 500) + 100;
  const optimized = cost < 100;

  return {
    query,
    cost,
    indexUsed: hasIndex ? "idx_agency_id" : undefined,
    optimized,
    suggestion: optimized ? "OK" : "Add index on agency_id or status",
  };
}

export function getOptimizationSuggestions(): string[] {
  return [
    "Add composite index on (agency_id, status) for workers",
    "Use pagination (limit 20) for all list queries",
    "Avoid SELECT * - select only needed columns",
    "Use Prisma select to reduce payload",
  ];
}
