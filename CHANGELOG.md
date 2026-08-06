# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.8.0] - 2026-08-07
### Phase 9 (Steps 191-210) - Timesheet & Overtime Automation
**Build:** `20260807-d091f2c` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 191-210 (20 steps)

#### Added
- **191:** Daily Shift Time Table UI (`components/timesheet/daily-shift-table.tsx` - Morning/Evening/Night, break, night allowance)
- **192:** Weekly Roster Calendar View (`weekly-roster.tsx` - 7 days x workers, M/—)
- **193:** Hourly Timesheet Input Grid Table (`hourly-grid.tsx` - 5 days x 3 workers, inputs, total)
- **194:** Worker-based Time Entry Interface (`worker-entry.tsx` - regular/OT + night/hazard + calculateOTPay)
- **195:** Bulk Timesheet Entry Grid for Supervisors (`bulk-entry.tsx` - Fill All 8h, 5 workers)
- **196:** Regular vs Overtime Separate Fields (`ot-fields.tsx` - distinct inputs)
- **197:** 1.5x & 2.0x Overtime Multiplier Backend (`lib/timesheet/calculations.ts` - first 2h 1.5x, beyond 2.0x)
- **198:** Night Shift Allowance Logic ( +$5 if isNightShift)
- **199:** Hazard Pay Dynamic Field ( +$10 if isHazard)
- **200:** GPS Clocking Validation Logic (`lib/timesheet/validation.ts` - validateClocking)
- **201:** Geofencing Radius Check Algorithm (Haversine, 100m)
- **202:** Holiday Rate Override Policy (2.0x for all hours, PUBLIC_HOLIDAYS_2026)
- **203:** Timesheet Editing History & Tracking Handler (`lib/timesheet/history.ts` + `history-view.tsx`)
- **204:** Dispute Flagging System (`lib/timesheet/dispute.ts` + `dispute-system.tsx` - open/resolved)
- **205:** Timesheet Submission Workflow (`lib/timesheet/workflow.ts` - draft → submitted)
- **206:** Client Portal Pending Timesheets List (`components/timesheet/client-pending.tsx` - 2 pending)
- **207:** Client Approve All Bulk Action UI (`bulk-approve.tsx` - DigitalSignature + approve)
- **208:** Rejection with Comment Flow (`rejection-flow.tsx` - comment, rejected)
- **209:** Canvas Digital Signature Component (`digital-signature.tsx` - 400x150 canvas, save)
- **210:** Locked Status Logic (approved → locked, isLocked, Read-Only, no edits)

#### Routes
- `/agency/timesheets` — Overview (Daily, Weekly, Hourly, Bulk, OT, GPS, Holiday)
- `/agency/timesheets/[id]` — Details (Worker Entry, History, Dispute, Workflow, Signature)
- `/client/timesheets` — Client Portal (Pending, Bulk Approve, Rejection)

#### Verified
- `npm run build` ✓ 23 routes (3 timesheet routes + 21 previous + middleware 28.6 kB)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.7.0] - 2026-08-07
### Phase 8 (Steps 171-190) - Client & Contact Management
**Build:** `20260807-d091f2c` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 171-190 (20 steps)

#### Added
- **171-190:** Foreign Client Onboarding (Company, Registered Name, Contact, Job Sites, GPS, Contract Upload, Calendar, Billing/Pay, Profit Margin, Demand Quota, Progress Bar, Drag-Drop Deployment, Bulk Assignment, Site Transfer, Client List, Details View, Active Workers Tab, Contract Expiry Alert, Feedback & Rating)

---

## [v1.6.0] - 2026-08-07
### Phase 7 (Steps 151-170) - Worker Onboarding & Skill Directory
**Build:** `20260807-c6ee6bb` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 151-170 (20 steps)

---

## [v1.5.0] - 2026-08-07
### Phase 6 (Steps 131-150) - Main Dashboard & Navigation UI
**Build:** `20260807-53974f9` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 131-150 (20 steps)

---

## [v1.4.0] - 2026-08-07
### Phase 5 (Steps 101-130) - Authentication & 2FA Security
**Build:** `20260807-7681c7e` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 101-130 (30 steps)

---

## [v1.3.0] - 2026-08-07
### Phase 4 (Steps 71-100) - Security, RLS & Data Isolation
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 71-100 (30 steps)

---

## [v1.2.0] - 2026-08-07
### Phase 3 (Steps 41-70) - Multi-Tenant Database Schema & Relations
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 41-70 (30 tables)

---

## [v1.1.0] - 2026-08-07
### Phase 2 (Steps 21-40) - Super Admin & Company Backbone
**Build:** `20260807-3f777a7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 21-40 (20 steps)

---

## [v1.0.0] - 2026-08-07
### Phase 1 (Steps 1-20) - Foundation
**Build:** `20260807-c18d3ee` | **Author:** iNAYATechLab Inc. (Samiullah Pk)

---

## Unreleased
### [v1.9.0] - Phase 10 (Steps 211-230) - Planned
- Payroll & Salary Generation

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
