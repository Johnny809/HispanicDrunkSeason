import { NextResponse } from "next/server";
import { coupons, hotSales, priceAlerts } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ hotSales, coupons, priceAlerts });
}
