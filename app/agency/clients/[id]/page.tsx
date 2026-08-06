/**
 * Steps 187-190: Client Details View + Active Workers Tab + Contract Expiry + Feedback
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ContractExpiryCard } from "@/components/clients/contract-expiry-card";
import { FeedbackSystem } from "@/components/clients/feedback-system";
import { MOCK_CLIENTS } from "@/lib/clients/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClientDetailsPage({ params }: { params: { id: string } }) {
  const client = MOCK_CLIENTS.find((c) => c.id === params.id) || MOCK_CLIENTS[0]!;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Clients", href: "/agency/clients" }, { label: client.companyName }]} />

      {/* Step 187: Client Details View */}
      <div className="rounded-xl border border-[#E5B84B]/20 bg-gradient-to-br from-[#2A1143] to-[#1D0B2E] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{client.companyName} (Step 187)</h1>
            <p className="text-sm text-white/60">
              {client.companyCode} • {client.country} • {client.email}
            </p>
            <p className="mt-1 text-sm">Contract Expiry: {client.contractExpiry} • Rating: ★ {client.rating}</p>
          </div>
          <Link href={`/agency/clients/${client.id}#workers`}>
            <Button size="sm">View Workers</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company Profile (172)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>Registered Name: {client.companyName} Ltd.</p>
            <p>Email: {client.email}</p>
            <p>Active Workers: {client.activeWorkers}</p>
          </CardContent>
        </Card>
        <ContractExpiryCard />
      </div>

      {/* Step 188: Client-wise Active Workers Tab */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Step 188: Active Workers (Client-wise)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60">
                <tr>
                  <th className="p-2 text-left">Worker</th>
                  <th className="p-2 text-left">Skill</th>
                  <th className="p-2 text-left">Site</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="p-2">Abdul Karim</td>
                  <td className="p-2">Welder</td>
                  <td className="p-2">NEOM Site A</td>
                  <td className="p-2 text-[#B388FF]">Deployed</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-2">Mohammad Ali</td>
                  <td className="p-2">Electrician</td>
                  <td className="p-2">NEOM Site A</td>
                  <td className="p-2 text-[#B388FF]">Deployed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Step 190: Feedback & Rating */}
      <FeedbackSystem clientId={client.id} />
    </div>
  );
}
