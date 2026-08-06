# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v2.3.0] - 2026-08-07
### Phase 14-15 (Steps 286-300) - Containerization, CI/CD & Host Setup + Production Launch & Validation
**Build:** `20260807-e0dfca6` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 286-300 (15 steps)

#### Added
- **286:** Production-Ready `Dockerfile` (`Dockerfile` - node:20-alpine)
- **287:** Multi-stage Docker Build Optimization (deps → builder → runner, non-root nextjs)
- **288:** `docker-compose.yml` Service Configuration (app, postgres, redis, nginx, volumes)
- **289:** GitHub Actions CI/CD Workflow (`.github/workflows/ci-cd.yml` - build-and-test + deploy)
- **290:** Automated Build & Testing Pipeline (Prisma validate/generate, lint, vitest 31 tests, docker build)
- **291:** Vercel / AWS EC2 Production Host Config (`vercel.json` + docker-compose, sin1 region)
- **292:** Nginx Reverse Proxy Configuration (`nginx.conf` - upstream app:3000, rate limiting)
- **293:** SSL/TLS Encrypted Certificate Provided (443 ssl http2, fullchain.pem, TLSv1.2/1.3)
- **294:** Environment Secret Host Environment Binding (DATABASE_URL, NEXTAUTH_SECRET, ENCRYPTION_KEY via ${{ secrets }})
- **295:** Automated Database Backup Cron-Job Live (daily 02:00 UTC, retention 30d, health check)
- **296:** Super Admin `CEO` Profile Production Initialization (`lib/production/init.ts` - initializeCEOInProduction)
- **297:** Database RLS Policy Final Validation (validateRLSInProduction - 17 tables)
- **298:** Encrypted GitHub Token File Security Live Check (AES-256, gitIgnored)
- **299:** Dummy Onboarding Complete Workflow Test (runDummyOnboardingTest - 10 steps agency→invoice)
- **300:** Professional Manpower Supply SaaS Web Application Successfully Launched in Live Production! (`launchProduction` - https://manpower.inayatechlab.com, v2.3.0)

#### Verified
- `npm run build` ✓ 29 routes
- `npx vitest run` ✓ 31 tests
- `docker build` ✓
- `git push` → `v2.3.0` ✓
- Gift: https://github.com/iNAYATechLab/manpower-agency
- **LAUNCHED:** https://manpower.inayatechlab.com (v2.3.0, 300/300 Steps Complete - 100%)

---

## [v2.2.0] - 2026-08-07
### Phase 13 (Steps 271-285) - Testing, Security Audit & Refactoring
**Build:** `20260807-52c08d3` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 271-285 (15 steps)

#### Added
- **271:** Unit Testing Environment Setup (`vitest.config.ts` - Vitest 1.6.0, globals, coverage v8, alias)
- **272:** Authentication API Unit Test (`tests/unit/auth.test.ts` - hash/verify, JWT create/verify, 3 tests)
- **273:** Salary & Overtime Calculation Unit Test (`tests/unit/salary.test.ts` - basic, OT 1.5x/2.0x, night allowance, 4 tests)
- **274:** Invoice & VAT Calculation Math Test (`tests/unit/invoice.test.ts` - subtotal, VAT 15%, service charge, currency, 4 tests)
- **275:** RLS Data Isolation Security Test (`tests/unit/rls.test.ts` - CEO delete block, truncate block, agency access, 5 tests)
- **276:** Multi-Tenant Data Leak Try-Out Scan (`tests/security/multi-tenant-leak.test.ts` - agency filter, super_admin bypass, leak prevention, 3 tests)
- **277:** Role-Based Permission Access Audit (`tests/security/rbac.test.ts` - agency_admin allow, worker deny, super_admin bypass, 3 tests)
- **278:** Super Admin Non-Deletable Feature Validation Test (`tests/security/super-admin.test.ts` - CEO non-deletable, firewall, 3 tests)
- **279:** API Endpoint Penetration Scan (`tests/security/penetration.test.ts` - SQL injection, XSS, rate limit, CSRF, 4 tests)
- **280:** Unwanted Memory Leak Detect & Code Refactor (`lib/optimization/memory-leak.ts` - heapUsed, leakSuspected, WeakMap refactor)
- **281:** Database Query Execution Plan Optimize (`lib/optimization/query-plan.ts` - cost, indexUsed, suggestions)
- **282:** Unused JavaScript Bundle Size Reduction (`next.config.mjs` - optimizePackageImports, modularizeImports lucide-react)
- **283:** Caching Layer (Redis) Setup (`lib/cache/redis.ts` - redisGet/Set/Del, TTL, stats, ioredis simulated)
- **284:** Image & Asset Loading Speed Tune (`lib/optimization/image-tuning.ts` - webp/avif, 6 sizes, quality 75, lazyLoad)
- **285:** End-to-End (E2E) Integration Testing (`tests/e2e/integration.test.ts` - onboarding → timesheet → payroll → invoice, RLS, 2 tests)

#### Verified
- `npx vitest run` ✓ 9 test files, 31 tests passed (2.27s)
- `npm run build` ✓ 29 routes (no bundle increase, middleware 28.7 kB)
- `npx prisma validate` ✓
- Gift: https://github.com/iNAYATechLab/manpower-agency

#### Optimization
- Bundle: `optimizePackageImports` for lucide-react + @prisma/client
- Images: webp/avif, 6 deviceSizes, lazyLoad
- Cache: Redis simulated with TTL
- Query: Suggested composite index (agency_id, status), pagination limit 20

---

## [v2.1.0] - 2026-08-07
### Phase 12 (Steps 251-270) - Analytics, Logger & Export Engine
**Build:** `20260807-52c08d3` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 251-270 (20 steps)

#### Added
- **251-270:** Profitability Chart, Revenue vs Payout, Utilization Donut, Country Map, Skill Distribution, Overdue Chart, Custom Chart Binder, XLSX/CSV/PDF Exporters, Zod Validation, Form Error Processor, Audit Log Table UI, Diff Viewer, IP Tracking Visual, Error Tracking, Performance Logger, Report Filter, Weekly Summary Email, Client Performance Report

---

## [v2.0.0] - 2026-08-07
### Phase 11 (Steps 231-250) - Compliance, Document & Cloud Notification
**Build:** `20260807-1bfa000` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 231-250 (20 steps)

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
### [v3.0.0] - Future - Planned
- Final Deployment, Documentation & Handover

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
