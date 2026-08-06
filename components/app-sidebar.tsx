/**
 * Step 131: Global App Sidebar
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavForRoleStrict, type NavItem } from "@/lib/navigation";
import { type Role } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";

export function AppSidebar({ role, collapsed = false }: { role: Role; collapsed?: boolean }) {
  const pathname = usePathname();
  const items = getNavForRoleStrict(role);

  return (
    <aside className={cn("flex flex-col border-r border-white/10 bg-[#2A1143] transition-all", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E5B84B] font-bold text-[#1D0B2E]">iN</div>
        {!collapsed && <span className="text-sm font-bold">iNAYATechLab</span>}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10",
                active && "bg-[#E5B84B] text-[#1D0B2E] font-semibold hover:bg-[#E5B84B]/90"
              )}
              title={item.label}
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3 text-xs text-white/40">
        {!collapsed && <p>© 2026 iNAYATechLab Inc.</p>}
      </div>
    </aside>
  );
}
