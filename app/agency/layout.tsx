/**
 * Agency Dashboard Layout - Uses Global Sidebar + Header
 */
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { NotificationBell } from "@/components/notification-bell";
import { GlobalSearch } from "@/components/ui/search";

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  // Mock agency admin user
  const user = { username: "agency_admin", fullName: "Test Agency Admin", role: "agency_admin" as const };

  return (
    <div className="flex min-h-screen bg-[#1D0B2E] text-white">
      <AppSidebar role="agency_admin" />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#1D0B2E]/80 px-4 py-2 backdrop-blur">
          <div className="flex-1">
            <GlobalSearch placeholder="Search workers, clients..." />
          </div>
          <div className="ml-4 flex items-center gap-2">
            <NotificationBell />
            <Header user={user} />
          </div>
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
