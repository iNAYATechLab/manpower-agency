/**
 * Step 34: Global System Health Monitoring Dashboard Backend
 * Provides health checks for DB, API, Storage, etc.
 */

export type HealthStatus = "healthy" | "degraded" | "down";

export interface HealthCheck {
  service: string;
  status: HealthStatus;
  latencyMs: number;
  lastChecked: Date;
  details?: string;
}

export interface SystemHealthReport {
  overall: HealthStatus;
  checks: HealthCheck[];
  timestamp: Date;
  uptimeSeconds: number;
  version: string;
}

// Simulated health checks (real would ping DB, Redis, etc.)
const services = ["database", "api", "storage", "auth", "notifications", "backup"] as const;

function randomLatency(): number {
  return Math.floor(Math.random() * 80) + 20; // 20-100ms
}

function randomStatus(): HealthStatus {
  const r = Math.random();
  if (r > 0.97) return "down";
  if (r > 0.92) return "degraded";
  return "healthy";
}

/**
 * Step 34: Generate health report
 */
export function getSystemHealthReport(): SystemHealthReport {
  const checks: HealthCheck[] = services.map((service) => ({
    service,
    status: service === "database" ? "healthy" : randomStatus(), // DB always healthy for demo
    latencyMs: randomLatency(),
    lastChecked: new Date(),
    details: service === "database" ? "PostgreSQL connected" : undefined,
  }));

  const hasDown = checks.some((c) => c.status === "down");
  const hasDegraded = checks.some((c) => c.status === "degraded");
  const overall: HealthStatus = hasDown ? "down" : hasDegraded ? "degraded" : "healthy";

  return {
    overall,
    checks,
    timestamp: new Date(),
    uptimeSeconds: Math.floor(process.uptime()),
    version: "v1.0.0",
  };
}

/**
 * Check single service
 */
export function checkServiceHealth(service: string): HealthCheck {
  return {
    service,
    status: randomStatus(),
    latencyMs: randomLatency(),
    lastChecked: new Date(),
  };
}
