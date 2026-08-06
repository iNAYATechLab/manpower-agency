# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.4.0] - 2026-08-07
### Phase 5 (Steps 101-130) - Authentication & 2FA Security
**Build:** `20260807-c3743be` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 101-130 (30 steps)

#### Added
- **101:** Supabase Auth/JWT Session Manager (`lib/auth/session.ts` - HS256, access 1hr + refresh 7d, store, verify)
- **102:** Sign-In API (`app/api/auth/signin/route.ts` - username/email + password + totp + deviceId, brute-force + lockout + rate limit)
- **103:** Sign-Up & Agency Onboarding API (`app/api/auth/signup/route.ts` - agency + agency_settings + agency_admin user, verification link)
- **104:** Password Hashing Bcrypt/Argon2 (`lib/auth/password.ts` - scrypt 64+16, timingSafeEqual, strength check)
- **105:** Token Rotation & Refresh (`lib/auth/token.ts` + `app/api/auth/refresh/route.ts` - reuse detection, new jti)
- **106:** RBAC Middleware (`lib/auth/rbac-middleware.ts` - role + permission check, super_admin bypass)
- **107:** Super Admin Interceptor (`lib/auth/guards/super-admin.ts` - CEO `CEO` + super_admin only)
- **108:** Agency Admin Guard (`lib/auth/guards/agency-admin.ts` - agency_admin + super_admin, agencyId required)
- **109:** Client Portal Guard (`lib/auth/guards/client.ts`)
- **110:** Field Supervisor Security (`lib/auth/guards/supervisor.ts`)
- **111:** Worker Access Control (`lib/auth/guards/worker.ts` - own data only)
- **112:** Reset Password Email Dispatcher (`lib/auth/email.ts` - Resend/SendGrid mock, URL)
- **113:** Password Update & Override API (`app/api/auth/reset-password/route.ts` - request + reset with HMAC token, strength)
- **114:** 2FA QR Generator (`lib/auth/2fa-qr.ts` - otpauth URL + SVG QR data URI)
- **115:** 2FA TOTP Validation (`lib/auth/2fa-validation.ts` - re-exports 2fa.ts)
- **116:** SMS OTP API (`lib/auth/sms-otp.ts` - 6-digit, 5min expiry, 5 attempts)
- **117:** Account Lockout (`lib/auth/lockout.ts` - 5 attempts /15min → 30min lock)
- **118:** Session Timeout Interceptor (`lib/auth/session-timeout.ts` - 30min, remainingMs)
- **119:** Multiple Device Blocking (`lib/auth/device.ts` - max 1 device, allowMultiple flag)
- **120:** IP Block System (`lib/auth/ip-block.ts` - Set + fail count 10 → block)
- **121:** Brute-Force Protection (`lib/auth/brute-force.ts` - combines lockout + IP block)
- **122:** Login Tracking & IP Logging (`lib/auth/login-tracking.ts` - 1000 logs, history, failed)
- **123:** Secure Cookie Management (`lib/auth/cookies.ts` - httpOnly, secure, sameSite lax, 1hr/7d)
- **124:** CSRF Validation (`lib/auth/csrf.ts` - HMAC SHA256 token.signature)
- **125:** CORS Security Headers (`lib/auth/cors.ts` - allowedOrigins, X-Frame, nosniff, Referrer)
- **126:** API Rate Limiter (`lib/auth/rate-limiter.ts` - token bucket, 5/15min auth, 60/min api)
- **127:** Onboarding Email Verification (`lib/auth/verification.ts` - HMAC token, 24h, link)
- **128:** Social OAuth Backend (`lib/auth/oauth.ts` - Google + GitHub, authorizationUrl)
- **129:** Guest View Block Middleware (`lib/auth/guest-block.ts` - publicRoutes, redirect to /login)
- **130:** Auth Audit Logger (`lib/auth/audit.ts` - SIGNIN_SUCCESS/FAIL, SIGNUP, LOCKED, BRUTE_FORCE → audit_logs + login tracking)

#### Middleware
- `middleware.ts` — Central (106-130) — Matches `/super-admin/*`, `/agency/*`, `/client/*`, `/supervisor/*`, `/worker/*`, `/api/*` — Handles CORS, Rate Limit, IP Block, Guest Block, Session Timeout, Brute Force, Role Guards, CSRF

#### APIs
- `POST /api/auth/signin` — Step 102
- `POST /api/auth/signup` — Step 103 (Agency Onboarding)
- `POST /api/auth/refresh` — Step 105 (Token Rotation)
- `POST /api/auth/reset-password` — Steps 112-113 (Request + Reset)

#### Verified
- `npm run build` ✓ 13 routes (4 API + 5 super-admin + middleware 28.5 kB)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.3.0] - 2026-08-07
### Phase 4 (Steps 71-100) - Security, RLS & Data Isolation
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 71-100 (30 steps)

#### Added
- **71-100:** RLS Activate (17 tables), 12 Policies (agencies, users, CEO bypass, workers, clients, contracts, job_sites, timesheets, payrolls, invoices, compliance), FK indexes, unique indexes, passport duplicate, PK cascade, migration, Supabase, seed, performance, slow-query, storage buckets (private/public/temp), encryption, compression, watermark, signed URL, backup tune

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
### [v1.5.0] - Phase 6 (Steps 131-160) - Planned
- Client, Project & Contract Tracking UI

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
