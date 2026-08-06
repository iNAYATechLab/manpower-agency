/**
 * Step 133: Responsive Mobile Drawer Navigation
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { getNavForRoleStrict } from "@/lib/navigation";
import { type Role } from "@/lib/auth/roles";
import { Button } from "@/components/ui/button";

export function MobileDrawer({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const items = getNavForRoleStrict(role);

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
        <span className="text-lg">☰</span>
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-64 bg-[#2A1143] p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                ✕
              </Button>
            </div>
            <nav className="space-y-1">
              {items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10">
                  <span>{item.icon}</span> {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
