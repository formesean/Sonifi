import axios, { AxiosResponse } from "axios";

interface SpotifyShowsResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyShowItem[];
}

interface SpotifyShowItem {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

const SPOTIFY_API_URL = "https://api.spotify.com/v1/me/playlists";

/**
 * Fetches Spotify shows data using the provided access token.
 * @param token - Spotify access token.
 * @returns Promise containing the SpotifyShowsResponse.
 */
const fetchSpotifyShowsData = async (
  token: string
): Promise<SpotifyShowsResponse> => {
  try {
    const response: AxiosResponse<SpotifyShowsResponse> = await axios.get(
      SPOTIFY_API_URL,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw new Error("Failed to fetch Spotify shows data");
  }
};

export default fetchSpotifyShowsData;
