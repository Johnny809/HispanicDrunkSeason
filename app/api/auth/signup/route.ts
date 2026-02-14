import { NextResponse } from "next/server";
import { db } from "@/lib/auth-db";
import { canSendVerificationEmail, createUser, createVerificationCode, getIp, hashPassword, rateLimit, sendVerificationEmail } from "@/lib/auth";
import { requireCaptcha } from "@/lib/captcha-middleware";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = getIp(request);
  if (!rateLimit(`signup:${ip}`, 5, 15 * 60 * 1000).allowed) return NextResponse.json({ error: "Too many signup attempts." }, { status: 429 });

  const body = await request.json();
  const captchaFailure = await requireCaptcha(request, body);
  if (captchaFailure) return captchaFailure;

  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const confirmPassword = String(body?.confirmPassword ?? "");

  if (!emailRegex.test(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return NextResponse.json({ error: "Email already in use." }, { status: 409 });

  const userId = createUser(email, hashPassword(password));
  if (!canSendVerificationEmail(userId)) return NextResponse.json({ error: "Verification email limit reached." }, { status: 429 });
  const code = createVerificationCode(userId);
  sendVerificationEmail(email, code);
  return NextResponse.json({ ok: true, email });
}
