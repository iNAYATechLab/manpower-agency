/**
 * Step 16: iNAYATechLab Inc. Global Branding Metadata
 */
import { COMPANY } from "@/lib/constants";

export const siteConfig = {
  name: "Manpower Agency SaaS",
  fullName: `${COMPANY.name} - Manpower Supply SaaS`,
  description:
    "iNAYATechLab Inc. এর Enterprise Multi-Tenant Manpower Supply Platform — Worker Management, Timesheet, Payroll, Invoicing ও Geofencing সহ সম্পূর্ণ Workforce Solution।",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://manpower.inayatechlab.com",
  ogImage: "/og-image.png",
  links: {
    github: `https://github.com/${COMPANY.owner}/${COMPANY.repo}`,
    support: `mailto:${COMPANY.email}`,
  },
  company: COMPANY,
  keywords: [
    "manpower",
    "workforce management",
    "SaaS",
    "iNAYATechLab",
    "staffing agency",
    "timesheet",
    "payroll",
    "recruitment",
    "Bangladesh",
    "Saudi Arabia",
  ],
  authors: [{ name: COMPANY.name, url: "https://inayatechlab.com" }],
  creator: COMPANY.name,
};

export type SiteConfig = typeof siteConfig;
