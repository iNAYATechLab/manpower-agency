/**
 * Step 119: Multiple Device Login Blocking Logic
 */

const activeDevices = new Map<string, Set<string>>(); // userId -> Set<deviceId>
const MAX_DEVICES = 1; // Block multiple devices

export function registerDevice(userId: string, deviceId: string, allowMultiple = false): { allowed: boolean; reason?: string } {
  let devices = activeDevices.get(userId);
  if (!devices) {
    devices = new Set();
    activeDevices.set(userId, devices);
  }
  if (!allowMultiple && devices.size >= MAX_DEVICES && !devices.has(deviceId)) {
    return { allowed: false, reason: `Max ${MAX_DEVICES} device(s) allowed. Logout from other device first.` };
  }
  devices.add(deviceId);
  return { allowed: true };
}

export function unregisterDevice(userId: string, deviceId: string): void {
  activeDevices.get(userId)?.delete(deviceId);
}

export function getActiveDevices(userId: string): string[] {
  return Array.from(activeDevices.get(userId) || []);
}
