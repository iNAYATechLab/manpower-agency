/**
 * Step 246: Notification Read/Unread Status Toggle
 */

const readStatus = new Map<string, Set<string>>(); // userId -> Set<notificationId>

export function markAsRead(userId: string, notificationId: string): void {
  if (!readStatus.has(userId)) readStatus.set(userId, new Set());
  readStatus.get(userId)!.add(notificationId);
}

export function markAsUnread(userId: string, notificationId: string): void {
  readStatus.get(userId)?.delete(notificationId);
}

export function isRead(userId: string, notificationId: string): boolean {
  return readStatus.get(userId)?.has(notificationId) ?? false;
}

export function toggleReadStatus(userId: string, notificationId: string): boolean {
  if (isRead(userId, notificationId)) {
    markAsUnread(userId, notificationId);
    return false;
  } else {
    markAsRead(userId, notificationId);
    return true;
  }
}

export function getUnreadCount(userId: string, allIds: string[]): number {
  const read = readStatus.get(userId) || new Set();
  return allIds.filter((id) => !read.has(id)).length;
}
