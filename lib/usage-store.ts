declare global {
  var __dealvistaUsage: { activeUsers: number; totalVisits: number } | undefined;
}

const usage = globalThis.__dealvistaUsage ?? { activeUsers: 0, totalVisits: 0 };
if (!globalThis.__dealvistaUsage) globalThis.__dealvistaUsage = usage;

export function trackVisit() {
  usage.totalVisits += 1;
  usage.activeUsers = Math.max(1, Math.floor(usage.totalVisits * 0.45));
  return usage;
}

export function getUsage() {
  return usage;
}
