
import { NextResponse } from "next/server";

const BLOCKED_UA_PATTERNS = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /python-urllib/i,
  /go-http-client/i,
  /scrapy/i,
  /httpclient/i,
  /libwww-perl/i,
  /masscan/i,
  /sqlmap/i,
];

export default function proxy(request) {
  const userAgent = request.headers.get("user-agent") || "";

  if (userAgent.length < 8) {
    return new NextResponse("Forbidden", { status: 403 });
  }

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
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
