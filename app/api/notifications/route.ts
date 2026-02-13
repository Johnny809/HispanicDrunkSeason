import { NextResponse } from "next/server";
import { listNotifications } from "@/lib/mock-notifications";

export async function GET() {
  return NextResponse.json({ notifications: listNotifications() });
}
