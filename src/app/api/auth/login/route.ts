import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessionCookie, signSession, verifyPassword } from "@/lib/auth";
export async function POST(req: Request) {
  const data = await req.formData();
  const email = String(data.get("email") || "").toLowerCase();
  const user = await db.user.findUnique({ where: { email } });
  if (
    !user ||
    !verifyPassword(String(data.get("password") || ""), user.passwordHash)
  )
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(
    sessionCookie,
    signSession({ id: user.id, email: user.email, role: user.role }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 86400,
    },
  );
  return res;
}
