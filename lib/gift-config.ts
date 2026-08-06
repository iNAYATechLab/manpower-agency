/**
 * iNAYATechLab Inc. - Gift Repository Automation Config
 * Step: Gift Repo Auto Push + Release System
 */

export const GIFT_REPO_CONFIG = {
  // Primary Repo (Private - Development)
  primary: {
    owner: "iNAYATechLab",
    repo: "manpower-agency-saas",
    branch: "main",
    visibility: "private" as const,
  },
  // Gift Repo (Auto-synced - for Client/Delivery)
  gift: {
    owner: "iNAYATechLab",
    repo: "manpower-agency-saas-gift", // Default gift repo name
    branch: "main",
    visibility: "public" as const, // Gift is usually public/demo
    description:
      "🎁 iNAYATechLab Manpower SaaS - Gift/Release Repository (Auto-synced from private repo)",
  },
  // Release Settings
  release: {
    versionPrefix: "v",
    // Semantic versioning: v1.0.0 -> v1.0.1 per phase
    // Phase 1 = v1.0.0, Phase 2 = v1.1.0 ... Phase 15 = v3.0.0 (300 steps)
    autoTag: true,
    generateNotes: true,
    includeAssets: true,
    assets: ["source-code.zip", "build.zip", "release-notes.md"] as const,
  },
  // Automation Triggers
  triggers: {
    onPushToMain: true,
    onPhaseComplete: true, // Manual trigger per phase
    onTag: true,
  },
} as const;

export function getGiftRepoUrl(): string {
  const { owner, repo } = GIFT_REPO_CONFIG.gift;
  return `https://github.com/${owner}/${repo}`;
}

export function getGiftCloneUrl(token?: string): string {
  const { owner, repo } = GIFT_REPO_CONFIG.gift;
  if (token) {
    return `https://${token}@github.com/${owner}/${repo}.git`;
  }
  return `https://github.com/${owner}/${repo}.git`;
}
