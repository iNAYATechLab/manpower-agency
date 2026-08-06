/**
 * Step 186: Client Company List Data Table
 */
"use client";
import Link from "next/link";
import { MOCK_CLIENTS } from "@/lib/clients/types";
import { Button } from "@/components/ui/button";

export function ClientTable() {
  return (
    <div className="overflow-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-[#2A1143] text-white/60">
          <tr>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Country</th>
            <th className="p-3 text-left">Active Workers</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_CLIENTS.map((c) => (
            <tr key={c.id} className="border-t border-white/5 hover:bg-white/5">
              <td className="p-3">
                <p className="font-medium">{c.companyName}</p>
                <p className="text-xs text-white/40">{c.email}</p>
              </td>
              <td className="p-3 font-mono text-xs">{c.companyCode}</td>
              <td className="p-3">{c.country}</td>
              <td className="p-3">{c.activeWorkers}</td>
              <td className="p-3">★ {c.rating}</td>
              <td className="p-3">
                <Link href={`/agency/clients/${c.id}`}>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
