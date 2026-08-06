# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.3.0] - 2026-08-07
### Phase 4 (Steps 71-100) - Security, RLS & Data Isolation
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 71-100 (30 steps)

#### Added
- **Step 71:** RLS Activate (`lib/db/rls-activate.sql`) - Enable RLS on 17 tenant tables + `is_ceo_bypass()` function
- **Step 72:** `agencies` RLS (`agencies_isolation` + `ceo_bypass` policies)
- **Step 73:** `users` RLS (agencyId isolation, CEO sees all including agencyId NULL)
- **Step 74:** CEO Bypass Override Logic (`is_ceo_bypass()` — empty `app.current_agency_id` = unrestricted)
- **Step 75:** `workers` Tenant Isolation (agencyId = current_setting)
- **Step 76:** `clients` RLS
- **Step 77:** `contracts` Security Policy
- **Step 78:** `job_sites` Data Isolation
- **Step 79:** `timesheets` RLS
- **Step 80:** `payrolls` Safety Rules (isolation + write safety for agency_admin/CEO)
- **Step 81:** `invoices` Security Policy
- **Step 82:** `compliance_documents` RLS (worker_documents via workers join, sensitive docs)
- **Step 83:** `agency_id` FK Indexes (`lib/db/indexes.sql` - 12 agencyId indexes)
- **Step 84:** Email/Username Unique Indexes (users, agencies, roles)
- **Step 85:** Passport/NID Duplicate Indexes (unique where not null, composite agency+passport, expiry indexes)
- **Step 86:** PK & Cascade Delete (cuid PK, FK `onDelete: Cascade` for agency parent)
- **Step 87:** Migration Script Compiled (`prisma/migrations/20260807000000_init/migration.sql` - 8 enums, 30 tables)
- **Step 88:** Supabase/PostgreSQL Migration Ready (`npx prisma migrate deploy` + Supabase SQL Editor compatible)
- **Step 89:** Seed Data Script (`prisma/seed.ts` - roles, permissions, CEO, agency, skills)
- **Step 90:** Test Agency & Dummy Workers (Test Agency Co., 5 workers WRK-2026-001..005, NEOM client/site/contract/demand)
- **Step 91:** Performance Test (`lib/db/performance.ts` - 3 queries, duration, slow threshold 200ms)
- **Step 92:** Slow-Query Indexes (14 indexes: status, blacklisted, timestamp, country, etc. + pg_stat_statements)
- **Step 93:** Central Storage Buckets (`lib/storage/config.ts` - private-documents, public-assets, temp-uploads)
- **Step 94:** Storage Security Policies (private: AES-256, public: open, temp: 24h auto-delete)
- **Step 95:** Private/Public Permissions (`canAccessBucket`, `isPrivateBucket`)
- **Step 96:** Encrypted Upload (`lib/storage/upload.ts` - AES-256-CBC encrypt private bucket, mime/size check)
- **Step 97:** Image Compression (`lib/storage/compression.ts` - resize 1024, quality 80, webp/jpeg)
- **Step 98:** Watermarking (`lib/storage/watermark.ts` - diagonal 15% opacity, confidential preview URL)
- **Step 99:** Signed URL (`lib/storage/signed-url.ts` - HMAC SHA256, 1hr expiry, verify)
- **Step 100:** Backup Automation Tune (`lib/db/backup-automation.ts` - daily 02:00 UTC, retention 30d, health 95% success)

#### Security
- 17 Tables RLS Enabled + 12 Policies + CEO Bypass (empty agency_id)
- 20+ Indexes for RLS performance + Duplicate prevention + Slow-query tracking
- Storage: 3 Buckets with encryption + watermark + signed URL (HMAC)
- Backup: Daily automation tuned, 30d retention, success rate tracking

#### Verified
- `npx prisma validate` ✓
- `npx prisma generate` ✓ v5.14.0
- `npm run build` ✓ 9 routes
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.2.0] - 2026-08-07
### Phase 3 (Steps 41-70) - Multi-Tenant Database Schema & Relations
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 41-70 (30 tables)

#### Added
- **41-70:** 30 Tables PostgreSQL multi-tenant (agencies, agency_settings, roles, permissions, users, user_profiles, departments, designations, skills, skill_categories, workers, worker_contacts, worker_documents, worker_skills, clients, client_contacts, job_sites, contracts, job_demands, worker_deployments, shift_schedules, timesheets, timesheet_entries, overtimes, payrolls, payroll_details, invoices, invoice_items, audit_logs, system_notifications) + Prisma RLS helpers

#### Verified
- `npx prisma validate` ✓ · `npm run build` ✓

---

## [v1.1.0] - 2026-08-07
### Phase 2 (Steps 21-40) - Super Admin & Company Backbone
**Build:** `20260807-3f777a7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 21-40 (20 steps)

#### Added
- **21-40:** CEO Non-Deletable, Firewall, Unrestricted, Audit Log, Dashboard, Global Config, 2FA, Master Key, Recovery, Impersonation, Health, CPU/Memory, System Log, Broadcast, Feature Flags, License, Backup

---

## [v1.0.0] - 2026-08-07
### Phase 1 (Steps 1-20) - Foundation
**Build:** `20260807-c18d3ee` | **Author:** iNAYATechLab Inc. (Samiullah Pk)

#### Added
- **1-20:** GitHub, AES-256, Next.js 14, Design System, Gift Automation, IVCS, Deploy Alternatives

---

## Unreleased
### [v1.4.0] - Phase 5 (Steps 101-130) - Planned
- Smart Worker Onboarding UI & Skill Management

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
