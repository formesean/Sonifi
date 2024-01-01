"use client";
import { assets } from "@/lib/asset-utils";
import { Platform, platforms } from "@/lib/platform-utils";
import { cn } from "@/lib/tailwind-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.css";
import BackgroundComponent from "@/components/background";

const SPACE_DELIMITER = "%20";
const SCOPES = [
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-read",
  "ugc-image-upload",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";

export default function Signup() {
  const handleSpotifyLogin = () => {
    window.location.href = `${SPOTIFY_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <main>
      <BackgroundComponent />
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

            <button
              onClick={handleSpotifyLogin}
              className="bg-green-400 px-6 py-3 rounded-md text-md font-semibold w-[150%]"
            >
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
