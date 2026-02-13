import { NextResponse } from "next/server";
import { withdrawAffiliateBalance } from "@/lib/affiliate";

export async function POST() {
  const result = withdrawAffiliateBalance();

  if (!result.ok) {
    return NextResponse.json({ error: "No available affiliate balance to withdraw" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, withdrawnAmount: result.amount });
}
