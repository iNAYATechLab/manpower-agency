/**
 * Step 248: Failed Email Retry Backend Service
 */

import { getQueueJobs, processQueue } from "@/lib/queue/processor";

export async function retryFailedJobs(): Promise<{ retried: number; succeeded: number }> {
  const failed = getQueueJobs().filter((j) => j.status === "failed");
  let succeeded = 0;
  for (const job of failed) {
    job.status = "pending";
    job.attempts = 0;
  }
  const result = await processQueue();
  succeeded = result.filter((j) => j.status === "completed").length;
  return { retried: failed.length, succeeded };
}

export function getFailedJobs(): ReturnType<typeof getQueueJobs> {
  return getQueueJobs().filter((j) => j.status === "failed");
}
