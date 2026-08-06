/**
 * Phase 7: Worker Onboarding Types (Steps 151-170)
 */

export interface WorkerOnboardingData {
  // 152 Personal
  personal: { fullName: string; fullNameBn?: string; dob?: string; nationality?: string; phone?: string; email?: string };
  // 153 Passport
  passport: { number?: string; expiry?: string; akamaNumber?: string; akamaExpiry?: string; workPermit?: string; workPermitExpiry?: string };
  // 154 Medical
  medical: { status?: string; expiry?: string; bloodGroup?: string; fitnessNotes?: string };
  // 155-157 Skills
  skills: { categoryId?: string; skillIds: string[]; grade?: "A" | "B" | "C"; languages?: string[]; experienceYears?: number };
  // 158 Bank
  bank: { bankName?: string; accountNumber?: string; iban?: string; swift?: string };
  // 159 Emergency
  emergency: { name?: string; relation?: string; phone?: string; address?: string };
  // 160 Photo
  photo: { url?: string; fileName?: string };
  // 161 Certificates
  certificates: Array<{ title: string; url: string; type: string }>;
}

export const SKILL_CATALOG = [
  { id: "skill_welder", name: "Welder", category: "Construction" },
  { id: "skill_electrician", name: "Electrician", category: "Electrical" },
  { id: "skill_plumber", name: "Plumber", category: "Mechanical" },
  { id: "skill_carpenter", name: "Carpenter", category: "Construction" },
  { id: "skill_mason", name: "Mason", category: "Construction" },
] as const;

export const MOCK_WORKERS = [
  { id: "wrk_001", workerCode: "WRK-2026-001", fullName: "Abdul Karim", skill: "Welder", grade: "A", status: "available", location: "Bench", phone: "+880170000001" },
  { id: "wrk_002", workerCode: "WRK-2026-002", fullName: "Mohammad Ali", skill: "Electrician", grade: "B", status: "deployed", location: "NEOM Site A", phone: "+880170000002" },
  { id: "wrk_003", workerCode: "WRK-2026-003", fullName: "Rahim Uddin", skill: "Plumber", grade: "A", status: "available", location: "Bench", phone: "+880170000003" },
  { id: "wrk_004", workerCode: "WRK-2026-004", fullName: "Karim Mia", skill: "Carpenter", grade: "C", status: "deployed", location: "NEOM Site A", phone: "+880170000004" },
  { id: "wrk_005", workerCode: "WRK-2026-005", fullName: "Jamal Hossain", skill: "Welder", grade: "B", status: "available", location: "Bench", phone: "+880170000005" },
];
