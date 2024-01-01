/**
 * Home page component that renders the landing page.
 *
 * Renders the header, tagline, call to action button, and image carousel.
 * Uses React hooks like useState and useEffect to manage state and effects.
 * Imports and uses utility functions and components.
 * Exports as the default export for this module.
 */
"use client";
import { assets } from "@/lib/asset-utils";
import { Platform, platforms } from "@/lib/platform-utils";
import { cn } from "@/lib/tailwind-utils";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Poppins } from "next/font/google";
import { PlatformRotation } from "@/components/platform-rotation";
import EmblaCarousel from "../components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel-react";
import "../app/embla.css";
import { Cursor } from "@/components/cursor";
import Link from "next/link";
import BackgroundComponent from "@/components/background";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});
const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>(
    platforms[0]
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <main>
      <BackgroundComponent />
      <div className="max-w-7xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <h1
            className={`text-5xl max-w-3xl text-center leading-snug mb-8 ${poppins.className}`}
          >
            <PlatformRotation currentPlatform={currentPlatform} />? Nah.{" "}
            <span
              className={cn("transition-colors duration-200", {
                "text-green-400": currentPlatform === "spotify",
                "text-red-400": currentPlatform === "youtube",
              })}
            >
              Sonifi
            </span>
            : no more endless scrolling, just vibes.
          </h1>

          <p className="mb-8">
            <span className="text-gray-300">
              Elevate your listening. Sonifi's AI analyzes your emotions to
              create your perfect auditory companion
            </span>
          </p>

          <div className="mb-2">
            <Link href="/signin">
              <button
                ref={buttonRef}
                className={cn(
                  "text-black px-6 py-3 rounded-md text-md font-semibold transition-colors duration-200",
                  {
                    "bg-green-400": currentPlatform === "spotify",
                    "bg-red-400": currentPlatform === "youtube",
                  }
                )}
              >
                Sign Up Now!
              </button>
            </Link>
          </div>

          <section className="relative">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </section>
        </div>
      </div>

      <Cursor buttonRef={buttonRef} />
    </main>
  );
}
