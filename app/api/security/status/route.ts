import { NextResponse } from "next/server";
import { getSecurityStatus } from "@/lib/security-store";

export async function GET() {
  return NextResponse.json(getSecurityStatus());
}
