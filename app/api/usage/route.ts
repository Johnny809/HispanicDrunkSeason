import { NextResponse } from "next/server";
import { getUsage, trackVisit } from "@/lib/usage-store";

export async function GET() {
  return NextResponse.json({ usage: getUsage() });
}

export async function POST() {
  return NextResponse.json({ ok: true, usage: trackVisit() });
}
