/**
 * Step 100: Database Backup Automation Tune
 * Tunes backup scheduling, retention, and health checks
 */

import { getBackupJobs, triggerBackup, type BackupType } from "@/lib/db/backup";
import { logInfo, logWarn } from "@/lib/logs/system-log";
import { CEO_PROFILE } from "@/lib/ceo";

export interface BackupSchedule {
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  timeUTC: string; // "02:00"
  type: BackupType;
  retentionDays: number;
  lastRun?: Date;
  nextRun?: Date;
}

let schedule: BackupSchedule = {
  enabled: true,
  frequency: "daily",
  timeUTC: "02:00", // 2 AM UTC
  type: "full",
  retentionDays: 30,
  nextRun: new Date(Date.now() + 24 * 3600 * 1000),
};

/**
 * Step 100: Tune backup automation
 */
export function tuneBackupAutomation(updates: Partial<BackupSchedule>, updatedByUsername: string): BackupSchedule {
  if (updatedByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can tune backup automation");
  }
  schedule = { ...schedule, ...updates };
  logInfo(`Backup automation tuned: ${JSON.stringify(updates)}`, "backup", { updatedBy: updatedByUsername });
  return { ...schedule };
}

export function getBackupSchedule(): BackupSchedule {
  return { ...schedule };
}

/**
 * Check if backup is due and trigger if needed
 */
export function checkAndTriggerScheduledBackup(): boolean {
  if (!schedule.enabled) return false;
  if (!schedule.nextRun || schedule.nextRun.getTime() > Date.now()) return false;

  try {
    triggerBackup(CEO_PROFILE.username, schedule.type);
    schedule.lastRun = new Date();
    // Calculate nextRun
    const next = new Date();
    if (schedule.frequency === "daily") next.setDate(next.getDate() + 1);
    else if (schedule.frequency === "weekly") next.setDate(next.getDate() + 7);
    else next.setMonth(next.getMonth() + 1);
    schedule.nextRun = next;
    logInfo(`Scheduled backup triggered: ${schedule.type}`, "backup");
    return true;
  } catch (e) {
    logWarn(`Scheduled backup failed: ${(e as Error).message}`, "backup");
    return false;
  }
}

/**
 * Get backup health (last 5 jobs success rate)
 */
export function getBackupHealth(): { total: number; success: number; failed: number; successRate: number; lastBackup?: Date } {
  const jobs = getBackupJobs(5);
  const total = jobs.length;
  const success = jobs.filter((j) => j.status === "completed").length;
  const failed = jobs.filter((j) => j.status === "failed").length;
  const successRate = total > 0 ? Math.round((success / total) * 100) : 100;
  const lastBackup = jobs.find((j) => j.status === "completed")?.completedAt;
  return { total, success, failed, successRate, lastBackup };
}
