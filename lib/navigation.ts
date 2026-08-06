/**
 * Step 132: Dynamic Navigation Menu System
 * Role-based menu generation
 */

import { type Role } from "@/lib/auth/roles";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles: Role[];
  badge?: string;
  children?: NavItem[];
}

export const NAV_CONFIG: NavItem[] = [
  { label: "Dashboard", href: "/agency", icon: "📊", roles: ["agency_admin", "super_admin"] },
  { label: "Workers", href: "/agency/workers", icon: "👷", roles: ["agency_admin", "field_supervisor", "super_admin"] },
  { label: "Clients", href: "/agency/clients", icon: "🏢", roles: ["agency_admin", "super_admin"] },
  { label: "Projects", href: "/agency/projects", icon: "📁", roles: ["agency_admin", "client", "super_admin"] },
  { label: "Timesheets", href: "/agency/timesheets", icon: "⏱️", roles: ["agency_admin", "field_supervisor", "client", "super_admin"] },
  { label: "Payroll", href: "/agency/payroll", icon: "💰", roles: ["agency_admin", "super_admin"] },
  { label: "Invoices", href: "/agency/invoices", icon: "🧾", roles: ["agency_admin", "super_admin"] },
  { label: "Reports", href: "/agency/reports", icon: "📈", roles: ["agency_admin", "super_admin"] },
  // Client
  { label: "Client Dashboard", href: "/client", icon: "🏢", roles: ["client", "super_admin"] },
  { label: "My Projects", href: "/client/projects", icon: "📁", roles: ["client"] },
  { label: "Approve Timesheets", href: "/client/timesheets", icon: "✅", roles: ["client"] },
  // Supervisor
  { label: "Supervisor", href: "/supervisor", icon: "📱", roles: ["field_supervisor", "super_admin"] },
  { label: "My Workers", href: "/supervisor/workers", icon: "👷", roles: ["field_supervisor"] },
  // Worker
  { label: "My Dashboard", href: "/worker", icon: "👤", roles: ["worker", "super_admin"] },
  { label: "My Payslips", href: "/worker/payslips", icon: "💵", roles: ["worker"] },
  { label: "My Documents", href: "/worker/documents", icon: "📄", roles: ["worker"] },
  // Super Admin (already has /super-admin layout)
  { label: "Super Admin", href: "/super-admin", icon: "👑", roles: ["super_admin"] },
];

export function getNavForRole(role: Role): NavItem[] {
  return NAV_CONFIG.filter((item) => item.roles.includes(role) || item.roles.includes("super_admin" as Role) === (role === "super_admin"));
}

export function getNavForRoleStrict(role: Role): NavItem[] {
  return NAV_CONFIG.filter((item) => item.roles.includes(role));
}
