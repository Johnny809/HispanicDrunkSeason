export type SupportChannel = "email" | "sms";

export type SupportMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredChannel: SupportChannel;
  message: string;
  createdAt: string;
  status: "waiting" | "opened";
};

declare global {
  var __dealvistaSupportStore: SupportMessage[] | undefined;
}

const supportStore = globalThis.__dealvistaSupportStore ?? [];
if (!globalThis.__dealvistaSupportStore) {
  globalThis.__dealvistaSupportStore = supportStore;
}

export function listSupportMessages() {
  return supportStore;
}

export function addSupportMessage(input: Omit<SupportMessage, "id" | "createdAt" | "status">) {
  const message: SupportMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "waiting",
    ...input
  };

  supportStore.unshift(message);
  return message;
}

export function openSupportMessage(id: string) {
  const message = supportStore.find((item) => item.id === id);
  if (!message) return null;

  message.status = "opened";
  return message;
}
