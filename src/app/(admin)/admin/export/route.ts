import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { listLeads, leadsToCsv } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { searchParams } = new URL(request.url);
  const leads = listLeads({
    type: searchParams.get("type") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    search: searchParams.get("q") ?? undefined,
  });

  const csv = leadsToCsv(leads);
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
    },
  });
}
