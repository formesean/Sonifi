import React, { useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import fetchPlaylist, { PlaylistTrack } from "@/app/api/getGlobalTopTracks";
import getToken from "@/app/api/getToken";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const autoplayOptions = {
  stopOnInteraction: false,
};

const GlobalTopTracksCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);
  const [playlistTracks, setPlaylistTracks] = useState<PlaylistTrack[]>([]);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const accessToken = await getToken();

        if (!accessToken) {
          console.error("Spotify access token not found.");
          return;
        }

        const tracks = await fetchPlaylist(accessToken);
        setPlaylistTracks(tracks);
      } catch (error: any) {
        console.error("Error fetching playlist tracks:", error.message);
      }
    };

    fetchPlaylistTracks();
  }, []);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {playlistTracks.map((track, index) => (
            <div className="embla__slide" key={track.id}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                className="embla__slide__img"
                src={track.image_path || ""}
                alt={`Slide ${index}`}
              />
              <div className="embla__slide__info">
                <p className="embla__slide__name">{track.name}</p>
                <p className="embla__slide__artists">
                  Artists: {track.artists.join(", ")}
                </p>
                <p className="embla__slide__track-number">
                  Global Ranking: {track.track_number}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalTopTracksCarousel;
