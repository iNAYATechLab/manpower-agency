import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { COMPANY, DESIGN_SYSTEM } from "@/lib/constants";
import { ArrowRight, Shield, Users, Clock, FileText, BarChart3, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1D0B2E] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1D0B2E]/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E5B84B] font-bold text-[#1D0B2E]">
              iN
            </div>
            <span className="text-lg font-bold tracking-tight">
              {COMPANY.name} <span className="text-[#B388FF] font-normal">| Manpower SaaS</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/60 md:inline">Super Admin: {COMPANY.ceo}</span>
            <ThemeToggle />
            <Button size="sm" className="hidden md:inline-flex">
              Agency Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-[#B388FF]/30 bg-[#2A1143] px-4 py-1.5 text-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#E5B84B] animate-pulse" />
            Phase 1: Foundation Complete — Steps 1-20
            <span className="ml-2 rounded bg-[#E5B84B] px-2 py-0.5 text-xs font-bold text-[#1D0B2E]">
              v1.0.0
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Manpower Supply
            <span className="bg-gradient-to-r from-[#E5B84B] to-[#B388FF] bg-clip-text text-transparent">
              {" "}
              SaaS Platform
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Multi-Tenant Workforce Management — Worker Onboarding থেকে Payroll, Geofencing Timesheet থেকে
            Multi-Currency Invoicing পর্যন্ত সম্পূর্ণ সমাধান।
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Documentation
            </Button>
          </div>

          {/* Design System Preview */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              { name: "Dark Purple", hex: DESIGN_SYSTEM.colors.darkPurple, usage: "Primary BG" },
              { name: "Gold", hex: DESIGN_SYSTEM.colors.gold, usage: "Buttons" },
              { name: "Dark Plum", hex: DESIGN_SYSTEM.colors.darkPlum, usage: "Secondary BG" },
              { name: "Pure White", hex: DESIGN_SYSTEM.colors.white, usage: "Text" },
              { name: "Lavender", hex: DESIGN_SYSTEM.colors.lavender, usage: "Accents" },
            ].map((c) => (
              <div key={c.hex} className="rounded-xl border border-white/10 bg-[#2A1143] p-4 text-left">
                <div className="h-12 w-full rounded-lg border border-white/10" style={{ background: c.hex }} />
                <p className="mt-3 text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-white/60">{c.hex}</p>
                <p className="text-xs text-[#B388FF]">{c.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 1 Completion */}
      <section className="border-y border-white/10 bg-[#2A1143]/50">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">পর্যায় ১: ফাউন্ডেশন সম্পন্ন (Step 1-20)</h2>
              <p className="mt-2 text-white/60">GitHub, Security, Next.js 14, Tailwind, Shadcn UI সহ সম্পূর্ণ সেটআপ</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Shield, title: "GitHub & Security", desc: "Private repo, AES-256 encryption, .env.secret, branch protection, webhook", done: true },
                { icon: FileText, title: "Next.js 14 App Router", desc: "TypeScript Strict, ESLint + Prettier, App Router architecture", done: true },
                { icon: Users, title: "Design System", desc: "5-color palette, CSS variables, Tailwind config, dark/light themes", done: true },
                { icon: Clock, title: "Shadcn UI", desc: "Components.json, Button, Card, Theme Provider configured", done: true },
                { icon: BarChart3, title: "Branding & Metadata", desc: "iNAYATechLab Inc. metadata, start date 01 Aug 2026", done: true },
                { icon: CheckCircle2, title: "Root Layout", desc: "Inter + Poppins + Hind Siliguri fonts, ThemeProvider", done: true },
              ].map((item) => (
                <Card key={item.title} className="relative overflow-hidden">
                  <div className="absolute right-3 top-3">
                    {item.done && <CheckCircle2 className="h-5 w-5 text-[#E5B84B]" />}
                  </div>
                  <CardHeader>
                    <item.icon className="h-8 w-8 text-[#B388FF]" />
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex rounded-full bg-[#E5B84B]/20 px-2.5 py-1 text-xs font-medium text-[#E5B84B]">
                      ✓ Completed
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Phase Teaser */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#B388FF]/20 bg-gradient-to-br from-[#2A1143] to-[#1D0B2E] p-8 text-center">
          <h3 className="text-xl font-bold">পরবর্তী পর্যায়ের জন্য প্রস্তুত?</h3>
          <p className="mt-2 text-white/60">
            Step 21-40 এ আমরা Database, Prisma, Supabase, Auth এবং Multi-Tenancy শুরু করবো।
          </p>
          <p className="mt-4 text-sm text-[#E5B84B]">আপনি Step 21 দিলেই আমি পরবর্তী পর্যায় শুরু করবো →</p>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-white/40">
        <p>
          © 2026 {COMPANY.name} • Founded 01 August 2026 • CEO {COMPANY.ceo} • Primary: {COMPANY.email}
        </p>
        <p className="mt-1">Private Repository: {COMPANY.owner}/{COMPANY.repo} • AES-256 Secured</p>
      </footer>
    </div>
  );
}
