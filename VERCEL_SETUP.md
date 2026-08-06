# 🚀 Vercel Auto-Deploy Setup - iNAYATechLab Manpower SaaS

**Repo:** `iNAYATechLab/manpower-agency`  
**IVCS:** International Version Control System (SemVer) - প্রতিটি Push এ Auto Deploy  
**Status:** ✅ Configured - শুধু ১ বার Vercel এ Connect করতে হবে

---

## 1. একবারের সেটআপ (2 মিনিট)

### Option A: Vercel Dashboard দিয়ে Connect (Recommended - সবচেয়ে সহজ)

1. **Vercel এ যান:** https://vercel.com/new
2. **Login** করুন GitHub দিয়ে (iNAYATechLab account)
3. **Import Git Repository** → `manpower-agency` Select করুন
4. **Framework Preset:** `Next.js` (Auto detect হবে)
5. **Environment Variables** (যদি লাগে):
   ```
   NEXT_PUBLIC_APP_NAME = iNAYATechLab Manpower SaaS
   NEXT_PUBLIC_COMPANY_NAME = iNAYATechLab Inc.
   ENCRYPTION_KEY = 0123456789abcdef... (32 bytes)
   ```
   > Note: `.env.local` এ যা আছে, Production এ Vercel Dashboard → Settings → Environment Variables এ Add করুন
6. **Deploy** Click করুন

✅ **Done!** এখন থেকে প্রতিটি `git push` → Vercel Auto Deploy হবে

### Option B: Vercel CLI Token দিয়ে (Advanced - GitHub Actions)

যদি CLI দিয়ে Auto Deploy চান:

1. Vercel Token তৈরি করুন: https://vercel.com/account/tokens → `Create Token`
2. GitHub Repo → Settings → Secrets → New repository secret:
   - `VERCEL_TOKEN` = `vercel_xxx...`
   - `VERCEL_ORG_ID` = `team_xxx` ( `vercel --help` → `vercel whoami` )
   - `VERCEL_PROJECT_ID` = `prj_xxx` (Vercel Project → Settings → General → Project ID)
3. Push করলেই `.github/workflows/vercel-deploy.yml` Auto Trigger হবে

---

## 2. কিভাবে Auto-Update কাজ করবে?

```
আপনি Step 21 দিলেন → আমি Code লিখলাম → git commit → git push gift main
    ↓
GitHub Webhook → Vercel Detect করে
    ↓
Vercel Auto Build: npm install → npm run build (98.5 kB)
    ↓
Vercel Deploy: https://manpower-agency.vercel.app (Live in ~40s)
    ↓
IVCS Tag: v1.1.0 → GitHub Release Auto Create
```

**প্রতিটি Phase (20 Steps) শেষে:**
- Version Bump: `v1.0.0` → `v1.1.0` (Phase 2) → `v1.2.0` ...
- Tag Push → Vercel Deploy → Release ZIP

**আপনি কিছু করতে হবে না** — আমি Push করলেই Vercel নিজে Build + Deploy করে দেবে

---

## 3. বর্তমান Status

| Item | Status |
|------|--------|
| `vercel.json` | ✅ Created (framework: nextjs, region: sin1) |
| `.github/workflows/vercel-deploy.yml` | ✅ Created (build check + auto deploy) |
| GitHub Repo | ✅ `iNAYATechLab/manpower-agency` (Public) |
| Latest Tag | `v1.0.0` (Phase 1 Complete) |
| Vercel Connection | ⏳ Pending - আপনি Vercel Dashboard এ Import করলেই Live |

---

## 4. Deploy Verify

Deploy হলে Vercel Dashboard এ দেখবেন:
- **Build Logs:** `✓ Compiled successfully` (11.5 kB)
- **Domains:** `manpower-agency.vercel.app` + `manpower-agency-git-main-inayatechlab.vercel.app`
- **Git:** Connected to `main` branch

**Test Local:**
```bash
npm run build # must pass
```

---

## 5. Troubleshooting

- **Sandbox Preview Not Found?** → E2B Sandbox সাময়িক, কিন্তু Vercel Permanent Live URL দেবে
- **Build Fail?** → GitHub Actions এ Log দেখুন, `npm run build` Local এ Test করুন
- **Env Error?** → Vercel → Settings → Environment Variables চেক করুন

**Next:** আমি Phase 2 (Step 21-40) Push করলেই Vercel Auto Deploy হবে — আপনি শুধু Vercel এ Import করুন
