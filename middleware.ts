import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths that need protection
  const isAdminPath = pathname.startsWith("/admin");
  const isAdminApiPath = pathname.startsWith("/api/admin");
  const isAuthPath = pathname === "/admin/login" || pathname === "/api/admin/auth/login";

  // Check if session cookie exists
  const sessionCookieName = "thermopharm_session";
  const hasSession = req.cookies.has(sessionCookieName);

  if (isAdminPath || isAdminApiPath) {
    if (isAuthPath) {
      // If already logged in, redirect away from login page to dashboard
      if (hasSession && pathname === "/admin/login") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    if (!hasSession) {
      if (isAdminApiPath) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
