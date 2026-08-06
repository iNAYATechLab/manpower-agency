/**
 * iNAYATechLab Inc. - System Constants
 * Step 17: Company Start Date & Global Constants
 */

export const COMPANY = {
  name: "iNAYATechLab Inc.",
  shortName: "iNAYATechLab",
  email: "iNAYATechLab@gmail.com",
  // Step 17: Company start date as system constant
  startDate: new Date("2026-08-01T00:00:00.000Z"),
  startDateString: "2026-08-01",
  foundedYear: 2026,
  ceo: "Samiullah Pk",
  repo: "manpower-agency-saas",
  owner: "iNAYATechLab",
} as const;

export const DESIGN_SYSTEM = {
  colors: {
    // s1 - Primary Background
    darkPurple: "#1D0B2E",
    // s2 - Highlights & Buttons
    gold: "#E5B84B",
    // s3 - Secondary Background
    darkPlum: "#2A1143",
    // s4 - Primary Text
    white: "#FFFFFF",
    // s5 - Accents & Icons
    lavender: "#B388FF",
  },
  usage: {
    primaryBackground: "#1D0B2E", // s1
    highlightsButtons: "#E5B84B", // s2
    secondaryBackground: "#2A1143", // s3
    primaryText: "#FFFFFF", // s4
    accentsIcons: "#B388FF", // s5
  },
} as const;

export const APP_CONFIG = {
  defaultLocale: "bn",
  supportedCurrencies: ["USD", "SAR", "BDT", "EUR"] as const,
  supportedLocales: ["bn", "en", "ar"] as const,
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
  geofencing: {
    defaultRadiusMeters: 100,
    maxRadiusMeters: 500,
  },
} as const;

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  AGENCY_ADMIN: "agency_admin",
  CLIENT: "client",
  FIELD_SUPERVISOR: "field_supervisor",
  WORKER: "worker",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
