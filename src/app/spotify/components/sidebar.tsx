import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface SpotifyPlaylistItem {
  id: string;
  name: string;
}

interface SpotifyApiResponse {
  items: SpotifyPlaylistItem[];
}

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

export function Sidebar({ className }: { className?: string }) {
  const [token, setToken] = useState("");
  const [data, setData] = useState<SpotifyApiResponse>({ items: [] });
  const [active, setActive] = useState<string>("secondary");

  useEffect(() => {
    if (localStorage.getItem("spotifyAuthData")) {
      const storedData = localStorage.getItem("spotifyAuthData");

      if (storedData) {
        const spotifyAuthData = JSON.parse(storedData);
        const [access_token, expires_in, token_type] = spotifyAuthData;

        setToken(access_token);
      }
    }

    handleGetPlaylist();
  }, [token]);

  const handleGetPlaylist = async () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleActiveState = (variant: string) => {
    setActive(variant);
  };

  const renderPlaylists = () => {
    return data.items?.map((playlist, i) => (
      <Button
        key={`${playlist.id}-${i}`}
        variant="ghost"
        className="w-full justify-start font-normal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <path d="M21 15V6" />
          <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M12 12H3" />
          <path d="M16 6H3" />
          <path d="M12 18H3" />
        </svg>
        {playlist.name}
      </Button>
    ));
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Link href="/spotify/home">
              <Button
                variant={active === "secondary" ? "secondary" : "ghost"}
                onClick={() => handleActiveState("secondary")}
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                Home
              </Button>
            </Link>
            <Link href="/spotify/generate">
              <Button
                variant={active === "ghost" ? "secondary" : "ghost"}
                onClick={() => handleActiveState("ghost")}
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                Generate
              </Button>
            </Link>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[450px] px-1">
            <div className="space-y-1 p-2">{renderPlaylists()}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
