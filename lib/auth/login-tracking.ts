/**
 * Step 122: Login Tracking & IP Address Logging Service
 */

export interface LoginAttempt {
  id: string;
  userId?: string;
  username: string;
  ip: string;
  userAgent?: string;
  success: boolean;
  timestamp: Date;
  country?: string;
}

const loginLogs: LoginAttempt[] = [];

export function logLoginAttempt(input: Omit<LoginAttempt, "id" | "timestamp">): LoginAttempt {
  const entry: LoginAttempt = { id: `login_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`, timestamp: new Date(), ...input };
  loginLogs.push(entry);
  if (loginLogs.length > 1000) loginLogs.shift();
  console.log(`[LOGIN] ${input.username} from ${input.ip} -> ${input.success ? "SUCCESS" : "FAIL"}`);
  return entry;
}

export function getLoginHistory(username?: string, limit = 50): LoginAttempt[] {
  let filtered = [...loginLogs];
  if (username) filtered = filtered.filter((l) => l.username === username);
  return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
}

export function getRecentFailedLogins(limit = 20): LoginAttempt[] {
  return loginLogs.filter((l) => !l.success).slice(-limit);
}
