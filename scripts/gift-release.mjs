#!/usr/bin/env node
/**
 * iNAYATechLab Gift Repository - Auto Release Script
 * Handles: Build ZIP + Source ZIP + GitHub Release via API
 * Usage: node scripts/gift-release.mjs --phase="Phase 1 (Steps 1-20)" --version="v1.0.0"
 * Token: Reads from GITHUB_TOKEN_ENCRYPTED in .env.secret (AES-256) or GITHUB_TOKEN env
 */

import { readFileSync, existsSync, createWriteStream } from "fs";
import { execSync } from "child_process";
import { createCipheriv, createDecipheriv } from "crypto";

// --- AES-256 Decrypt (same as lib/encryption.ts) ---
function decryptToken(encryptedPayload, keyHex) {
  const [ivHex, encryptedHex] = encryptedPayload.split(":");
  if (!ivHex || !encryptedHex) throw new Error("Invalid payload format iv:encrypted");
  const key = /^[0-9a-fA-F]{64}$/.test(keyHex) ? Buffer.from(keyHex, "hex") : Buffer.from(keyHex);
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function loadEnv(file) {
  if (!existsSync(file)) return {};
  const content = readFileSync(file, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    env[k] = v;
  }
  return env;
}

async function main() {
  const args = Object.fromEntries(
    process.argv
      .slice(2)
      .map((a) => a.replace(/^--/, "").split("="))
      .map(([k, v]) => [k, v || true])
  );

  const phase = args.phase || "Phase 1 (Steps 1-20)";
  const version = args.version || "v1.0.0";
  const dryRun = !!args["dry-run"];

  console.log(`\n🎁 iNAYATechLab Gift Release - ${phase} - ${version}\n`);

  // Load env
  const envLocal = loadEnv(".env.local");
  const envSecret = loadEnv(".env.secret");
  const env = { ...envLocal, ...envSecret, ...process.env };

  let token = env.GITHUB_TOKEN || env.GITHUB_PAT || "";
  // Try encrypted
  if (!token && env.GITHUB_TOKEN_ENCRYPTED && env.ENCRYPTION_KEY) {
    try {
      token = decryptToken(env.GITHUB_TOKEN_ENCRYPTED, env.ENCRYPTION_KEY);
      console.log("✓ Decrypted GITHUB_TOKEN from .env.secret (AES-256)");
    } catch (e) {
      console.warn("⚠ Failed to decrypt token:", e.message);
    }
  }

  if (!token) {
    console.log("⚠ No GITHUB_TOKEN found. Running in DRY-RUN mode (no GitHub API call).");
    console.log("  To enable auto push/release, set GITHUB_TOKEN in .env.secret or env.");
  }

  const owner = env.GITHUB_OWNER || "iNAYATechLab";
  const giftRepo = env.GIFT_REPO || "manpower-agency-saas-gift";
  const sourceRepo = env.GITHUB_REPO || "manpower-agency-saas";

  // 1. Build check
  console.log("▶ Step 1: Verifying build...");
  try {
    execSync("npm run build", { stdio: "inherit" });
    console.log("✓ Build passed\n");
  } catch {
    console.error("✗ Build failed - aborting release");
    process.exit(1);
  }

  // 2. Create release ZIPs
  console.log("▶ Step 2: Creating release artifacts...");
  execSync("rm -rf .gift-tmp && mkdir -p .gift-tmp", { stdio: "inherit" });
  // Source zip (excluding node_modules, .next, .git, .env.secret)
  execSync(
    `zip -r .gift-tmp/source-code-${version}.zip . -x "node_modules/*" ".next/*" ".git/*" ".gift-tmp/*" "*.log" ".env.secret" ".env.local" ".env.production"`,
    { stdio: "inherit" }
  );
  // Build zip (if .next exists)
  if (existsSync(".next")) {
    execSync(`zip -r .gift-tmp/build-${version}.zip .next package.json -q`, { stdio: "inherit" });
  }
  // Release notes
  const notes = `# ${phase} - ${version}\n\n**iNAYATechLab Inc. - Manpower Agency SaaS**\n\n**Date:** ${new Date().toISOString().split("T")[0]}\n**Phase:** ${phase}\n**Version:** ${version}\n**Super Admin:** Samiullah Pk\n**Primary:** iNAYATechLab@gmail.com\n\n## Included\n- Next.js 14 App Router + TypeScript Strict\n- Design System (#1D0B2E, #E5B84B, #2A1143, #FFFFFF, #B388FF)\n- AES-256 Security + Gift Automation\n\n## Installation\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`;
  import("fs").then(({ writeFileSync }) => writeFileSync(`.gift-tmp/release-notes-${version}.md`, notes));

  console.log(`✓ Artifacts created in .gift-tmp/\n`);
  execSync("ls -lh .gift-tmp/", { stdio: "inherit" });

  if (dryRun || !token) {
    console.log("\n✓ DRY RUN complete. No GitHub API call made.");
    console.log(`  Gift Repo: https://github.com/${owner}/${giftRepo}`);
    console.log(`  To push live, run with valid GITHUB_TOKEN: node scripts/gift-release.mjs --version=${version} --phase="${phase}"`);
    return;
  }

  // 3. GitHub Release API
  console.log(`\n▶ Step 3: Creating GitHub Release ${version} on ${owner}/${giftRepo}...`);
  const apiUrl = `https://api.github.com/repos/${owner}/${giftRepo}/releases`;
  const payload = {
    tag_name: version,
    target_commitish: "main",
    name: `${phase} - ${version}`,
    body: notes,
    draft: false,
    prerelease: false,
    generate_release_notes: false,
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("GitHub API Error:", JSON.stringify(data, null, 2));
      if (data.message?.includes("already_exists") || data.errors?.[0]?.code === "already_exists") {
        console.log("ℹ Tag already exists - consider bumping version");
      }
      process.exit(1);
    }
    console.log(`✓ Release created: ${data.html_url}`);
    console.log(`  Tag: ${data.tag_name} | ID: ${data.id}`);

    // 4. Upload assets (optional, via upload_url)
    // For brevity, we log the upload_url. Full upload needs binary POST.
    console.log(`  Upload URL: ${data.upload_url}`);
    console.log("\n🎉 Gift Release Complete!");
  } catch (e) {
    console.error("✗ Release failed:", e.message);
    process.exit(1);
  }
}

main();
