/**
 * iNAYATechLab Inc. - Gift Repository Automation Config
 * Updated: 2026-08-07 - Gift Repo: manpower-agency (as per user)
 * International Version Control System (IVCS) Integrated
 */

export const GIFT_REPO_CONFIG = {
  // Primary Repo (Private - Development)
  primary: {
    owner: "iNAYATechLab",
    repo: "manpower-agency-saas",
    branch: "main",
    visibility: "private" as const,
  },
  // Gift Repo (Delivery) - USER PROVIDED
  gift: {
    owner: "iNAYATechLab",
    repo: "manpower-agency", // https://github.com/iNAYATechLab/manpower-agency
    branch: "main",
    visibility: "public" as const,
    description:
      "🎁 iNAYATechLab Manpower SaaS - Official Delivery Repository (Auto-synced, IVCS Versioned)",
    url: "https://github.com/iNAYATechLab/manpower-agency",
  },
  // International Version Control System (IVCS)
  ivcs: {
    system: "International Version Control System (IVCS) - SemVer 2.0.0 Compliant",
    standard: "https://semver.org/",
    format: "vMAJOR.MINOR.PATCH+BUILD (e.g., v1.0.0+20260807)",
    // MAJOR: Breaking architecture (1=Foundation, 2=Core, 3=Advanced)
    // MINOR: Phase completion (1.0.0 -> 1.1.0 per phase, 15 phases -> 3.0.0)
    // PATCH: Hotfix/step within phase
    // BUILD: YYYYMMDD + short commit hash
    current: "v1.0.0",
    phaseMap: {
      "Phase 1 (Steps 1-20)": "v1.0.0",
      "Phase 2 (Steps 21-40)": "v1.1.0",
      "Phase 3 (Steps 41-60)": "v1.2.0",
      // ... up to Phase 15 -> v3.0.0 (300 steps)
    },
  },
  // Release Settings
  release: {
    versionPrefix: "v",
    autoTag: true,
    generateNotes: true,
    includeAssets: true,
    assets: ["source-code.zip", "build.zip", "release-notes.md"] as const,
  },
  triggers: {
    onPushToMain: true,
    onPhaseComplete: true,
    onTag: true,
  },
} as const;

export function getGiftRepoUrl(): string {
  return GIFT_REPO_CONFIG.gift.url;
}

export function getGiftCloneUrl(token?: string): string {
  const { owner, repo } = GIFT_REPO_CONFIG.gift;
  if (token) return `https://${token}@github.com/${owner}/${repo}.git`;
  return `https://github.com/${owner}/${repo}.git`;
}
