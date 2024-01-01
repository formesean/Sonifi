"use client";
import "./globals.css";
import { Sidebar } from "./spotify/components/sidebar";
import BackgroundComponent from "@/components/background";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSpotifyHome = window.location.pathname.includes("/spotify/home");

  if (isSpotifyHome) {
    return (
      <html lang="en">
        <body className="h-screen overflow-hidden">
          <BackgroundComponent />
          <div className="relative z-10">
            <div className="h-screen grid lg:grid-cols-5">
              <Sidebar className="relative z-10 hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
