# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.2.0] - 2026-08-07
### Phase 3 (Steps 41-70) - Multi-Tenant Database Schema & Relations
**Build:** `20260807-3f777a7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 41-70 (30 tables)

#### Added
- **Step 41:** PostgreSQL Multi-Tenant Schema (`prisma/schema.prisma`) - PostgreSQL provider, RLS ready, `agencyId` tenant isolation, 30 tables
- **Step 42:** `agencies` - Agency company data (slug, logo, country, isActive) + relations to all tenant tables
- **Step 43:** `agency_settings` - Branding, billing, geofencing, payroll, compliance per agency
- **Step 44:** `roles` + `permissions` + `role_permissions` M2M - 5 system roles, RBAC matrix
- **Step 45:** `users` - Unified user directory (agencyId nullable for super_admin, CEO non-deletable, RLS indexed)
- **Step 46:** `user_profiles` - Extended bio, DOB, nationality, emergency contact
- **Step 47:** `departments` - Per-agency departments (unique agencyId+name)
- **Step 48:** `designations` - Titles (Welder, Electrician) per agency, linked to department
- **Step 49:** `skills` - Global skills catalog
- **Step 50:** `skill_categories` - Categories (Construction, Electrical)
- **Step 51:** `workers` - Main worker table (30+ fields: passport, akama, workPermit, grade A/B/C, blacklist, geofence, RLS)
- **Step 52:** `worker_contacts` - Emergency contacts per worker
- **Step 53:** `worker_documents` - Encrypted docs, expiry, watermark, verification
- **Step 54:** `worker_skills` M2M - Worker ↔ Skill with grade/years/certified
- **Step 55:** `clients` - Foreign employers (per agency, country, active)
- **Step 56:** `client_contacts` - HR/Project contacts per client
- **Step 57:** `job_sites` - Project sites (geofence lat/lng, radius, per client)
- **Step 58:** `contracts` - Business contracts (number, value, currency, status)
- **Step 59:** `job_demands` - Worker demands (quantity, billing/pay rate, profit auto, grade)
- **Step 60:** `worker_deployments` - Deployments (drag-and-drop, transfer, billing/pay)
- **Step 61:** `shift_schedules` - Shifts (Morning/Evening/Night, break, hazard)
- **Step 62:** `timesheets` - Weekly timesheets (status, locked, client signature)
- **Step 63:** `timesheet_entries` - Daily entries (regular/OT/night, GPS, geofenced)
- **Step 64:** `overtimes` - OT records (multiplier 1.5x/2.0x, hazard)
- **Step 65:** `payrolls` - Payroll runs (gross/deductions/net, bank file)
- **Step 66:** `payroll_details` - Per-worker payroll (hours, gross, net, payslip)
- **Step 67:** `invoices` - Client invoices (multi-currency, Stripe, status)
- **Step 68:** `invoice_items` - Invoice lines (hours * rate)
- **Step 69:** `audit_logs` - Comprehensive audit (agencyId nullable, action, resource)
- **Step 70:** `system_notifications` - Notifications (broadcast, priority, expiry)
- **Prisma Client:** `lib/db/prisma.ts` singleton + `setAgencyContext` / `withAgencyContext` RLS helpers
- **RLS Helper:** `lib/db/rls.ts` - Policies for 14 tenant tables, `agency_isolation` + `super_admin_bypass`
- **Build:** `npm run build` ✓ 9 routes · Prisma Client v5.14.0 generated · `npx prisma validate` ✓

#### Multi-Tenancy
- All tenant tables have `agencyId` FK → `agencies.id` with `onDelete: Cascade`
- Super Admin (CEO) `agencyId = null` → Unrestricted, bypass RLS via `RESET app.current_agency_id`
- Indexes on `agencyId`, `status`, `country`, `expiry` for performance
- RLS SQL examples in `lib/db/rls.ts` comments

#### Verified
- `npx prisma generate` ✓ (v5.14.0)
- `npx prisma validate` ✓
- `npm run build` ✓ Passed (9 routes)
- Gift Repo: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.1.0] - 2026-08-07
### Phase 2 (Steps 21-40) - Super Admin & Company Backbone
**Build:** `20260807-3f777a7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 21-40 (20 steps)

#### Added
- **Step 21 & 26:** `CEO` username unique Super Admin profile (`lib/ceo.ts`) - Samiullah Pk Founder metadata binding
- **Step 22:** Super Admin Role Provider (`lib/auth/roles.ts`) - 5 roles hierarchy, RBAC
- **Step 23:** Non-Deletable DB flag (`lib/db/types.ts`) - `isNonDeletable: true` for CEO
- **Step 24:** DB Firewall Rules (`lib/db/firewall.ts`) - BLOCK_CEO_DELETE/TRUNCATE/ROLE_DOWNGRADE + SQL triggers
- **Step 25:** Unrestricted Access (`lib/auth/permissions.ts`) - CEO wildcard `*` permission
- **Step 27:** Audit Log Backend (`lib/audit/logger.ts`) - CEO activity tracking in `audit_logs`
- **Step 28:** Super Admin Dashboard (`app/super-admin/layout.tsx` + `page.tsx`) - Distinct route, CEO identity bar, nav
- **Step 29:** Global Config Panel (`lib/config/global-config.ts` + `app/super-admin/config/page.tsx`) - System-wide config, CEO-only updates
- **Step 30:** 2FA Security (`lib/auth/2fa.ts`) - TOTP HMAC-SHA1, backup codes, CEO auto-enabled
- **Step 31:** Master Security Key (`lib/security/master-key.ts`) - 256-bit generation, rotation, hash verification
- **Step 32:** Recovery Codes (`lib/security/recovery.ts`) - AES-256 encrypted 10 codes, CEO decrypt
- **Step 33:** Impersonation (`lib/auth/impersonation.ts`) - CEO can view as agency_admin/client, 1hr session
- **Step 34:** Health Monitoring (`lib/monitoring/health.ts` + `app/super-admin/health/page.tsx`) - 6 services, overall status
- **Step 35:** CPU/Memory Tracking (`lib/monitoring/system-metrics.ts`) - Node os + process metrics, history, stress check
- **Step 36:** System Logs (`lib/logs/system-log.ts`) - Centralized LOG_LEVEL, 500 max, filtered query
- **Step 37:** Broadcast System (`lib/notifications/broadcast.ts`) - CEO broadcast to all/agency/role, priority, expiry
- **Step 38:** Feature Flags (`lib/features/flags.ts` + `app/super-admin/features/page.tsx`) - 7 flags, CEO toggle, rollout %
- **Step 39:** License & Subscription (`lib/billing/license.ts`) - 4 plans (starter/growth/enterprise/custom), limits, status
- **Step 40:** DB Backup (`lib/db/backup.ts` + `app/super-admin/backup/page.tsx`) - CEO trigger, 3s simulate, file + download URL

#### Design
- Super Admin Routes: `/super-admin`, `/super-admin/config`, `/super-admin/health`, `/super-admin/features`, `/super-admin/backup`
- Build: 9 routes (5 super-admin) · `npm run build` ✓

---

## [v1.0.0] - 2026-08-07
### Phase 1 (Steps 1-20) - Foundation
**Build:** `20260807-c18d3ee` | **Author:** iNAYATechLab Inc. (Samiullah Pk)

#### Added
- **GitHub & Security (Steps 1-10):** Private repo `manpower-agency-saas`, AES-256-CBC token encryption, secure envs, branch protection, Arena webhook
- **Framework (Steps 11-20):** Next.js 14, TypeScript Strict, ESLint+Prettier, Tailwind, Shadcn UI, Branding, Design System, ThemeProvider
- **Deploy Alternatives:** `vercel.json`, `pages.yml`, `netlify.toml`, `DEPLOY_ALTERNATIVES.md` (Cloudflare Pages, GitHub Pages)
- Fix: `lib/version.ts` strict TS error resolved for Node 24

#### Verified
- `npm run build` ✓ Passed · Gift Repo: https://github.com/iNAYATechLab/manpower-agency · Release v1.0.0

---

## Unreleased
### [v1.3.0] - Phase 4 (Steps 71-90) - Planned
- Smart Worker Onboarding & Document Expiry Alerts

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
