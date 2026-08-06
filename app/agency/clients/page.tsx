/**
 * Step 186: Client Company List Data Table
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ClientTable } from "@/components/clients/client-table";
import { ContractExpiryCard } from "@/components/clients/contract-expiry-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Clients" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients — Foreign Employers (Steps 171-190)</h1>
          <p className="text-sm text-white/60">Client directory, contracts, demands, deployments</p>
        </div>
        <Link href="/agency/clients/onboarding">
          <Button>＋ Onboard Client</Button>
        </Link>
      </div>

      <ClientTable />

      <ContractExpiryCard />
    </div>
  );
}
