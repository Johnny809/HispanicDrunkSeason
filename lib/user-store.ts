export type UserProfile = {
  id: string;
  name: string;
  email: string;
  username: string;
  phone?: string;
  createdAt: string;
};

declare global {
  var __dealvistaUsers: UserProfile[] | undefined;
}

const users = globalThis.__dealvistaUsers ?? [];
if (!globalThis.__dealvistaUsers) globalThis.__dealvistaUsers = users;

export function listUsers() {
  return users;
}

export function addUser(input: Omit<UserProfile, "id" | "createdAt">) {
  const user: UserProfile = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...input
  };
  users.unshift(user);
  return user;
}

export function generateUsername(name: string) {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10) || "dealuser";
  return `${base}_${Math.random().toString(36).slice(2, 6)}`;
}
