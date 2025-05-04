import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip if not homepage or already has a locale
  if (pathname !== "/" && !pathname.match(/^\/$/)) {
    return NextResponse.next()
  }

  // Redirect to default locale
  return NextResponse.redirect(new URL("/pt", request.url))
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
