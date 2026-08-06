# 🎁 Gift Repository - Auto Push + Release Setup

**Primary (Private):** `iNAYATechLab/manpower-agency-saas`
**Gift (Delivery):** `iNAYATechLab/manpower-agency-saas-gift`

---

## 1. আমাকে যা দিতে হবে (One Time)

আপনি শুধু এই ২টা জিনিস দিন, বাকি সব আমি Automate করে দেবো:

### A. GitHub Personal Access Token (PAT)
- **লিংক:** https://github.com/settings/tokens/new
- **Type:** `Tokens (classic)` → `Generate new token (classic)`
- **Scope টিক দিন:** `repo` (Full control of private repositories) + `workflow`
- **Expiration:** `90 days` বা `No expiration` (আপনার ইচ্ছা)
- Token টা `ghp_xxxxxxxxxxxx` এর মতো হবে, সেটা আমাকে দিন (আমি AES-256 এ Encrypt করে `.env.secret` এ রাখবো)

> বিকল্প: Fine-grained token দিলেও হবে → Repository access: `manpower-agency-saas` + `manpower-agency-saas-gift` → Permissions: `Contents: Read & Write`, `Metadata: Read`

### B. Gift Repo নাম Confirm
- Default: `manpower-agency-saas-gift` (আমি তৈরি করে দেবো)
- আপনি অন্য নাম চাইলে বলুন, যেমন `manpower-gift` বা `client-delivery`

---

## 2. আমি যা তৈরি করে দিয়েছি (Ready)

| ফাইল | কাজ |
|------|-----|
| `lib/gift-config.ts` | Gift repo config (owner, repo, versioning) |
| `scripts/push-to-gift.sh` | এক কমান্ডে Gift repo তে Push (`bash scripts/push-to-gift.sh`) |
| `scripts/gift-release.mjs` | Build ZIP + Source ZIP + GitHub Release API (`node scripts/gift-release.mjs --version=v1.0.0 --phase="Phase 1"`) |
| `.github/workflows/gift-auto-release.yml` | GitHub Actions → প্রতিটি `git push` বা `v*` Tag এ Auto Release + Artifact + Gift Mirror |
| `.env.secret` | Encrypted PAT Storage (AES-256) |

---

## 3. কিভাবে কাজ করবে?

### Option 1: Automatic (Recommended)
1. আপনি Phase Complete করলে আমি `git tag v1.0.0` + `git push` করবো
2. GitHub Actions Auto Trigger হয়ে:
   - `npm run build` করবে
   - `source-code-v1.0.0.zip` + `build-v1.0.0.zip` + `release-notes.md` বানাবে
   - GitHub Release Create করবে (https://github.com/iNAYATechLab/manpower-agency-saas-gift/releases)
   - Gift Repo তে Mirror Push করবে

### Option 2: Manual (Local থেকে)
```bash
# Gift repo তে Push
bash scripts/push-to-gift.sh manpower-agency-saas-gift "feat: Phase 1 complete"

# Release তৈরি (Dry-run আগে)
node scripts/gift-release.mjs --version=v1.0.0 --phase="Phase 1 (Steps 1-20)" --dry-run

# Real Release (Token সেট থাকলে)
GITHUB_TOKEN=ghp_xxx node scripts/gift-release.mjs --version=v1.0.0 --phase="Phase 1 (Steps 1-20)"
```

---

## 4. Security

- PAT কখনো Plain Text এ Git এ যাবে না → `lib/encryption.ts` দিয়ে AES-256-CBC Encrypt
- `.env.secret` ও `.env.local` `.gitignore` এ Block করা আছে
- GitHub Actions এ Token `secrets.GIFT_TOKEN` হিসাবে Encrypted থাকবে

---

## 5. পরবর্তী Step

আপনি PAT টা দিলেই আমি:
1. Gift Repo `https://github.com/iNAYATechLab/manpower-agency-saas-gift` তৈরি করবো (API দিয়ে)
2. প্রথম Release `v1.0.0 - Phase 1 (Steps 1-20)` Publish করবো
3. লাইভ লিংক আপনাকে দেবো

**PAT ছাড়াও Test করা যায়:** এখন Dry-Run Mode এ Release ZIP লোকালি তৈরি করে দেখতে পারি। চাইলে এখনই Test করবো?
