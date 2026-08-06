# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.7.0] - 2026-08-07
### Phase 8 (Steps 171-190) - Client & Contact Management
**Build:** `20260807-c6ee6bb` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 171-190 (20 steps)

#### Added
- **171:** Foreign Client Company Onboarding Form (`app/agency/clients/onboarding/page.tsx` - multi-section)
- **172:** Company Profile & Registered Name Input (`components/clients/onboarding/company-profile.tsx`)
- **173:** Contact Person & Official Contact Form (`contact-form.tsx` - HR Manager)
- **174:** Multiple Job Sites UI (`job-sites-form.tsx` - add/remove sites)
- **175:** Site Location & GPS Coordinates (latitude/longitude for Geofencing)
- **176:** Contract Agreement Uploader (PDF file)
- **177:** Contract Start/End Calendar UI (date pickers)
- **178:** Client Billing Rate Setup (`components/clients/billing-rates.tsx` - $/hr)
- **179:** Worker Pay Rate Configuration ( $/hr)
- **180:** Automated Profit Margin Counter (`calcProfitMargin` — `billing - pay` auto)
- **181:** Job Demand Quota Onboarding (`job-demand-form.tsx` - quantity, progress bar)
- **182:** Real-time Progress Bar (filled/quantity %, Fill +1 button)
- **183:** Drag-and-Drop Deployment Assignment (`drag-drop-deployment.tsx` - bench ↔ site, checkbox simulated)
- **184:** Bulk Worker Site Assignment (Bulk Assign All button)
- **185:** Site Transfer & Release Process (Release ← button, transferFromId)
- **186:** Client Company List Data Table (`components/clients/client-table.tsx` - 3 clients, Code, Country, Rating)
- **187:** Client Details View (`app/agency/clients/[id]/page.tsx` - profile, contract, workers)
- **188:** Client-wise Active Workers Tab (Deployed workers table)
- **189:** Contract Expiry Alert Card (`contract-expiry-card.tsx` - <90 days, high/medium urgency)
- **190:** Client Feedback & Rating System (`feedback-system.tsx` - 5★, comment, submit)

#### Routes
- `/agency/clients` — Client List + Expiry Alerts
- `/agency/clients/onboarding` — Foreign Client Onboarding (Company, Contacts, Sites, Contract, Billing/Pay, Demand, Deployment)
- `/agency/clients/[id]` — Client Details + Active Workers + Feedback

#### Verified
- `npm run build` ✓ 21 routes (3 client routes + 19 previous + middleware)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.6.0] - 2026-08-07
### Phase 7 (Steps 151-170) - Worker Onboarding & Skill Directory
**Build:** `20260807-c6ee6bb` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 151-170 (20 steps)

#### Added
- **151-170:** Multi-step Form (10 steps), Personal, Passport, Medical, Skill Catalog, Grade A/B/C, Language, Bank, Emergency, Photo, Certificate, Data Table, Column Sort, Filters, Print/PDF, Profile View, Performance History, Complaint, Blacklist

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
### [v1.8.0] - Phase 9 (Steps 191-210) - Planned
- Timesheet, Overtime & Geofencing

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
