import { NextResponse, type NextRequest } from "next/server";

// Password-gate the coach admin with HTTP Basic Auth.
// - ADMIN_PASSWORD set  -> prompt for credentials (user defaults to "coach").
// - not set, development -> allowed (so local work isn't blocked).
// - not set, production  -> blocked, telling you to configure it.
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER || "coach";
  const pass = process.env.ADMIN_PASSWORD || "";

  if (!pass) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin not configured. Set ADMIN_PASSWORD.", { status: 503 });
    }
    return NextResponse.next();
  }

  const header = req.headers.get("authorization") || "";
  if (header.startsWith("Basic ")) {
    try {
      const [u, p] = atob(header.slice(6)).split(":");
      if (u === user && p === pass) return NextResponse.next();
    } catch {
      // fall through to challenge
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="De Maitre Coach", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
