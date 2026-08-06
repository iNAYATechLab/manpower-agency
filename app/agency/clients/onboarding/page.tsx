/**
 * Steps 171-181: Foreign Client Onboarding Form (Multi-section)
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CompanyProfileForm } from "@/components/clients/onboarding/company-profile";
import { ClientContactForm } from "@/components/clients/onboarding/contact-form";
import { JobSitesForm } from "@/components/clients/onboarding/job-sites-form";
import { ContractUploadForm } from "@/components/clients/onboarding/contract-upload";
import { BillingRatesForm } from "@/components/clients/billing-rates";
import { JobDemandForm } from "@/components/clients/job-demand-form";
import { DragDropDeployment } from "@/components/clients/drag-drop-deployment";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClientOnboardingPage() {
  const [company, setCompany] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Record<string, string>>({});
  const [sites, setSites] = useState<Array<Record<string, string>>>([{ name: "NEOM Site A", city: "Tabuk", latitude: "28.0", longitude: "35.0" }]);
  const [contract, setContract] = useState<Record<string, string>>({});
  const [billing, setBilling] = useState("25");
  const [pay, setPay] = useState("18");

  const onSubmit = () => {
    console.log({ company, contact, sites, contract, billing, pay });
    alert("Client Onboarded Successfully! (Mock)");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Clients", href: "/agency/clients" }, { label: "Onboarding (171)" }]} />
      <div>
        <h1 className="text-xl font-bold">Foreign Client Onboarding (Steps 171-181)</h1>
        <p className="text-sm text-white/60">Company, Contacts, Job Sites, Contract, Billing/Pay, Demand</p>
      </div>

      <div className="space-y-6 rounded-xl border border-white/10 bg-[#2A1143] p-6">
        <CompanyProfileForm data={company} onChange={setCompany} />
        <div className="border-t border-white/10 pt-6">
          <ClientContactForm data={contact} onChange={setContact} />
        </div>
        <div className="border-t border-white/10 pt-6">
          <JobSitesForm sites={sites} onChange={setSites} />
        </div>
        <div className="border-t border-white/10 pt-6">
          <ContractUploadForm data={contract} onChange={setContract} />
        </div>
        <div className="border-t border-white/10 pt-6">
          <BillingRatesForm billing={billing} pay={pay} onChange={(b, p) => { setBilling(b); setPay(p); }} />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#2A1143] p-6">
        <JobDemandForm />
      </div>

      <div className="rounded-xl border border-white/10 bg-[#2A1143] p-6">
        <DragDropDeployment />
      </div>

      <div className="flex gap-2">
        <Button onClick={onSubmit}>Submit Onboarding ✓</Button>
        <Link href="/agency/clients">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
    </div>
  );
}
