import { NextResponse } from "next/server";
import { db } from "@/lib/auth-db";
import { canSendVerificationEmail, createVerificationCode, sendVerificationEmail } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const user = db.prepare("SELECT id, isVerified FROM users WHERE email = ?").get(email) as { id: string; isVerified: number } | undefined;
  if (!user || user.isVerified) return NextResponse.json({ ok: true });
  if (!canSendVerificationEmail(user.id)) return NextResponse.json({ error: "Maximum verification emails reached for this hour." }, { status: 429 });
  const code = createVerificationCode(user.id);
  sendVerificationEmail(email, code);
  return NextResponse.json({ ok: true });
}
