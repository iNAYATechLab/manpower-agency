/**
 * Step 244: System Notification Center Page (242-248)
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEmailPreferences, updateEmailPreferences } from "@/lib/notifications/preferences";
import { toggleReadStatus } from "@/lib/notifications/read-status";
import { enqueue, processQueue, getQueueJobs } from "@/lib/queue/processor";
import { retryFailedJobs } from "@/lib/queue/retry";

const mockNotifications = [
  { id: "notif_1", title: "Passport Expiry", message: "Abdul Karim passport expiring in 25 days", read: false },
  { id: "notif_2", title: "Payroll Paid", message: "Aug payroll $8,500 paid", read: false },
  { id: "notif_3", title: "Broadcast from CEO", message: "New feature: Geofencing", read: true },
];

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState(() => getEmailPreferences("agency_admin_001"));
  const [notifications, setNotifications] = useState(mockNotifications);
  const [queue, setQueue] = useState(getQueueJobs());

  const toggleRead = (id: string) => {
    toggleReadStatus("agency_admin_001", id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const savePrefs = () => {
    updateEmailPreferences("agency_admin_001", prefs);
    alert("Preferences saved");
  };

  const testQueue = async () => {
    enqueue("email", { to: "test@agency.com", subject: "Test" });
    enqueue("sms", { to: "+966500000001", message: "Test SMS" });
    const result = await processQueue();
    setQueue([...result]);
  };

  const retryFailed = async () => {
    const res = await retryFailedJobs();
    alert(`Retried ${res.retried}, succeeded ${res.succeeded}`);
    setQueue([...getQueueJobs()]);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Notifications (244)" }]} />
      <div>
        <h1 className="text-2xl font-bold">System Notification Center (Steps 241-250)</h1>
        <p className="text-sm text-white/60">Pusher/Firebase Real-time (241), Resend/SendGrid (242), Twilio SMS (243)</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className={`rounded-lg border p-3 ${n.read ? "border-white/10 bg-[#1D0B2E] opacity-60" : "border-[#E5B84B]/30 bg-[#E5B84B]/10"}`}>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{n.title}</p>
                  <span className={`text-xs ${n.read ? "text-white/40" : "text-[#E5B84B]"}`}>{n.read ? "Read" : "Unread"}</span>
                </div>
                <p className="text-xs text-white/60">{n.message}</p>
                <Button size="sm" variant="ghost" onClick={() => toggleRead(n.id)} className="mt-1">
                  Step 246: Toggle Read/Unread
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">245 Email Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {Object.entries(prefs)
              .filter(([k]) => k !== "userId")
              .map(([key, val]) => (
                <label key={key} className="flex items-center justify-between">
                  <span>{key}</span>
                  <input type="checkbox" checked={val as boolean} onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked } as never)} />
                </label>
              ))}
            <Button size="sm" onClick={savePrefs}>
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">247-248 Background Queue & Retry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button size="sm" onClick={testQueue}>
              247 Enqueue Email + SMS + Process Queue
            </Button>
            <Button size="sm" variant="outline" onClick={retryFailed}>
              248 Retry Failed Jobs
            </Button>
          </div>
          <div className="space-y-1 text-xs">
            {queue.slice(-3).map((job) => (
              <div key={job.id} className="rounded border border-white/10 bg-[#1D0B2E] px-2 py-1">
                {job.type} — {job.status} (attempts {job.attempts}/{job.maxAttempts})
              </div>
            ))}
            {queue.length === 0 && <p className="text-white/40">No jobs — Click Enqueue to test</p>}
          </div>
          <p className="text-xs text-white/40">242 Resend/SendGrid + 243 Twilio SMS linked via queue processor</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">249-250 Download Permission & Watermarked Preview</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-white/60">
          <p>249 Permission Checker: CEO bypass, Agency Admin own agency, Worker own document</p>
          <p>250 Watermarked Viewer: Diagonal confidential watermark for preview, original requires auth</p>
          <p className="text-xs">See Compliance Page for Watermarked Viewer UI</p>
        </CardContent>
      </Card>
    </div>
  );
}
