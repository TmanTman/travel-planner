import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: (req) => {
    if (req.url === "/") return true;
    // TODO: Make this check more secure
    if (req.url.includes("/api/")) return true;
    return false;
  },
});

// Note: This is a pretty blind copy from Clerk docs. Definitely can be optimised.
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
