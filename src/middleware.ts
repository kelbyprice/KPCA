import { clerkMiddleware } from "@clerk/nextjs/server";

// Permissive middleware — Clerk auth context is available everywhere it
// matches, but no route is auto-protected. Specific routes opt in to
// protection via auth.protect() in their server components or layouts.
//
// Excludes:
//  - Payload admin (/admin) — has its own native auth via the Users collection
//  - Payload REST/GraphQL APIs (/api/*) — auth handled by Payload internally
//  - Static assets, _next, favicon, fonts, etc. (per default matcher)
export default clerkMiddleware();

export const config = {
  matcher: [
    // Match everything except: _next assets, files with extensions, /admin, /api
    "/((?!_next|admin(?:/.*)?|api(?:/.*)?|.*\\..*).*)",
    // Always run on root
    "/",
  ],
};
