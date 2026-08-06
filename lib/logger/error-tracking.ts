/**
 * Step 266: System Error Tracking & Logger
 */

export interface TrackedError {
  id: string;
  message: string;
  stack?: string;
  context?: string;
  timestamp: Date;
  count: number;
}

const errors: Map<string, TrackedError> = new Map();

export function trackError(message: string, context?: string, stack?: string): TrackedError {
  const key = `${context || "global"}:${message}`;
  const existing = errors.get(key);
  if (existing) {
    existing.count += 1;
    existing.timestamp = new Date();
    return existing;
  }
  const err: TrackedError = { id: `err_${Date.now()}`, message, stack, context, timestamp: new Date(), count: 1 };
  errors.set(key, err);
  console.error(`[ERROR_TRACK] ${context || "system"}: ${message}`);
  return err;
}

export function getTrackedErrors(): TrackedError[] {
  return Array.from(errors.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
