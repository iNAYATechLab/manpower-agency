/**
 * Step 240: Emergency SOS Messaging Backend
 */

export interface SOSAlert {
  id: string;
  workerId: string;
  workerName: string;
  location?: { lat: number; lng: number };
  message: string;
  timestamp: Date;
  status: "active" | "acknowledged" | "resolved";
  acknowledgedBy?: string;
}

const sosAlerts: SOSAlert[] = [];

export function triggerSOS(input: Omit<SOSAlert, "id" | "timestamp" | "status">): SOSAlert {
  const alert: SOSAlert = { id: `sos_${Date.now()}`, timestamp: new Date(), status: "active", ...input };
  sosAlerts.push(alert);
  console.log(`[SOS] ${input.workerName} triggered SOS: ${input.message}`);
  return alert;
}

export function acknowledgeSOS(id: string, acknowledgedBy: string): SOSAlert | null {
  const alert = sosAlerts.find((a) => a.id === id);
  if (!alert) return null;
  alert.status = "acknowledged";
  alert.acknowledgedBy = acknowledgedBy;
  return alert;
}

export function getActiveSOS(): SOSAlert[] {
  return sosAlerts.filter((a) => a.status === "active");
}

export function getAllSOS(): SOSAlert[] {
  return [...sosAlerts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
