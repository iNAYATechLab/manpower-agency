/**
 * Step 40: Global Database Backup Button Backend
 */
import { getBackupJobs, getLastBackupTime, isBackupRunning } from "@/lib/db/backup";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BackupPage() {
  const jobs = getBackupJobs(10);
  const lastBackup = getLastBackupTime();
  const running = isBackupRunning();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold">Global Database Backup (Step 40)</h1>
          <p className="text-sm text-white/60">CEO-only · Full / Incremental · Encrypted</p>
        </div>
        <Button disabled={running}>{running ? "Backup Running..." : "Trigger Backup (CEO)"}</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Backup Status</CardTitle>
          <CardDescription>Last backup: {lastBackup ? lastBackup.toLocaleString() : "Never"} · Running: {running ? "Yes" : "No"}</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-sm text-white/60">No backups yet — Click Trigger Backup to start (3s simulate, CEO only)</p>
          ) : (
            <div className="space-y-2">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#1D0B2E] p-3">
                  <div>
                    <p className="text-sm font-medium">{job.id.slice(0, 18)} · {job.type}</p>
                    <p className="text-xs text-white/60">
                      {job.requestedAt.toLocaleString()} · by {job.requestedBy} · {job.status}
                      {job.fileSizeBytes ? ` · ${(job.fileSizeBytes / 1024 / 1024).toFixed(1)} MB` : ""}
                    </p>
                    {job.error && <p className="text-xs text-red-400">Error: {job.error}</p>}
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${job.status === "completed" ? "bg-green-500/20 text-green-300" : job.status === "running" ? "bg-yellow-500/20 text-yellow-300" : job.status === "failed" ? "bg-red-500/20 text-red-300" : "bg-white/10 text-white/60"}`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-[#E5B84B]/20">
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-white/70">
          <ul className="list-disc pl-5">
            <li>Only CEO (Samiullah Pk) can trigger — Firewall protects</li>
            <li>Trigger → Job `running` → 3s later `completed` (simulated pg_dump)</li>
            <li>File: `manpower_backup_YYYY-MM-DD_full_&lt;id&gt;.sql.gz` → Download URL</li>
            <li>Audit logged: CEO_TRIGGER_BACKUP</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
