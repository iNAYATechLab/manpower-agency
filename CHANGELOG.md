# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.5.0] - 2026-08-07
### Phase 6 (Steps 131-150) - Main Dashboard & Navigation UI
**Build:** `20260807-7681c7e` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 131-150 (20 steps)

#### Added
- **131:** Global App Sidebar (`components/app-sidebar.tsx` - collapsible, role-aware, #2A1143)
- **132:** Dynamic Navigation Menu System (`lib/navigation.ts` - NAV_CONFIG 16 items, getNavForRole, hierarchy)
- **133:** Responsive Mobile Drawer (`components/mobile-drawer.tsx` - hamburger, overlay, 64w)
- **134:** User Profile Header & Dropdown (`components/header.tsx` - avatar, role badge, ThemeToggle, logout)
- **135:** Notification Bell & Real-time Pop-up (`components/notification-bell.tsx` - 3 mock, unread badge, dropdown)
- **136:** Super Admin Overview Dashboard (Enhanced `app/super-admin/page.tsx` - hero, stats, audit, health)
- **137:** Agency Health Visualization Card (`components/dashboard/agency-health-card.tsx` - CPU/Memory bars)
- **138:** Agency Main Management Dashboard (`app/agency/page.tsx` + `layout.tsx` - metrics grid, deployments)
- **139:** Total Active Workers Metric Card (`components/dashboard/metric-card.tsx` - 124, ↑12%)
- **140:** Deployed Workers Metric Card (87, ↑8%)
- **141:** Idle/Bench Workers Counter (37)
- **142:** Active Client Contracts Widget (12)
- **143:** Pending Timesheets Count (9)
- **144:** Overdue Invoices Revenue Alert (3 • $12,400, red accent)
- **145:** Client Dashboard Interface (`app/client/page.tsx` + `layout.tsx` - demands, approvals, invoices)
- **146:** Field Supervisor Mobile Dashboard (`app/supervisor/page.tsx` + `layout.tsx` - attendance, geofenced, SOS)
- **147:** Worker Personal Dashboard (`app/worker/page.tsx` + `layout.tsx` - hours, payslip, expiry, SOS)
- **148:** System Wide Search Bar (`components/ui/search.tsx` - GlobalSearch, mock results)
- **149:** Breadcrumb Navigation (`components/ui/breadcrumb.tsx` - Home / ... hierarchy)
- **150:** Skeleton & Spinner (`components/ui/skeleton.tsx` - Skeleton, Spinner, CardSkeleton, pulse)

#### Layouts & Navigation
- **Global Layouts:** `/agency`, `/client`, `/supervisor`, `/worker` each with `AppSidebar` + `Header` + `NotificationBell` + `GlobalSearch`
- **Design System:** Consistent s1 `#1D0B2E`, s2 `#E5B84B`, s3 `#2A1143`, s5 `#B388FF` across all dashboards
- **Middleware:** Already handles `/agency/*`, `/client/*`, `/supervisor/*`, `/worker/*` guards (106-111)

#### Verified
- `npm run build` ✓ 17 routes (4 API + 8 dashboards + middleware 28.6 kB)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.4.0] - 2026-08-07
### Phase 5 (Steps 101-130) - Authentication & 2FA Security
**Build:** `20260807-7681c7e` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 101-130 (30 steps)

#### Added
- **101-130:** JWT Session (HS256), Sign-In/Sign-Up/Refresh/Reset APIs, Bcrypt scrypt, RBAC, 5 Guards, 2FA QR/TOTP, SMS OTP, Lockout, Session Timeout, Device Block, IP Block, Brute-Force, Login Tracking, Secure Cookies, CSRF, CORS, Rate Limiter, Verification, OAuth, Guest Block, Audit Logger + Central Middleware

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

#### Added
- **41-70:** 30 Tables PostgreSQL multi-tenant + Prisma RLS helpers

---

## [v1.1.0] - 2026-08-07
### Phase 2 (Steps 21-40) - Super Admin & Company Backbone
**Build:** `20260807-3f777a7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 21-40 (20 steps)

#### Added
- **21-40:** CEO Non-Deletable, Firewall, Dashboard, 2FA, Master Key, etc.

---

## [v1.0.0] - 2026-08-07
### Phase 1 (Steps 1-20) - Foundation
**Build:** `20260807-c18d3ee` | **Author:** iNAYATechLab Inc. (Samiullah Pk)

#### Added
- **1-20:** GitHub, AES-256, Next.js 14, Design System, Gift Automation, IVCS

---

## Unreleased
### [v1.6.0] - Phase 7 (Steps 151-180) - Planned
- Worker Onboarding & Skill Management UI

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
