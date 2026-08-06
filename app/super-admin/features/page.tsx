/**
 * Step 38: Feature Flags Control Panel
 */
import { getFeatureFlags } from "@/lib/features/flags";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  const flags = getFeatureFlags();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Feature Flags (Step 38)</h1>
        <p className="text-sm text-white/60">CEO-only control — Toggle features system-wide · IVCS</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {flags.map((flag) => (
          <Card key={flag.key} className={flag.enabled ? "border-green-500/20" : "border-white/10 opacity-75"}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                {flag.name}
                <span className={`rounded-full px-2 py-1 text-xs ${flag.enabled ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/40"}`}>
                  {flag.enabled ? "ON" : "OFF"}
                </span>
              </CardTitle>
              <CardDescription>{flag.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-white/60">Key: {flag.key} · Category: {flag.category}</p>
              {flag.updatedAt && <p className="text-xs text-white/40">Updated by {flag.updatedBy} at {flag.updatedAt.toLocaleString()}</p>}
              <Button size="sm" variant="outline" className="mt-3">
                Toggle (CEO Only)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
