/**
 * Step 237: Medical Report Digital Catalog
 */

export interface MedicalReport {
  id: string;
  workerId: string;
  workerName: string;
  reportDate: string;
  expiryDate: string;
  status: "fit" | "unfit" | "pending";
  fileUrl: string;
  verifiedBy?: string;
}

const medicalReports: MedicalReport[] = [];

export function addMedicalReport(report: Omit<MedicalReport, "id">): MedicalReport {
  const r: MedicalReport = { id: `med_${Date.now()}`, ...report };
  medicalReports.push(r);
  return r;
}

export function getMedicalReports(workerId?: string): MedicalReport[] {
  if (workerId) return medicalReports.filter((r) => r.workerId === workerId);
  return [...medicalReports];
}

export function getExpiringMedicalReports(days = 30): MedicalReport[] {
  const now = new Date();
  return medicalReports.filter((r) => {
    const expiry = new Date(r.expiryDate);
    const diff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff <= days && diff >= 0;
  });
}
