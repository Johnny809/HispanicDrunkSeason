import { NextResponse } from "next/server";
import { db } from "@/lib/auth-db";
import { getSessionUserId } from "@/lib/auth";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ user: null });
  const user = db.prepare("SELECT id, email, role, isVerified, createdAt, lastLoginAt FROM users WHERE id = ?").get(userId);
  return NextResponse.json({ user: user ?? null });
}
