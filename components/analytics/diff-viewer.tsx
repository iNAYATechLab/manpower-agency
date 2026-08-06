/**
 * Step 264: Data Modification History Diff Viewer
 */
"use client";

export function DiffViewer({ oldValue, newValue }: { oldValue: Record<string, unknown>; newValue: Record<string, unknown> }) {
  const keys = Array.from(new Set([...Object.keys(oldValue), ...Object.keys(newValue)]));
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Step 264: Diff Viewer</h3>
      <div className="rounded-xl border border-white/10 bg-[#1D0B2E] p-3 font-mono text-sm">
        {keys.map((k) => {
          const oldV = oldValue[k];
          const newV = newValue[k];
          const changed = JSON.stringify(oldV) !== JSON.stringify(newV);
          return (
            <div key={k} className={`flex gap-2 ${changed ? "bg-yellow-500/10" : ""}`}>
              <span className="w-32 text-white/60">{k}:</span>
              <span className={changed ? "text-red-400 line-through" : "text-white/40"}>{String(oldV ?? "—")}</span>
              <span>→</span>
              <span className={changed ? "text-green-400" : "text-white/40"}>{String(newV ?? "—")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
