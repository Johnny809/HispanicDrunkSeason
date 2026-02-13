import { NextResponse } from "next/server";
import { getAffiliateDashboard } from "@/lib/affiliate";

export async function GET() {
  return NextResponse.json(getAffiliateDashboard());
}
