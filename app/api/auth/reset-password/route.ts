import { NextResponse } from "next/server";
import { db } from "@/lib/auth-db";
import { consumeResetToken, hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const token = String(body?.token ?? "").trim();
  const password = String(body?.password ?? "");
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  const userId = consumeResetToken(token);
  if (!userId) return NextResponse.json({ error: "Invalid or expired reset token." }, { status: 400 });

  db.prepare("UPDATE users SET passwordHash = ? WHERE id = ?").run(hashPassword(password), userId);
  return NextResponse.json({ ok: true });
}
