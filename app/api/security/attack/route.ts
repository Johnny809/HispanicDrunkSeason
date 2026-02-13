import { NextResponse } from "next/server";
import { triggerAttack } from "@/lib/security-store";

export async function POST() {
  const ownerAlert = triggerAttack();
  return NextResponse.json({ ok: true, ownerAlert });
}
