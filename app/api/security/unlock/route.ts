import { NextResponse } from "next/server";
import { unlockWithCode } from "@/lib/security-store";

export async function POST(request: Request) {
  const payload = await request.json();
  const code = String(payload?.code ?? "").trim();
  const token = String(payload?.token ?? "").trim();
  const result = unlockWithCode(code, token || undefined);

  if (!result.ok) return NextResponse.json({ error: "Invalid 2FA code" }, { status: 401 });
  return NextResponse.json(result);
}
