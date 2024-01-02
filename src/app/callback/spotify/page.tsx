"use client";
import { assets } from "@/lib/asset-utils";
import { Platform, platforms } from "@/lib/platform-utils";
import { cn } from "@/lib/tailwind-utils";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import "./style.css";
import { setCookie } from "cookies-next";
import BackgroundComponent from "@/components/background";

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
  useEffect(() => {
    if (window.location.hash) {
      try {
        const { access_token, expires_in, token_type } = getSpotifyParameters(
          window.location.hash
        );
        const spotifyAuthData = [access_token, expires_in, token_type];

        setCookie("spotifyAuthData", JSON.stringify(spotifyAuthData));
        setCookie("logged", "true");

        window.location.href = "/spotify/home";
      } catch (error) {
        console.error("Error during logging in: ", error);
      }
    }
  }, []);

  return (
    <main>
      <BackgroundComponent />
      <div className="loading flex inset-0 justify-center items-center h-screen w-screen relative z-10 bg-transparent">
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
        <div className="loading__dot"></div>
      </div>
    </main>
  );
}
