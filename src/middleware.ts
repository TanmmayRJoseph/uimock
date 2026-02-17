import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes (accessible without authentication)
const publicRoutes = ["/login", "/register", "/"];

// Define private routes (require authentication)
const privateRoutes = ["/dashboard", "/project", "/make-project"];

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Check if the current path is a private route
  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // If user is authenticated
  if (session?.user) {
    // Redirect authenticated users away from public routes to dashboard
    if (isPublicRoute && pathname !== "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Allow access to private routes and other pages
    return NextResponse.next();
  }

  // If user is NOT authenticated
  if (!session?.user) {
    // Redirect unauthenticated users from private routes to login
    if (isPrivateRoute) {
      const loginUrl = new URL("/login", req.url);
      // Add callbackUrl to redirect back after login
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow access to public routes
    return NextResponse.next();
  }

  return NextResponse.next();
});

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.gif$).*)",
  ],
};
