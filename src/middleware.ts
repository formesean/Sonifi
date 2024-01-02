import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isLogin = req.cookies.get("logged");
  const hasSpotifyAuthData = req.cookies.get("spotifyAuthData");

  if (!isLogin || !hasSpotifyAuthData) {
    if (req.nextUrl.pathname.startsWith("/spotify")) {
      const absoluteUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteUrl.toString());
    }
  } else {
    if (url.pathname === "/spotify") {
      url.pathname = "/spotify/home";
      return NextResponse.redirect(url.toString());
    }
  }

  return NextResponse.next();
}
