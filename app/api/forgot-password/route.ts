import { NextResponse } from "next/server";
import { db } from "@/lib/auth-db";
import { getIp, issueResetToken, rateLimit, sendResetEmail } from "@/lib/auth";
import { requireCaptcha } from "@/lib/captcha-middleware";

export async function POST(request: Request) {
  const ip = getIp(request);
  if (!rateLimit(`forgot:${ip}`, 3, 60 * 60 * 1000).allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const body = await request.json();
  const captchaFailure = await requireCaptcha(request, body);
  if (captchaFailure) return captchaFailure;

  const email = String(body?.email ?? "").trim().toLowerCase();
  const user = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as { id: string } | undefined;
  if (user) {
    const token = issueResetToken(user.id);
    sendResetEmail(email, token);
  }
  return NextResponse.json({ ok: true });
}
