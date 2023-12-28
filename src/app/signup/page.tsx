"use client";
import { assets } from "@/utils/asset-utils";
import { Platform, platforms } from "@/utils/platform-utils";
import { cn } from "@/utils/tailwind-utils";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import "./style.css";

export default function Signup() {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>(
    platforms[0]
  );
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let currentIndex = 0;

    const rotatePlatforms = () => {
      setCurrentPlatform(platforms[currentIndex]);
      currentIndex = (currentIndex + 1) % platforms.length;
    };

    const intervalID = setInterval(rotatePlatforms, 2000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    setShowBackground(true);
  }, []);

  return (
    <main>
      <div
        className={cn(
          "fixed inset-0 transition-color delay-100 duration-700 opacity-25",
          {
            "bg-green-400": currentPlatform === "spotify",
            "bg-red-400": currentPlatform === "youtube",
          }
        )}
      />
      <Image
        width={1200}
        height={1200}
        role="presentation"
        alt="gradient background"
        className="fixed inset-0 w-screen h-screen object-cover opacity-90"
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

      <div className="fixed inset-0 flex items-center justify-center">
        <div className="card bg-[#111] flex flex-col items-center justify-center">
          <h1 className="text-4xl text-white font-bold mb-6 relative -top-8">
            Sign Up
          </h1>

          <div className="flex flex-col items-center justify-center space-y-4 text-black text-center">
            <div className="relative w-[150%]">
              <button className="bg-red-400 px-6 py-3 rounded-md text-md font-semibold w-full relative z-10">
                <Image
                  src={assets.youtube}
                  alt="YouTube Icon"
                  width={24}
                  height={24}
                  className="mr-2 inline"
                />
                YouTube
              </button>
              <div className="absolute inset-0  bg-[#111] bg-opacity-85 flex items-center justify-center z-20">
                <span className="text-white text-lg font-semibold select-none">
                  Coming Soon
                </span>
              </div>
            </div>

            <button className="bg-green-400 px-6 py-3 rounded-md text-md font-semibold w-[150%]">
              <Image
                src={assets.spotify}
                alt="Spotify Icon"
                width={24}
                height={24}
                className="mr-2 inline"
              />
              Spotify
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
