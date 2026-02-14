function normalizeEnv(raw?: string) {
  if (!raw) return "";
  return raw
    .trim()
    .replace(/^['"<\s]+/, "")
    .replace(/[>'"\s]+$/, "");
}

const SITE_KEY = normalizeEnv(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
const SECRET_KEY = normalizeEnv(process.env.TURNSTILE_SECRET_KEY);
const SITE_URL = normalizeEnv(process.env.NEXT_PUBLIC_SITE_URL);

if (!SITE_KEY || !SECRET_KEY) {
  console.warn("[startup] Turnstile keys missing: NEXT_PUBLIC_TURNSTILE_SITE_KEY and/or TURNSTILE_SECRET_KEY");
}

export function getTurnstileSiteKey() {
  return SITE_KEY;
}

export function getTurnstileHealth() {
  return {
    hasTurnstileSiteKey: Boolean(SITE_KEY),
    hasTurnstileSecret: Boolean(SECRET_KEY),
    siteUrlSet: Boolean(SITE_URL)
  };
}

export async function verifyTurnstile(token: string, remoteIp?: string) {
  if (!SECRET_KEY || !token) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const payload = new URLSearchParams({
      secret: SECRET_KEY,
      response: token
    });
    if (remoteIp) payload.set("remoteip", remoteIp);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      signal: controller.signal
    });

    if (!response.ok) return false;

    const data = await response.json();
    return Boolean(data?.success);
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
