import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/api/isAuthenticated";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const path = req.nextUrl.pathname;

  // Restricting authenticated users from accessing certain routes
  if (
    token &&
    (path.startsWith("/login") ||
      path.startsWith("/register") ||
      path.startsWith("/plan"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && path.startsWith("/create")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // const methods = ["POST", "PUT"];

  // if (methods.includes(req.method) && !isAuthenticated(req)) {
  //   return NextResponse.json(
  //     { message: "Authentication failed" },
  //     { status: 401 }
  //   );
  // }
}

export const config = {
  matcher: ["/:path*"],
};
