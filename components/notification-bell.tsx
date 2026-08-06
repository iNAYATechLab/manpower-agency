/**
 * Step 135: Notification Bell Icon & Real-time Pop-up
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const mockNotifications = [
  { id: "1", title: "Passport Expiry Alert", message: "3 workers passport expiring in 30 days", time: "2h ago", unread: true },
  { id: "2", title: "Timesheet Approved", message: "Client approved Week 32", time: "5h ago", unread: true },
  { id: "3", title: "Broadcast from CEO", message: "New feature: Geofencing", time: "1d ago", unread: false },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const unread = mockNotifications.filter((n) => n.unread).length;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Notifications" className="relative">
        <span className="text-lg">🔔</span>
        {unread > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E5B84B] text-xs font-bold text-[#1D0B2E]">{unread}</span>}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-white/10 bg-[#2A1143] shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 p-3">
            <p className="text-sm font-semibold">Notifications</p>
            <span className="text-xs text-white/60">{unread} unread</span>
          </div>
          <div className="max-h-96 overflow-auto">
            {mockNotifications.map((n) => (
              <div key={n.id} className={`border-b border-white/5 p-3 hover:bg-white/5 ${n.unread ? "bg-[#B388FF]/10" : ""}`}>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-white/60">{n.message}</p>
                <p className="text-xs text-white/40">{n.time}</p>
              </div>
            ))}
          </div>
          <div className="p-2 text-center">
            <button className="text-xs text-[#B388FF] hover:underline">View all</button>
          </div>
        </div>
      )}
    </div>
  );
}
