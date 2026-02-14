import { NextResponse } from "next/server";
import { getTurnstileHealth } from "@/lib/turnstile";

export async function GET() {
  return NextResponse.json(getTurnstileHealth());
}
