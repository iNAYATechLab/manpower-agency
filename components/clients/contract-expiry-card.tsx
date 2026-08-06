/**
 * Step 189: Contract Expiry Alert Card
 */
"use client";
import { MOCK_CLIENTS } from "@/lib/clients/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ContractExpiryCard() {
  const now = new Date("2026-08-07");
  const alerts = MOCK_CLIENTS.map((c) => {
    const expiry = new Date(c.contractExpiry);
    const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return { ...c, diffDays, urgency: diffDays < 60 ? "high" : diffDays < 90 ? "medium" : "low" };
  }).filter((c) => c.diffDays < 90);

  return (
    <Card className="border-yellow-500/20">
      <CardHeader>
        <CardTitle className="text-base">Step 189: Contract Expiry Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.length === 0 ? (
          <p className="text-sm text-white/60">No expiries within 90 days</p>
        ) : (
          alerts.map((c) => (
            <div key={c.id} className={`rounded-lg border p-3 ${c.urgency === "high" ? "border-red-500/30 bg-red-500/10" : "border-yellow-500/20 bg-yellow-500/10"}`}>
              <p className="text-sm font-medium">{c.companyName}</p>
              <p className="text-xs text-white/60">
                Expiry: {c.contractExpiry} • {c.diffDays} days left • <span className={c.urgency === "high" ? "text-red-400" : "text-yellow-400"}>{c.urgency.toUpperCase()}</span>
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
