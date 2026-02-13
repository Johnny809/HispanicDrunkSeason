import { NextResponse } from "next/server";
import { getDiscounts, updateDiscounts } from "@/lib/subscription-store";

export async function GET() {
  return NextResponse.json({ discounts: getDiscounts() });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const proPercentOff = Number(payload?.proPercentOff ?? 0);
  const premiumPercentOff = Number(payload?.premiumPercentOff ?? 0);
  return NextResponse.json({ ok: true, discounts: updateDiscounts({ proPercentOff, premiumPercentOff }) });
}
