# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v2.1.0] - 2026-08-07
### Phase 12 (Steps 251-270) - Analytics, Logger & Export Engine
**Build:** `20260807-1bfa000` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 251-270 (20 steps)

#### Added
- **251:** Project Profitability Dashboard Chart (`components/analytics/profitability-chart.tsx` - 3 projects, bars)
- **252:** Revenue vs Payout Chart Visualization (`revenue-payout-chart.tsx` - 4 months, dual bars)
- **253:** Worker Utilization Rate Donut Chart (`utilization-donut.tsx` - Active 87 vs Idle 37, conic-gradient)
- **254:** Country-wise Worker Distribution Map UI (`country-map.tsx` - SA 87, QA 42, AE 15, circles)
- **255:** Skill Category-wise Manpower Distribution Chart (`skill-distribution.tsx` - 4 skills, bars)
- **256:** Invoice Overdue Receivable Chart (`overdue-chart.tsx` - Paid 85k, Overdue 12.4k, Pending 42k)
- **257:** React Custom Chart Component Binder (`lib/analytics/charts.ts` - 6 data generators)
- **258:** All-Data Excel (XLSX) Exporter Engine (`lib/export/xlsx.ts` - generateXLSXData, downloadXLSX)
- **259:** All-Data CSV Exporter (`lib/export/csv.ts` - generateCSV, downloadCSV)
- **260:** PDF Report Printer Engine Setup (`lib/export/pdf.ts` - generatePDFReport HTML, printPDFReport)
- **261:** Zod Schema Input Validation (`lib/validation/zod-schemas.ts` - validateWorkerOnboarding, Client, Timesheet)
- **262:** Frontend Form Error Processor (`lib/validation/form-errors.ts` - processFormErrors, hasErrors)
- **263:** Audit Log Table UI (`components/analytics/audit-log-table.tsx` - 10 logs, time, user, action)
- **264:** Data Modification History Diff Viewer (`diff-viewer.tsx` - old vs new, yellow highlight)
- **265:** User IP & Device Tracking Visual (`ip-tracking.tsx` - login history, success/fail)
- **266:** System Error Tracking & Logger (`lib/logger/error-tracking.ts` - trackError, count)
- **267:** Performance Metrics Logger (`lib/logger/performance.ts` - logPerformance, avg)
- **268:** Custom Representative Report Filter (`components/analytics/report-filter.tsx` - agency, date, status)
- **269:** Auto-Generated Weekly Summary Email (`lib/email/weekly-summary.ts` - subject + HTML table)
- **270:** Client Performance Report Generator (`lib/reports/client-performance.ts` - 2 mock reports, avgRating, onTimeRate)

#### Routes
- `/agency/analytics` — Full Analytics Dashboard (251-270) + Export (258-260) + Validation (261-262) + Audit (263-265) + Logger (266-267) + Reports (268-270)

#### Verified
- `npm run build` ✓ 29 routes (1 analytics + 28 previous + middleware 28.7 kB)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v2.0.0] - 2026-08-07
### Phase 11 (Steps 231-250) - Compliance, Document & Cloud Notification
**Build:** `20260807-1bfa000` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 231-250 (20 steps)

#### Added
- **231-250:** Passport Uploader & Validator, Akama Processor, Compliance Tracker, Passport/Work Permit Alerts, Cron 30/60d, Medical Catalog, Insurance Catalog, BMET Tracking, SOS Messaging, Real-time Pusher/Firebase, Resend/SendGrid, Twilio SMS, Notification Center, Email Preferences, Read/Unread Toggle, Queue Processor, Retry Service, Download Permission Checker, Watermarked Preview Viewer

---

## [v1.9.0] - 2026-08-07
### Phase 10 (Steps 211-230) - Payroll & Client Invoicing
**Build:** `20260807-4d4ed55` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 211-230 (20 steps)

---

## [v1.8.0] - 2026-08-07
### Phase 9 (Steps 191-210) - Timesheet & Overtime Automation
**Build:** `20260807-2667543` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 191-210 (20 steps)

---

## [v1.7.0] - 2026-08-07
### Phase 8 (Steps 171-190) - Client & Contact Management
**Build:** `20260807-d091f2c` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 171-190 (20 steps)

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
### [v2.2.0] - Phase 13 (Steps 271-285) - Planned
- Final Polish, Testing & Deployment

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
