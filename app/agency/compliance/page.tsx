/**
 * Compliance Overview Page (Steps 231-240, 250)
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WatermarkedViewer } from "@/components/compliance/watermarked-viewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Compliance" }]} />
      <div>
        <h1 className="text-2xl font-bold">Compliance, Document & Cloud Notification (Steps 231-250)</h1>
        <p className="text-sm text-white/60">Passport, Akama, Medical, Insurance, BMET, SOS, Storage</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">231 Passport Uploader</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <input type="file" accept=".pdf,image/*" className="text-sm text-white/60" />
            <p className="text-xs text-white/40">Validator: PDF/JPG/PNG, 10MB, filename contains passport</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">232 Akama Processor</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Akama: 123456 • Expiry: 2027-06-30 • 328 days left</p>
            <p className="text-xs text-green-400">✓ Valid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">233-236 Smart Tracker & Cron</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>📅 30d Cron: Daily 03:00 UTC</p>
            <p>📅 60d Cron: Daily 02:00 UTC</p>
            <p className="text-xs text-yellow-400">3 workers expiring in 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">237 Medical Catalog</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Fit: 4 • Pending: 1 • Unfit: 0</p>
            <p className="text-xs text-white/60">Digital catalog with expiry</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">238 Insurance Catalog</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>3 Policies • Coverage $50k avg</p>
            <p className="text-xs text-white/60">Policy catalog per worker</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">239 BMET & Immigration Permit Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2">
            <span>WRK-2026-001 — BMET-123 — Pending</span>
            <span className="text-yellow-400">Pending</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="text-base text-red-300">240 Emergency SOS Messaging Backend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/60">Real-time SOS via Pusher/Firebase (241) — Active SOS: 0</p>
          <Button size="sm" variant="destructive" className="mt-2">
            Test SOS Trigger
          </Button>
        </CardContent>
      </Card>

      <WatermarkedViewer fileUrl="https://storage.inayatechlab.com/private-documents/workers/wrk_001/passport.pdf" fileType="passport" />

      <div className="flex gap-2">
        <Link href="/agency/notifications">
          <Button variant="outline">Go to Notification Center (244) →</Button>
        </Link>
      </div>
    </div>
  );
}
