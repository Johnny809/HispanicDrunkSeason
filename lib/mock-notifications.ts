export type QueuedNotification = {
  id: string;
  channel: "email" | "sms";
  to: string;
  subject: string;
  body: string;
  queuedAt: string;
  mode: "demo" | "provider";
};

declare global {
  var __dealvistaNotifications: QueuedNotification[] | undefined;
}

const notificationStore = globalThis.__dealvistaNotifications ?? [];
if (!globalThis.__dealvistaNotifications) {
  globalThis.__dealvistaNotifications = notificationStore;
}

export function listNotifications() {
  return notificationStore;
}

export function queueNotification(input: Omit<QueuedNotification, "id" | "queuedAt">) {
  const item: QueuedNotification = {
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    queuedAt: new Date().toISOString(),
    ...input
  };

  notificationStore.unshift(item);
  return item;
}
