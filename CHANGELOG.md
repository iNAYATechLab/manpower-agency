# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.6.0] - 2026-08-07
### Phase 7 (Steps 151-170) - Worker Onboarding & Skill Directory
**Build:** `20260807-53974f9` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 151-170 (20 steps)

#### Added
- **151:** Multi-step Form (`app/agency/workers/onboarding/page.tsx` - 10 steps, progress bar, state)
- **152:** Personal Information Input (`components/workers/onboarding/personal-info.tsx` - 6 fields, EN/BN)
- **153:** Passport Info & Expiry Entry (`passport-form.tsx` - 6 fields, visa)
- **154:** Health & Medical Fitness Input (`medical-form.tsx` - status, expiry, blood group)
- **155:** Skill Catalog Selector (`skill-selector.tsx` - 5 skills, checkbox, category)
- **156:** Professional Grading Dropdown (`grade-dropdown.tsx` - Grade A/B/C)
- **157:** Language & Experience UI (`language-experience.tsx` - 5 langs, years)
- **158:** Bank Account & Payment Details (`bank-details.tsx` - bank, IBAN, SWIFT)
- **159:** Emergency Contact Form (`emergency-contact.tsx` - name, relation, phone, address)
- **160:** Photo Upload & Cropping UI (`photo-upload.tsx` - preview, file input, remove)
- **161:** Digitized Skill Certificate Uploader (`certificate-upload.tsx` - title, file, list)
- **162:** All-Workers Data Table (`components/workers/data-table.tsx` - 5 workers, 6 columns)
- **163:** Column Customization & Sorting (`data-table.tsx` - visibleCols, sort header)
- **164:** Skill Filter Dropdown (`filter-dropdown.tsx` - Welder, Electrician etc.)
- **165:** Location/Project Filter (`filter-dropdown.tsx` - Bench, NEOM Site A)
- **166:** Print & PDF Download (`print-pdf.tsx` - window.print + /api/workers/[id]/pdf)
- **167:** Worker Profile Details View (`app/agency/workers/[id]/page.tsx` - avatar, passport, bank, docs)
- **168:** Performance Rating History Tab (`performance-history.tsx` - 3 reviews, ★ rating)
- **169:** Complaint Form (`complaint-form.tsx` - reason, details, submit)
- **170:** Blacklist/Deactivate Button (`blacklist-button.tsx` - reason, toggle, red theme)


#### Routes
- `/agency/workers` — All Workers Table + Filters
- `/agency/workers/onboarding` — 10-step Multi-step Onboarding
- `/agency/workers/[id]` — Profile Details + Performance + Complaint + Blacklist

#### Verified
- `npm run build` ✓ 19 routes (3 worker routes + 17 previous + middleware 28.6 kB)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.5.0] - 2026-08-07
### Phase 6 (Steps 131-150) - Main Dashboard & Navigation UI
**Build:** `20260807-53974f9` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 131-150 (20 steps)

#### Added
- **131-150:** Global Sidebar, Dynamic Nav (16 items), Mobile Drawer, Header Dropdown, Notification Bell, Super Admin Overview, Agency Health Card, Agency Dashboard, 6 Metric Cards, Client Dashboard, Supervisor Mobile, Worker Personal, Search, Breadcrumb, Skeleton

---

## [v1.4.0] - 2026-08-07
### Phase 5 (Steps 101-130) - Authentication & 2FA Security
**Build:** `20260807-7681c7e` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 101-130 (30 steps)

#### Added
- **101-130:** JWT Session, Sign-In/Sign-Up/Refresh/Reset APIs, Bcrypt scrypt, RBAC, 5 Guards, 2FA QR/TOTP, SMS OTP, Lockout, Session Timeout, Device Block, IP Block, Brute-Force, Login Tracking, Secure Cookies, CSRF, CORS, Rate Limiter, Verification, OAuth, Guest Block, Audit Logger + Central Middleware

---

## [v1.3.0] - 2026-08-07
### Phase 4 (Steps 71-100) - Security, RLS & Data Isolation
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 71-100 (30 steps)

#### Added
- **71-100:** RLS Activate (17 tables), 12 Policies, Indexes, Migration, Seed, Performance, Storage Buckets, Encryption, Watermark, Signed URL, Backup Tune

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
### [v1.7.0] - Phase 8 (Steps 171-200) - Planned
- Client, Project & Contract Tracking + Deployment

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
