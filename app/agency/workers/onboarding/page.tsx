/**
 * Step 151: Multi-step Form for Worker Onboarding (Steps 152-161)
 */
"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PersonalInfoStep } from "@/components/workers/onboarding/personal-info";
import { PassportForm } from "@/components/workers/onboarding/passport-form";
import { MedicalForm } from "@/components/workers/onboarding/medical-form";
import { SkillSelector } from "@/components/workers/onboarding/skill-selector";
import { GradeDropdown } from "@/components/workers/onboarding/grade-dropdown";
import { LanguageExperience } from "@/components/workers/onboarding/language-experience";
import { BankDetailsForm } from "@/components/workers/onboarding/bank-details";
import { EmergencyContactForm } from "@/components/workers/onboarding/emergency-contact";
import { PhotoUpload } from "@/components/workers/onboarding/photo-upload";
import { CertificateUpload } from "@/components/workers/onboarding/certificate-upload";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  "Personal (152)",
  "Passport (153)",
  "Medical (154)",
  "Skills (155)",
  "Grade (156)",
  "Language (157)",
  "Bank (158)",
  "Emergency (159)",
  "Photo (160)",
  "Certificates (161)",
];

export default function WorkerOnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<Record<string, any>>({
    personal: {},
    passport: {},
    medical: {},
    skills: [],
    grade: "",
    languages: [],
    experience: 0,
    bank: {},
    emergency: {},
    photo: "",
    certs: [],
  });

  const next = () => setCurrent((c) => Math.min(c + 1, steps.length - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const onSubmit = () => {
    console.log("Onboarding data", data);
    alert("Worker Onboarded Successfully! (Mock) - Data logged to console");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Workers", href: "/agency/workers" }, { label: "Onboarding (151)" }]} />
      <div>
        <h1 className="text-xl font-bold">Worker Onboarding — Multi-step Form (Step 151)</h1>
        <p className="text-sm text-white/60">Steps 152-161 combined · Progress {current + 1}/{steps.length}</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {steps.map((s, idx) => (
          <div key={idx} className={`h-2 flex-1 rounded ${idx <= current ? "bg-[#E5B84B]" : "bg-white/10"}`} title={s} />
        ))}
      </div>
      <p className="text-xs text-white/40">{steps[current]}</p>

      {/* Step Content */}
      <div className="rounded-xl border border-white/10 bg-[#2A1143] p-6">
        {current === 0 && <PersonalInfoStep data={data.personal} onChange={(d) => setData({ ...data, personal: d })} />}
        {current === 1 && <PassportForm data={data.passport} onChange={(d) => setData({ ...data, passport: d })} />}
        {current === 2 && <MedicalForm data={data.medical} onChange={(d) => setData({ ...data, medical: d })} />}
        {current === 3 && <SkillSelector selected={data.skills} onChange={(ids) => setData({ ...data, skills: ids })} />}
        {current === 4 && <GradeDropdown value={data.grade} onChange={(v) => setData({ ...data, grade: v })} />}
        {current === 5 && <LanguageExperience languages={data.languages} experience={data.experience} onChange={({ languages, experience }) => setData({ ...data, languages, experience })} />}
        {current === 6 && <BankDetailsForm data={data.bank} onChange={(d) => setData({ ...data, bank: d })} />}
        {current === 7 && <EmergencyContactForm data={data.emergency} onChange={(d) => setData({ ...data, emergency: d })} />}
        {current === 8 && <PhotoUpload url={data.photo} onChange={(url) => setData({ ...data, photo: url })} />}
        {current === 9 && <CertificateUpload certs={data.certs} onChange={(c) => setData({ ...data, certs: c })} />}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prev} disabled={current === 0}>
          ← Prev
        </Button>
        {current < steps.length - 1 ? (
          <Button onClick={next}>Next →</Button>
        ) : (
          <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Onboarding ✓
          </Button>
        )}
      </div>

      <Link href="/agency/workers" className="text-sm text-[#B388FF] hover:underline">
        ← Back to Workers
      </Link>
    </div>
  );
}
