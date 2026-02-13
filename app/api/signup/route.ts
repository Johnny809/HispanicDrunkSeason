import { NextResponse } from "next/server";
import { addUser, generateUsername } from "@/lib/user-store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const payload = await request.json();
  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim();
  const phone = String(payload?.phone ?? "").trim();
  let username = String(payload?.username ?? "").trim();
  const autoGenerate = Boolean(payload?.autoGenerate);

  if (!name || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Valid name and email are required" }, { status: 400 });
  }

  if (!username || autoGenerate) username = generateUsername(name);

  const user = addUser({ name, email, phone: phone || undefined, username });
  return NextResponse.json({ ok: true, user });
}
