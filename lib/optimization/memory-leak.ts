/**
 * Step 280: Unwanted Memory Leak Detect & Code Refactor
 * Provides helpers to detect leaks via heap tracking
 */

export interface MemoryLeakReport {
  heapUsedMB: number;
  heapTotalMB: number;
  rssMB: number;
  leakSuspected: boolean;
  timestamp: Date;
}

let baselineHeap: number | null = null;

export function checkMemoryLeak(): MemoryLeakReport {
  const mem = process.memoryUsage();
  const heapUsedMB = Math.round(mem.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(mem.heapTotal / 1024 / 1024);
  const rssMB = Math.round(mem.rss / 1024 / 1024);

  if (baselineHeap === null) baselineHeap = heapUsedMB;

  const growth = heapUsedMB - baselineHeap;
  const leakSuspected = growth > 100; // 100MB growth suspected

  if (leakSuspected) console.warn(`[MEMORY_LEAK] Heap grew ${growth}MB from baseline ${baselineHeap}MB`);

  return { heapUsedMB, heapTotalMB, rssMB, leakSuspected, timestamp: new Date() };
}

export function refactorMemoryLeakExample(): string {
  // Before: leaky code kept reference
  // let cache = []; setInterval(() => cache.push(new Array(1000000)), 1000);
  // After: use WeakMap, limit cache, clear interval
  return "Refactored: Use WeakMap, LRU cache with max 100, clearInterval on unmount";
}
