/**
 * Steps 191-196, 200-205: Timesheet Management Overview
 */
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DailyShiftTable } from "@/components/timesheet/daily-shift-table";
import { WeeklyRoster } from "@/components/timesheet/weekly-roster";
import { HourlyGrid } from "@/components/timesheet/hourly-grid";
import { BulkEntryGrid } from "@/components/timesheet/bulk-entry";
import { OTFields } from "@/components/timesheet/ot-fields";
import { GPSValidation } from "@/components/timesheet/gps-validation";
import { HolidayOverride } from "@/components/timesheet/holiday-override";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TimesheetsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Home", href: "/agency" }, { label: "Timesheets" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Timesheets & Overtime Automation (Steps 191-210)</h1>
          <p className="text-sm text-white/60">Shift tables, Rosters, Hourly grids, OT 1.5x/2.0x, Geofencing</p>
        </div>
        <Link href="/agency/timesheets/ts_001">
          <Button>View Sample Timesheet</Button>
        </Link>
      </div>

      <DailyShiftTable />
      <WeeklyRoster />
      <HourlyGrid />
      <BulkEntryGrid />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#2A1143] p-4">
          <OTFields />
        </div>
        <GPSValidation />
      </div>

      <HolidayOverride date="2026-08-15" />
      <HolidayOverride date="2026-08-07" />
    </div>
  );
}
