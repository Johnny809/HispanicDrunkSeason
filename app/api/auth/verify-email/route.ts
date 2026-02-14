import { NextResponse } from "next/server";
import { createSession, getIp, rateLimit, verifyEmailCode } from "@/lib/auth";

export async function POST(request: Request) {
  const ip = getIp(request);
  if (!rateLimit(`verify-email:${ip}`, 10, 15 * 60 * 1000).allowed) return NextResponse.json({ error: "Too many verification attempts." }, { status: 429 });

  const body = await request.json();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const code = String(body?.code ?? "").trim();
  if (!/^\d{6}$/.test(code)) return NextResponse.json({ error: "Code must be 6 digits." }, { status: 400 });

  const result = verifyEmailCode(email, code);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  await createSession(result.userId);
  return NextResponse.json({ ok: true });
}
