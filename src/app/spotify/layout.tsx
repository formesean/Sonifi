"use client";
import { Sidebar } from "./components/sidebar";
import BackgroundComponent from "@/components/background";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen overflow-hidden">
      <BackgroundComponent />
      <div className="relative z-10 h-screen grid lg:grid-cols-5">
        <Sidebar className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l">{children}</div>
      </div>
    </section>
  );
}
