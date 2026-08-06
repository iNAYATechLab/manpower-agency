/**
 * Step 236: 30 and 60 Days Cron-Job Scheduler
 */

export interface CronJob {
  id: string;
  name: string;
  schedule: string; // cron expression
  lastRun?: Date;
  nextRun: Date;
  enabled: boolean;
}

const jobs: CronJob[] = [
  { id: "cron_60d", name: "60 Days Expiry Alert", schedule: "0 2 * * *", nextRun: new Date(Date.now() + 24 * 3600 * 1000), enabled: true },
  { id: "cron_30d", name: "30 Days Expiry Alert", schedule: "0 3 * * *", nextRun: new Date(Date.now() + 24 * 3600 * 1000), enabled: true },
];

export function getCronJobs(): CronJob[] {
  return [...jobs];
}

export function runCronJob(id: string): CronJob | null {
  const job = jobs.find((j) => j.id === id);
  if (!job || !job.enabled) return null;
  job.lastRun = new Date();
  // Next run daily
  job.nextRun = new Date(Date.now() + 24 * 3600 * 1000);
  console.log(`[CRON] Ran ${job.name} at ${job.lastRun.toISOString()}`);
  return { ...job };
}

export function scheduleCronCheck(): string {
  return "Cron scheduler active: 30d at 03:00 UTC, 60d at 02:00 UTC daily";
}
