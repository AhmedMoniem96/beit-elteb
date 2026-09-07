import { NextResponse } from "next/server";
import { sessionCookie } from "@/lib/auth";
export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  res.cookies.delete(sessionCookie);
  return res;
}
