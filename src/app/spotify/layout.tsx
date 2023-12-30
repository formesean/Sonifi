"use client";
import { useEffect, useState } from "react";
import "../globals.css";
import { Sidebar } from "./components/sidebar";
import Image from "next/image";
import { assets } from "@/lib/asset-utils";
import { cn } from "@/lib/tailwind-utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    setShowBackground(true);
  }, []);

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <div className="fixed inset-0 bg-green-400 opacity-25" />
        <Image
          width={1200}
          height={1200}
          role="presentation"
          alt="gradient background"
          className="fixed inset-0 w-screen h-screen object-cover"
          src={assets.gradient}
        />
        <div
          className="fixed inset-0 opacity-30"
          style={{
            backgroundImage: `url(${assets.square})`,
            backgroundSize: "30px",
          }}
        />
        <div
          className={cn(
            "bg-black fixed inset-0 transition-opacity duration-[1500ms]",
            !showBackground ? "opacity-100" : "opacity-0"
          )}
        ></div>

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
