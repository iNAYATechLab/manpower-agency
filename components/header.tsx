/**
 * Step 134: User Profile Header & Dropdown
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header({ user }: { user: { username: string; fullName: string; role: string; avatarUrl?: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#1D0B2E]/80 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{user.fullName}</span>
        <span className="rounded-full bg-[#B388FF]/20 px-2 py-0.5 text-xs text-[#B388FF]">{user.role}</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Profile">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5B84B] text-sm font-bold text-[#1D0B2E]">
              {user.username.slice(0, 2).toUpperCase()}
            </span>
          </Button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-[#2A1143] p-2 shadow-lg">
              <p className="px-3 py-2 text-sm font-medium">{user.username}</p>
              <p className="px-3 text-xs text-white/60">{user.role}</p>
              <div className="mt-2 border-t border-white/10 pt-2">
                <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-white/10">Profile</button>
                <button className="w-full rounded px-3 py-1.5 text-left text-sm hover:bg-white/10">Settings</button>
                <button className="w-full rounded px-3 py-1.5 text-left text-sm text-red-300 hover:bg-white/10">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
