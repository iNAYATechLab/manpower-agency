# manpower-agency-saas

**iNAYATechLab Inc. - Manpower Supply SaaS Platform**

Enterprise Multi-Tenant Workforce Management System

- **Owner:** iNAYATechLab (Samiullah Pk - CEO / Super Admin)
- **Primary Email:** iNAYATechLab@gmail.com
- **Repo:** `iNAYATechLab/manpower-agency-saas` (Private)
- **Company Start Date:** 01 August 2026
- **Stack:** Next.js 14 (App Router) + TypeScript Strict + Tailwind CSS + Shadcn UI

## Design System

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| s1 | Dark Purple / Deep Violet | `#1D0B2E` | Primary Background |
| s2 | Gold / Muted Yellow | `#E5B84B` | Highlights & Buttons |
| s3 | Dark Plum / Medium Purple | `#2A1143` | Secondary Background |
| s4 | Pure White | `#FFFFFF` | Primary Text |
| s5 | Light Lavender / Purple Tint | `#B388FF` | Accents & Icons |

## Phase 1 - Foundation (Steps 1-20) ✅ Completed

- [x] GitHub private repo + AES-256 token encryption
- [x] Secure env files (.env.local, .env.production, .env.secret)
- [x] .gitignore + Branch protection rules + Arena webhook
- [x] TypeScript Strict + ESLint + Prettier
- [x] Next.js 14 App Router + Tailwind CSS + CSS Variables
- [x] Shadcn UI + Global branding metadata
- [x] Company start date constant (01 Aug 2026)
- [x] Dark/Light Theme Provider + Root Layout + Fonts (Inter, Poppins, Hind Siliguri)

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Security

- GitHub PAT is AES-256-CBC encrypted in `.env.secret` - never commit plain token
- See `lib/encryption.ts` for encrypt/decrypt logic
- Branch protection enforces PR reviews on `main`

## Next Phase

Steps 21-40: Database, Prisma, Auth, Multi-Tenancy
