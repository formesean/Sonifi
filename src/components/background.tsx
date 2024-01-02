"use client";
import { assets } from "@/lib/asset-utils";
import { Platform, platforms } from "@/lib/platform-utils";
import { cn } from "@/lib/tailwind-utils";
import { useEffect, useState } from "react";
import Image from "next/image";

const BackgroundComponent = () => {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>(
    platforms[0]
  );
  const [showBackground, setShowBackground] = useState<boolean>(false);

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
    <>
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
    </>
  );
};

export default BackgroundComponent;
