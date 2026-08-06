# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v2.0.0] - 2026-08-07
### Phase 11 (Steps 231-250) - Compliance, Document & Cloud Notification
**Build:** `20260807-4d4ed55` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 231-250 (20 steps)

#### Added
- **231:** Passport File Uploader & Validator (`lib/compliance/passport.ts` - PDF/JPG/PNG, 10MB, filename check)
- **232:** Akama / Work Permit File Processor (`lib/compliance/akama.ts` - daysUntilExpiry)
- **233:** Smart Compliance Date Tracker Algorithm (`lib/compliance/tracker.ts` - valid/expiring_soon/critical/expired)
- **234:** Passport Expiry Automated Alert Service (`lib/compliance/alerts.ts` - passport alert)
- **235:** Work Permit Expiry Automated Alert (work permit alert)
- **236:** 30 and 60 Days Cron-Job Scheduler (`lib/compliance/cron.ts` - daily 02:00/03:00 UTC)
- **237:** Medical Report Digital Catalog (`lib/compliance/medical.ts` - fit/unfit/pending, expiry)
- **238:** Insurance Policy Document Catalog (`lib/compliance/insurance.ts` - policyNumber, coverage)
- **239:** BMET & Immigration Permit Tracking Module (`lib/compliance/bmet.ts` - pending/approved)
- **240:** Emergency SOS Messaging Backend (`lib/compliance/sos.ts` - active/acknowledged, triggerSOS)
- **241:** Pusher/Firebase Real-time Notification System (`lib/notifications/realtime.ts` - subscribe/publish)
- **242:** Resend/SendGrid Email Dispatcher (`lib/notifications/email-dispatcher.ts` - sendEmail)
- **243:** Twilio/SMS Gateway API Link (`lib/notifications/sms-gateway.ts` - sendSMS)
- **244:** System Notification Center Page (`app/agency/notifications/page.tsx` - list, toggle, queue)
- **245:** User's Email Preference Option (`lib/notifications/preferences.ts` - marketing, complianceAlerts etc.)
- **246:** Notification Read/Unread Status Toggle (`lib/notifications/read-status.ts` - toggleReadStatus)
- **247:** Background Queue Processor (`lib/queue/processor.ts` - enqueue, processQueue, 4 job types)
- **248:** Failed Email Retry Backend Service (`lib/queue/retry.ts` - retryFailedJobs)
- **249:** Document Download Permission Checker (`lib/storage/permission-checker.ts` - CEO bypass, agency, worker)
- **250:** Watermarked Document Preview Viewer UI (`components/compliance/watermarked-viewer.tsx` - diagonal confidential, preview)

#### Routes
- `/agency/compliance` — Compliance Overview (231-240, 250) + Watermarked Viewer
- `/agency/notifications` — Notification Center (241-248, 244) + Preferences + Queue

#### Verified
- `npm run build` ✓ 28 routes (2 new compliance/notification + 26 previous + middleware 28.7 kB)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.9.0] - 2026-08-07
### Phase 10 (Steps 211-230) - Payroll & Client Invoicing
**Build:** `20260807-4d4ed55` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 211-230 (20 steps)

#### Added
- **211-230:** Auto Payroll Engine, Basic Salary, OT Calc, Advance Deduction, Net Payable, Bulk Payroll, PDF Pay-slip, Template, Bank CSV, Worker Portal, Invoice Engine, Billing Hours×Rate, VAT, Service Charge, Multi-Currency, Exchange API, Branded PDF, Auto-Email, Status Tracker, Stripe/PayPal

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
### [v2.1.0] - Phase 12 (Steps 251-280) - Planned
- Advanced Analytics & Profitability

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
