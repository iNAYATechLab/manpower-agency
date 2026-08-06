/**
 * Step 29: Global Configuration Panel
 */
import { getGlobalConfig, getConfigHistory } from "@/lib/config/global-config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GlobalConfigPage() {
  const config = getGlobalConfig();
  const history = getConfigHistory(5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Global Configuration (Step 29)</h1>
        <p className="text-sm text-white/60">System-wide settings — Only CEO can modify</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-white/60">Name:</span> {config.companyName}</p>
            <p><span className="text-white/60">Start Date:</span> {config.companyStartDate}</p>
            <p><span className="text-white/60">Support:</span> {config.supportEmail}</p>
            <p><span className="text-white/60">Maintenance:</span> {config.maintenanceMode ? "ON" : "OFF"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security & Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-white/60">2FA Required:</span> {config.require2FAForAdmins ? "Yes" : "No"}</p>
            <p><span className="text-white/60">Session Timeout:</span> {config.sessionTimeoutMinutes} min</p>
            <p><span className="text-white/60">Max Agencies:</span> {config.maxAgencies}</p>
            <p><span className="text-white/60">Max Workers/Agency:</span> {config.maxWorkersPerAgency}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Currencies & Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><span className="text-white/60">Default:</span> {config.defaultCurrency} · Supported: {config.supportedCurrencies.join(", ")}</p>
          <div>
            <p className="mb-1 text-white/60">Feature Flags:</p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(config.featureFlags).map(([k, v]) => (
                <span key={k} className={`rounded px-2 py-1 text-xs ${v ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/40"}`}>
                  {k}: {v ? "ON" : "OFF"}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Config History</CardTitle>
          <CardDescription>Last 5 updates</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-sm text-white/60">No changes yet — Initial config active</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {history.map((h, i) => (
                <li key={i} className="border-b border-white/5 py-1">
                  by {h.updatedBy} at {h.timestamp.toLocaleString()}
                </li>
              ))}
            </ul>
          )}
          <Button size="sm" className="mt-3" variant="outline">
            Edit Config (CEO Only)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
