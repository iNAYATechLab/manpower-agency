/**
 * Step 148: System Wide Search Bar Frontend
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GlobalSearch({ placeholder = "Search workers, clients, projects..." }: { placeholder?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const onSearch = (q: string) => {
    setQuery(q);
    if (q.length > 1) {
      // Mock search
      setResults([`Worker: ${q} - Welder`, `Client: ${q} Co.`, `Project: ${q} Site`].slice(0, 3));
    } else setResults([]);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-[#2A1143] px-4 py-2 pl-10 text-sm placeholder:text-white/40 focus:border-[#B388FF] focus:outline-none"
      />
      <span className="absolute left-3 top-2.5 text-white/40">🔍</span>
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-white/10 bg-[#2A1143] shadow-lg">
          {results.map((r, i) => (
            <div key={i} className="px-4 py-2 text-sm hover:bg-white/10">
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
