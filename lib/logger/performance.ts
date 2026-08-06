/**
 * Step 267: Performance Metrics Logger
 */

export interface PerformanceMetric {
  id: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: Date;
}

const metrics: PerformanceMetric[] = [];

export function logPerformance(metric: string, value: number, unit = "ms"): PerformanceMetric {
  const m: PerformanceMetric = { id: `perf_${Date.now()}`, metric, value, unit, timestamp: new Date() };
  metrics.push(m);
  if (metrics.length > 100) metrics.shift();
  return m;
}

export function getPerformanceMetrics(): PerformanceMetric[] {
  return [...metrics].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function getAveragePerformance(metric: string): number {
  const filtered = metrics.filter((m) => m.metric === metric);
  if (filtered.length === 0) return 0;
  return filtered.reduce((sum, m) => sum + m.value, 0) / filtered.length;
}
