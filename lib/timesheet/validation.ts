/**
 * Steps 200-201: GPS Clocking Validation + Geofencing Radius Check
 */

export interface GPSCoords {
  latitude: number;
  longitude: number;
}

/**
 * Step 201: Geofencing Radius Check Algorithm (Haversine)
 * Returns distance in meters, checks if within radius
 */
export function checkGeofencing(
  workerCoords: GPSCoords,
  siteCoords: GPSCoords,
  radiusMeters: number = 100
): { inside: boolean; distanceM: number; radiusM: number } {
  const R = 6371000; // Earth radius in meters
  const dLat = ((siteCoords.latitude - workerCoords.latitude) * Math.PI) / 180;
  const dLng = ((siteCoords.longitude - workerCoords.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((workerCoords.latitude * Math.PI) / 180) *
      Math.cos((siteCoords.latitude * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceM = R * c;
  return { inside: distanceM <= radiusMeters, distanceM: Math.round(distanceM), radiusM: radiusMeters };
}

/**
 * Step 200: GPS Clocking Validation Logic
 */
export function validateClocking(
  workerCoords: GPSCoords | null,
  siteCoords: GPSCoords,
  radiusM?: number
): { valid: boolean; reason: string; geofenced: boolean } {
  if (!workerCoords) return { valid: false, reason: "No GPS coords", geofenced: false };
  const check = checkGeofencing(workerCoords, siteCoords, radiusM);
  if (!check.inside) return { valid: false, reason: `Outside geofence (${check.distanceM}m > ${check.radiusM}m)`, geofenced: false };
  return { valid: true, reason: `Inside geofence (${check.distanceM}m)`, geofenced: true };
}
