import { authMiddleware } from "@clerk/nextjs";
import { NextRequest } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: (req: NextRequest) => {
    if (req.nextUrl.pathname === "/") return true;
    if (["/sign-in", "/sign-up"].includes(req.nextUrl.pathname)) return true;
    // TODO: Make this check more secure
    if (req.url.includes("/api/")) return true;
    return false;
  },
});

// Note: This is a pretty blind copy from Clerk docs. Definitely can be optimised.
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/sign-in", "/sign-up"],
};
