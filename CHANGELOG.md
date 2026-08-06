# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.0.0] - 2026-08-07
### Phase 1 (Steps 1-20) - Foundation
**Build:** `20260807-a8fbf45` | **Author:** iNAYATechLab Inc. (Samiullah Pk)

#### Added
- **GitHub & Security (Steps 1-10):** Private repo `manpower-agency-saas`, AES-256-CBC token encryption (`lib/encryption.ts`), secure `.env.local`/`.env.production`/`.env.secret`, `.gitignore` hardening, branch protection (`main` requires PR + status checks), Arena webhook, initial structure.
- **Framework (Steps 11-20):** TypeScript Strict Mode, ESLint + Prettier (tailwind plugin), Next.js 14 App Router, Tailwind CSS + CSS Variables, Shadcn UI (`components.json`, Button, Card), Global branding metadata (`iNAYATechLab Inc.`), Company start date constant `2026-08-01`, Design System (5 colors), Dark/Light ThemeProvider (`next-themes`), Root layout with Inter + Poppins + Hind Siliguri fonts.
- **Design System:** `s1 #1D0B2E` Primary BG, `s2 #E5B84B` Buttons, `s3 #2A1143` Secondary BG, `s4 #FFFFFF` Text, `s5 #B388FF` Accents.
- **Gift Automation:** `lib/gift-config.ts`, `scripts/push-to-gift.sh`, `scripts/gift-release.mjs`, `.github/workflows/gift-auto-release.yml` (build ZIP + release + gift mirror).
- **IVCS:** `VERSION`, `version.config.json`, `lib/version.ts`, `CHANGELOG.md` (SemVer 2.0.0, Phase-mapped).

#### Security
- GitHub PAT `ghp_RMh...` encrypted AES-256-CBC to `.env.secret` (`iv:encrypted`), never committed plain.

#### Verified
- `npm run build` ✓ Passed (98.5 kB First Load)
- `git log` 3 commits, gift dry-run artifacts 196M + 20M

---

## Unreleased
### [v1.1.0] - Phase 2 (Steps 21-40) - Planned
- Database, Prisma, Supabase, Auth, Multi-Tenancy (RLS)

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
