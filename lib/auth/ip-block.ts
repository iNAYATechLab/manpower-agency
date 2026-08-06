/**
 * Step 120: Unwanted IP Block System
 */

const blockedIPs = new Set<string>(["192.0.2.1"]); // Example blocked
const ipFailCount = new Map<string, number>();

export function isIPBlocked(ip: string): boolean {
  return blockedIPs.has(ip);
}

export function blockIP(ip: string, reason?: string): void {
  blockedIPs.add(ip);
  console.log(`[IP_BLOCK] ${ip} blocked: ${reason || "manual"}`);
}

export function unblockIP(ip: string): void {
  blockedIPs.delete(ip);
}

export function recordIPFail(ip: string): void {
  const count = (ipFailCount.get(ip) || 0) + 1;
  ipFailCount.set(ip, count);
  if (count >= 10) blockIP(ip, "10 fails");
}

export function getBlockedIPs(): string[] {
  return Array.from(blockedIPs);
}
