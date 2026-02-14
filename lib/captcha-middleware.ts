import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";

export async function requireCaptcha(request: Request, body: Record<string, unknown>) {
  const token = String(body["cf-turnstile-response"] ?? "").trim();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!token) {
    return NextResponse.json({ error: "Captcha required." }, { status: 400 });
  }

  const valid = await verifyTurnstile(token, ip);
  if (!valid) {
    return NextResponse.json({ error: "Bot verification failed." }, { status: 400 });
  }

  return null;
}
