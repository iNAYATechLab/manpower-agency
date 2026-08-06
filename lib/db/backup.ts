/**
 * Step 40: Global Database Backup Button Backend
 * Handles DB backup trigger, status, download (CEO only)
 */

import { CEO_PROFILE } from "@/lib/ceo";
import { logCEOActivity } from "@/lib/audit/logger";
import { logInfo, logError } from "@/lib/logs/system-log";
import { randomBytes } from "crypto";

export type BackupStatus = "pending" | "running" | "completed" | "failed";
export type BackupType = "full" | "incremental" | "schema_only";

export interface BackupJob {
  id: string;
  type: BackupType;
  status: BackupStatus;
  requestedBy: string; // CEO username
  requestedAt: Date;
  completedAt?: Date;
  fileSizeBytes?: number;
  fileName?: string;
  downloadUrl?: string;
  error?: string;
}

const backupJobs: BackupJob[] = [];
let lastBackupAt: Date | null = null;

/**
 * Step 40: Trigger backup (CEO only)
 */
export function triggerBackup(
  requestedByUsername: string,
  type: BackupType = "full"
): BackupJob {
  if (requestedByUsername !== CEO_PROFILE.username) {
    throw new Error("ACCESS_DENIED: Only CEO can trigger global backup");
  }

  // Prevent concurrent backups
  const running = backupJobs.find((j) => j.status === "running");
  if (running) {
    throw new Error(`Backup already running: ${running.id}`);
  }

  const job: BackupJob = {
    id: `backup_${Date.now()}_${randomBytes(3).toString("hex")}`,
    type,
    status: "running",
    requestedBy: requestedByUsername,
    requestedAt: new Date(),
  };

  backupJobs.push(job);

  logCEOActivity("CEO_TRIGGER_BACKUP", "backup", {
    backupId: job.id,
    type,
  });
  logInfo(`Backup triggered: ${job.id} (${type}) by ${requestedByUsername}`, "backup", {
    backupId: job.id,
  });

  // Simulate async backup completion (in real, would spawn pg_dump)
  setTimeout(() => {
    try {
      // Simulate success (95% success rate)
      if (Math.random() > 0.05) {
        job.status = "completed";
        job.completedAt = new Date();
        job.fileSizeBytes = Math.floor(Math.random() * 500 * 1024 * 1024) + 50 * 1024 * 1024; // 50-550 MB
        job.fileName = `manpower_backup_${job.requestedAt.toISOString().split("T")[0]}_${job.type}_${job.id}.sql.gz`;
        job.downloadUrl = `/api/super-admin/backup/${job.id}/download`;
        lastBackupAt = new Date();
        logInfo(`Backup completed: ${job.id} (${job.fileSizeBytes} bytes)`, "backup");
      } else {
        job.status = "failed";
        job.error = "Simulated backup failure (disk space)";
        job.completedAt = new Date();
        logError(`Backup failed: ${job.id}`, "backup", { error: job.error });
      }
    } catch (e) {
      job.status = "failed";
      job.error = (e as Error).message;
      logError(`Backup error: ${job.id}`, "backup");
    }
  }, 3000); // 3s simulate

  return { ...job };
}

/**
 * Get backup jobs (CEO view)
 */
export function getBackupJobs(limit = 20): BackupJob[] {
  return [...backupJobs].sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime()).slice(0, limit);
}

/**
 * Get backup job by id
 */
export function getBackupJob(id: string): BackupJob | null {
  return backupJobs.find((j) => j.id === id) || null;
}

/**
 * Get last backup time
 */
export function getLastBackupTime(): Date | null {
  return lastBackupAt;
}

/**
 * Check if backup is running
 */
export function isBackupRunning(): boolean {
  return backupJobs.some((j) => j.status === "running");
}
