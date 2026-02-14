import { NextResponse } from "next/server";
import { db } from "@/lib/auth-db";
import { createSession, getIp, rateLimit, verifyPassword } from "@/lib/auth";
import { requireCaptcha } from "@/lib/captcha-middleware";

export async function POST(request: Request) {
  const ip = getIp(request);
  if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000).allowed) return NextResponse.json({ error: "Too many login attempts." }, { status: 429 });

  const body = await request.json();
  const captchaFailure = await requireCaptcha(request, body);
  if (captchaFailure) return captchaFailure;

  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as { id: string; isVerified: number; passwordHash: string } | undefined;
  if (!user || !verifyPassword(password, user.passwordHash)) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  if (!user.isVerified) return NextResponse.json({ error: "Email not verified." }, { status: 403 });

  await createSession(user.id);
  db.prepare("UPDATE users SET lastLoginAt = ? WHERE id = ?").run(Date.now(), user.id);
  return NextResponse.json({ ok: true });
}
