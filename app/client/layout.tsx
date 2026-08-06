import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { NotificationBell } from "@/components/notification-bell";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const user = { username: "client_user", fullName: "NEOM HR Manager", role: "client" as const };
  return (
    <div className="flex min-h-screen bg-[#1D0B2E] text-white">
      <AppSidebar role="client" />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-end gap-2 border-b border-white/10 bg-[#1D0B2E]/80 px-4 py-2">
          <NotificationBell />
          <Header user={user} />
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
