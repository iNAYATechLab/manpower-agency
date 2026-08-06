/**
 * Step 28: Super Admin Dashboard Distinct Route Layout
 * Protected layout - only CEO (super_admin) can access
 */
import type { Metadata } from "next";
import Link from "next/link";
import { CEO_PROFILE } from "@/lib/ceo";

export const metadata: Metadata = {
  title: "Super Admin Dashboard | iNAYATechLab",
  description: "Super Admin Dashboard - CEO Samiullah Pk Unrestricted Access",
};

const navItems = [
  { href: "/super-admin", label: "Dashboard", icon: "📊" },
  { href: "/super-admin/config", label: "Global Config", icon: "⚙️" },
  { href: "/super-admin/health", label: "System Health", icon: "💚" },
  { href: "/super-admin/features", label: "Feature Flags", icon: "🚩" },
  { href: "/super-admin/backup", label: "DB Backup", icon: "💾" },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1D0B2E] text-white">
      {/* Top Bar - CEO Identity */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1D0B2E]/90 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E5B84B] text-sm font-bold text-[#1D0B2E]">
              CEO
            </div>
            <div>
              <p className="text-sm font-bold leading-none">
                {CEO_PROFILE.fullName} <span className="font-normal text-[#B388FF]">· Super Admin</span>
              </p>
              <p className="text-xs text-white/60">Unrestricted Access · Non-Deletable · 2FA ✓</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-[#E5B84B]/20 px-2.5 py-1 text-xs font-medium text-[#E5B84B] md:inline">
              IVCS v1.0.0 · Phase 1
            </span>
            <Link
              href="/"
              className="rounded-lg border border-white/10 bg-[#2A1143] px-3 py-1.5 text-sm hover:bg-[#B388FF]/20"
            >
              ← Main Site
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-col gap-6 px-4 py-6 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64">
          <nav className="rounded-xl border border-white/10 bg-[#2A1143] p-3">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              Super Admin Panel
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/10"
                  >
                    <span>{item.icon}</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg bg-[#1D0B2E] p-3 text-xs">
              <p className="font-semibold text-[#E5B84B]">CEO Protection Active</p>
              <p className="mt-1 text-white/60">Firewall: BLOCK_CEO_DELETE · Non-Deletable ✓</p>
              <p className="text-white/60">Master Key: Active · Recovery: 10 codes</p>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
