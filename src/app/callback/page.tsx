"use client";
import { assets } from "@/utils/asset-utils";
import { Platform, platforms } from "@/utils/platform-utils";
import { cn } from "@/utils/tailwind-utils";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import "./style.css";
import { Cookie } from "next/font/google";

const getSpotifyParameters = (hash: string) => {
  const stringAfterHash = hash.substring(1);
  const urlParams = stringAfterHash.split("&");
  const urlParamsMap = urlParams.reduce((accum: any, param: string) => {
    const [key, value] = param.split("=");
    accum[key] = value;
    return accum;
  }, {});

  return urlParamsMap;
};

export default function Callback() {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>(
    platforms[0]
  );
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.hash) {
      try {
        const { access_token, expires_in, token_type } = getSpotifyParameters(
          window.location.hash
        );
        const spotifyAuthData = [access_token, expires_in, token_type];

        localStorage.clear();
        localStorage.setItem(
          "spotifyAuthData",
          JSON.stringify(spotifyAuthData)
        );

        window.location.href = "/spotify";
      } catch (error) {
        console.error("Error during logging in: ", error);
      }
    }
  }, []);

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

      <div className="loading flex inset-0 justify-center items-center h-screen w-screen">
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
      </div>
    </main>
  );
}
