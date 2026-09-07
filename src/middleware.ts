import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !req.cookies.has("beit_session")
  ) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (pathname === "/") return NextResponse.redirect(new URL("/en", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/", "/admin/:path*"] };
