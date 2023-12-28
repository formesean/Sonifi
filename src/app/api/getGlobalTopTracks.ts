import axios, { AxiosResponse } from "axios";

export interface PlaylistTrack {
  name: string;
  id: string;
  artists: string[];
  image_path: string;
  track_number: number;
  uri: string;
}

/**
 * Fetches tracks from a Spotify playlist.
 * @param accessToken - Spotify access token.
 * @returns {Promise<PlaylistTrack[]>} - Promise that resolves to an array of playlist tracks.
 */
const fetchPlaylist = async (accessToken: string): Promise<PlaylistTrack[]> => {
  const playlistId = "37i9dQZEVXbMDoHDwVN2tF";
  const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`;

  try {
    const response: AxiosResponse = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const tracks: PlaylistTrack[] = response.data.items.map(
      (item: any, index: number) => ({
        name: item.track.name,
        id: item.track.id,
        artists: item.track.artists.map((artist: any) => artist.name),
        image_path:
          item.track.album.images.length > 0
            ? item.track.album.images[0].url
            : "",
        track_number: index + 1,
        uri: item.track.uri,
      })
    );

    return tracks;
  } catch (error: any) {
    console.error("Error fetching playlist tracks:", error.message);
    throw error;
  }
};

export default fetchPlaylist;
