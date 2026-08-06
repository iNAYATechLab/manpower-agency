/**
 * Step 241: Pusher/Firebase Real-time Notification System Integrate
 */

export type RealtimeChannel = "global" | "agency" | "worker" | "client";

export interface RealtimeMessage {
  channel: RealtimeChannel;
  event: string;
  data: Record<string, unknown>;
  timestamp: Date;
}

const listeners = new Map<string, Array<(msg: RealtimeMessage) => void>>();

export function subscribe(channel: RealtimeChannel, callback: (msg: RealtimeMessage) => void): () => void {
  const key = channel;
  if (!listeners.has(key)) listeners.set(key, []);
  listeners.get(key)!.push(callback);
  return () => {
    const arr = listeners.get(key) || [];
    listeners.set(key, arr.filter((cb) => cb !== callback));
  };
}

export function publish(channel: RealtimeChannel, event: string, data: Record<string, unknown>): RealtimeMessage {
  const msg: RealtimeMessage = { channel, event, data, timestamp: new Date() };
  const cbs = listeners.get(channel) || [];
  cbs.forEach((cb) => cb(msg));
  // In prod: pusher.trigger(channel, event, data) or firebase
  console.log(`[REALTIME] ${channel}:${event}`, data);
  return msg;
}

// Example: publish("global", "sos_alert", { workerId: "wrk_001" })
