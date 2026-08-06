/**
 * iNAYATechLab Inc. - International Version Control System (IVCS)
 * Standard: Semantic Versioning 2.0.0 (https://semver.org/)
 * Format: vMAJOR.MINOR.PATCH+BUILD
 *
 * MAJOR: Breaking architecture (1=Foundation, 2=Core, 3=Advanced)
 * MINOR: Phase completion (20 steps per phase, 15 phases = v1.0.0 -> v3.0.0)
 * PATCH: Hotfix within phase
 * BUILD: YYYYMMDD-shortHash
 */

import { readFileSync, existsSync } from "fs";

export const IVCS = {
  system: "International Version Control System (IVCS)",
  standard: "SemVer 2.0.0",
  format: "vMAJOR.MINOR.PATCH+BUILD",
  current: "v1.8.0" as const,
  currentRaw: "1.8.0" as const,
  phase: "Phase 9 (Steps 191-210)" as const,
  build: "20260807-7681c7e" as const,
  company: "iNAYATechLab Inc." as const,
  startDate: "2026-08-01" as const,
} as const;

export type Version = `v${number}.${number}.${number}`;
export type VersionWithBuild = `v${number}.${number}.${number}+${string}`;

/**
 * Parse version string
 */
export function parseVersion(version: string): { major: number; minor: number; patch: number; build?: string } {
  const cleaned = version.replace(/^v/, "");
  const parts = cleaned.split("+");
  const ver = parts[0] as string;
  const build = parts[1];
  if (!ver) throw new Error(`Invalid version: ${version}`);
  const nums = ver.split(".").map(Number);
  const major = nums[0] ?? 0;
  const minor = nums[1] ?? 0;
  const patch = nums[2] ?? 0;
  return { major, minor, patch, build };
}

/**
 * Bump version per IVCS rules
 */
export function bumpVersion(
  current: string,
  type: "major" | "minor" | "patch",
  buildSuffix?: string
): string {
  const { major, minor, patch } = parseVersion(current);
  let next = "";
  if (type === "major") next = `v${major + 1}.0.0`;
  if (type === "minor") next = `v${major}.${minor + 1}.0`;
  if (type === "patch") next = `v${major}.${minor}.${patch + 1}`;
  if (buildSuffix) next += `+${buildSuffix}`;
  return next;
}

/**
 * Get version for next phase (minor bump)
 */
export function getNextPhaseVersion(current: string = IVCS.current, build?: string): string {
  return bumpVersion(current, "minor", build);
}

/**
 * Phase to version mapping (300 steps = 15 phases)
 */
export const PHASE_VERSION_MAP: Record<string, Version> = {
  "Phase 1 (Steps 1-20)": "v1.0.0",
  "Phase 2 (Steps 21-40)": "v1.1.0",
  "Phase 3 (Steps 41-60)": "v1.2.0",
  "Phase 4 (Steps 61-80)": "v1.3.0",
  "Phase 5 (Steps 81-100)": "v1.4.0",
  "Phase 6 (Steps 101-120)": "v2.0.0",
  "Phase 7 (Steps 121-140)": "v2.1.0",
  "Phase 8 (Steps 141-160)": "v2.2.0",
  "Phase 9 (Steps 161-180)": "v2.3.0",
  "Phase 10 (Steps 181-200)": "v2.4.0",
  "Phase 11 (Steps 201-220)": "v3.0.0",
  "Phase 12 (Steps 221-240)": "v3.1.0",
  "Phase 13 (Steps 241-260)": "v3.2.0",
  "Phase 14 (Steps 261-280)": "v3.3.0",
  "Phase 15 (Steps 281-300)": "v3.4.0",
};

/**
 * Get current version from VERSION file (if exists)
 */
export function getVersionFromFile(): string {
  try {
    if (existsSync("VERSION")) {
      return `v${readFileSync("VERSION", "utf8").trim().replace(/^v/, "")}`;
    }
  } catch {}
  return IVCS.current;
}

/**
 * Generate build metadata: YYYYMMDD-shortHash
 */
export function generateBuildMetadata(commitHash?: string): string {
  const datePart = new Date().toISOString().split("T")[0] ?? "20260807";
  const date = datePart.replace(/-/g, "");
  const hash = commitHash || "dev";
  return `${date}-${hash.substring(0, 7)}`;
}
