# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.1.0] - 2026-08-07
### Phase 2 (Steps 21-40) - Super Admin & Company Backbone
**Build:** `20260807-c18d3ee` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 21-40 (20 steps)

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
- Design System: Uses s1 `#1D0B2E`, s2 `#E5B84B`, s3 `#2A1143`, s5 `#B388FF` consistently
- Build: 9 routes (5 super-admin) · `npm run build` ✓

#### Security
- Firewall prevents CEO deletion at DB level
- 2FA + Master Key + Recovery Codes all CEO-only, AES-256 where needed
- Audit logs non-clearable for CEO

#### Verified
- `npm run build` ✓ Passed (9 routes, 87 kB shared)
- `git push` to `iNAYATechLab/manpower-agency` ✓

---

## [v1.0.0] - 2026-08-07
### Phase 1 (Steps 1-20) - Foundation
**Build:** `20260807-c18d3ee` | **Author:** iNAYATechLab Inc. (Samiullah Pk)

#### Added
- **GitHub & Security (Steps 1-10):** Private repo `manpower-agency-saas`, AES-256-CBC token encryption (`lib/encryption.ts`), secure `.env.local`/`.env.production`/`.env.secret`, `.gitignore` hardening, branch protection (`main` requires PR + status checks), Arena webhook, initial structure.
- **Framework (Steps 11-20):** TypeScript Strict Mode, ESLint + Prettier (tailwind plugin), Next.js 14 App Router, Tailwind CSS + CSS Variables, Shadcn UI (`components.json`, Button, Card), Global branding metadata (`iNAYATechLab Inc.`), Company start date constant `2026-08-01`, Design System (5 colors), Dark/Light ThemeProvider (`next-themes`), Root layout with Inter + Poppins + Hind Siliguri fonts.
- **Design System:** `s1 #1D0B2E` Primary BG, `s2 #E5B84B` Buttons, `s3 #2A1143` Secondary BG, `s4 #FFFFFF` Text, `s5 #B388FF` Accents.
- **Gift Automation:** `lib/gift-config.ts`, `scripts/push-to-gift.sh`, `scripts/gift-release.mjs`, `.github/workflows/gift-auto-release.yml` (build ZIP + release + gift mirror).
- **IVCS:** `VERSION`, `version.config.json`, `lib/version.ts`, `CHANGELOG.md` (SemVer 2.0.0, Phase-mapped).
- **Deploy Alternatives:** `vercel.json`, `.github/workflows/vercel-deploy.yml`, `.github/workflows/pages.yml`, `netlify.toml`, `wrangler.toml`, `VERCEL_SETUP.md`, `DEPLOY_ALTERNATIVES.md` (Cloudflare Pages, GitHub Pages, Netlify - no phone)

#### Security
- GitHub PAT `ghp_RMh...` encrypted AES-256-CBC to `.env.secret` (`iv:encrypted`), never committed plain.
- Fix: `lib/version.ts` strict TS error resolved for Cloudflare/Vercel Node 24

#### Verified
- `npm run build` ✓ Passed (98.5 kB First Load)
- Gift Repo: https://github.com/iNAYATechLab/manpower-agency · Release v1.0.0

---

## Unreleased
### [v1.2.0] - Phase 3 (Steps 41-60) - Planned
- Worker Management - Digital Onboarding, Skill Tagging, Filtering

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
