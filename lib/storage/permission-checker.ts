/**
 * Step 249: Document Download Permission Checker
 */

export function canDownloadDocument(
  requester: { userId: string; role: string; agencyId?: string | null; isSuperAdmin: boolean },
  document: { workerId?: string; agencyId?: string; type: string }
): { allowed: boolean; reason: string } {
  if (requester.isSuperAdmin) return { allowed: true, reason: "CEO bypass" };
  if (requester.role === "agency_admin" && requester.agencyId === document.agencyId) return { allowed: true, reason: "Agency admin own agency" };
  if (requester.role === "worker" && requester.userId === document.workerId) return { allowed: true, reason: "Worker own document" };
  if (requester.role === "field_supervisor" && requester.agencyId === document.agencyId) return { allowed: true, reason: "Supervisor same agency" };
  return { allowed: false, reason: "No permission for this document" };
}
