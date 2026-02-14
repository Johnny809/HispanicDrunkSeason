import { NextResponse } from "next/server";
import { getTurnstileHealth } from "@/lib/turnstile";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(getTurnstileHealth());
}
