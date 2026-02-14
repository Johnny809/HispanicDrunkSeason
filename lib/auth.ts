import { createHmac, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/auth-db";
import { queueNotification } from "@/lib/mock-notifications";

const CODE_SECRET = process.env.AUTH_CODE_SECRET || "dev-auth-code-secret-change-me";
const SESSION_SECRET = process.env.SESSION_SECRET || "dev-session-secret-change-me";
const SESSION_COOKIE = "dealvista_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

type Session = { id: string; userId: string; expiresAt: number };
const globalSessions = globalThis as typeof globalThis & { __dealvistaSessions?: Map<string, Session> };
const sessions = globalSessions.__dealvistaSessions ?? new Map<string, Session>();
if (!globalSessions.__dealvistaSessions) globalSessions.__dealvistaSessions = sessions;

type RateState = { count: number; resetAt: number };
const globalRate = globalThis as typeof globalThis & { __dealvistaRate?: Map<string, RateState> };
const rate = globalRate.__dealvistaRate ?? new Map<string, RateState>();
if (!globalRate.__dealvistaRate) globalRate.__dealvistaRate = rate;

export function getIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function logSuspiciousActivity(event: string, metadata: Record<string, string> = {}) {
  console.warn(`[security] ${event}`, metadata);
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = rate.get(key);
  if (!current || current.resetAt <= now) {
    rate.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (current.count >= limit) { logSuspiciousActivity("rate_limit_exceeded", { key }); return { allowed: false, remaining: 0 }; }
  current.count += 1;
  return { allowed: true, remaining: limit - current.count };
}

function hmac(value: string) {
  return createHmac("sha256", CODE_SECRET).update(value).digest("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string) {
  const [algo, saltHex, keyHex] = stored.split("$");
  if (algo !== "scrypt" || !saltHex || !keyHex) return false;
  const derived = scryptSync(password, Buffer.from(saltHex, "hex"), 64);
  return timingSafeEqual(derived, Buffer.from(keyHex, "hex"));
}

export function createVerificationCode(userId: string) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const now = Date.now();
  db.prepare("INSERT INTO email_verification_codes (userId, codeHash, expiresAt, createdAt) VALUES (?, ?, ?, ?)")
    .run(userId, hmac(code), now + 10 * 60 * 1000, now);
  return code;
}

export function canSendVerificationEmail(userId: string) {
  const cutoff = Date.now() - 60 * 60 * 1000;
  const row = db.prepare("SELECT COUNT(*) as count FROM email_verification_codes WHERE userId = ? AND createdAt > ?").get(userId, cutoff) as { count: number };
  return row.count < 3;
}

type VerifyEmailResult = { ok: true; userId: string } | { ok: false; error: string };

export function verifyEmailCode(email: string, code: string): VerifyEmailResult {
  const user = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as { id: string } | undefined;
  if (!user) return { ok: false, error: "Invalid verification request." };
  const row = db.prepare("SELECT id, codeHash, expiresAt, usedAt, attempts FROM email_verification_codes WHERE userId = ? ORDER BY createdAt DESC LIMIT 1").get(user.id) as { id: number; codeHash: string; expiresAt: number; usedAt: number | null; attempts: number } | undefined;
  if (!row) return { ok: false, error: "No verification code found." };
  if (row.usedAt) return { ok: false, error: "Code already used." };
  if (row.expiresAt < Date.now()) return { ok: false, error: "Code expired." };
  if (row.attempts >= 5) return { ok: false, error: "Too many attempts. Request another code." };
  if (hmac(code) !== row.codeHash) {
    db.prepare("UPDATE email_verification_codes SET attempts = attempts + 1 WHERE id = ?").run(row.id);
    logSuspiciousActivity("invalid_email_verification_code", { email });
    return { ok: false, error: "Invalid verification code." };
  }
  const now = Date.now();
  db.prepare("UPDATE email_verification_codes SET usedAt = ? WHERE id = ?").run(now, row.id);
  db.prepare("UPDATE users SET isVerified = 1 WHERE id = ?").run(user.id);
  return { ok: true, userId: user.id };
}

function signSid(id: string) {
  return `${id}.${createHmac("sha256", SESSION_SECRET).update(id).digest("hex")}`;
}
function verifySid(value: string) {
  const [id, sig] = value.split(".");
  if (!id || !sig) return null;
  const expected = createHmac("sha256", SESSION_SECRET).update(id).digest("hex");
  return timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) ? id : null;
}

export async function createSession(userId: string) {
  const id = randomUUID();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  sessions.set(id, { id, userId, expiresAt });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, signSid(id), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_TTL_MS / 1000 });
}

export async function getSessionUserId() {
  const jar = await cookies();
  const signed = jar.get(SESSION_COOKIE)?.value;
  if (!signed) return null;
  const id = verifySid(signed);
  if (!id) return null;
  const session = sessions.get(id);
  if (!session || session.expiresAt < Date.now()) return null;
  return session.userId;
}

export async function destroySession() {
  const jar = await cookies();
  const signed = jar.get(SESSION_COOKIE)?.value;
  if (signed) {
    const id = verifySid(signed);
    if (id) sessions.delete(id);
  }
  jar.delete(SESSION_COOKIE);
}

export function issueResetToken(userId: string) {
  const token = randomBytes(32).toString("hex");
  const now = Date.now();
  db.prepare("INSERT INTO password_reset_tokens (userId, tokenHash, expiresAt, createdAt) VALUES (?, ?, ?, ?)")
    .run(userId, hmac(token), now + 15 * 60 * 1000, now);
  return token;
}

export function consumeResetToken(token: string) {
  const row = db.prepare("SELECT id, userId, expiresAt, usedAt FROM password_reset_tokens WHERE tokenHash = ? ORDER BY createdAt DESC LIMIT 1").get(hmac(token)) as { id: number; userId: string; expiresAt: number; usedAt: number | null } | undefined;
  if (!row || row.usedAt || row.expiresAt < Date.now()) return null;
  db.prepare("UPDATE password_reset_tokens SET usedAt = ? WHERE id = ?").run(Date.now(), row.id);
  return row.userId as string;
}

export function sendVerificationEmail(email: string, code: string) {
  return queueNotification({ channel: "email", to: email, subject: "DealVista verification code", body: `Your verification code is ${code}. It expires in 10 minutes.`, mode: "demo" });
}

export function sendResetEmail(email: string, token: string) {
  const base = process.env.APP_BASE_URL || "http://localhost:3000";
  return queueNotification({ channel: "email", to: email, subject: "DealVista password reset", body: `Reset your password: ${base}/reset-password?token=${token}`, mode: "demo" });
}

export function createUser(email: string, passwordHash: string) {
  const id = randomUUID();
  const now = Date.now();
  db.prepare("INSERT INTO users (id, email, passwordHash, isVerified, role, createdAt) VALUES (?, ?, ?, 0, 'user', ?)").run(id, email, passwordHash, now);
  return id;
}
