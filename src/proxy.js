import { NextResponse } from "next/server";

const BLOCKED_UA_PATTERNS = [
  /scrapy/i,
  /masscan/i,
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
];

export default function proxy(request) {
  const userAgent = request.headers.get("user-agent") || "";

  const isBlocked = BLOCKED_UA_PATTERNS.some((pattern) =>
    pattern.test(userAgent)
  );

  if (isBlocked) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/).*)",
  ],
};
