import Image from "next/image";
import React from "react";

type Props = {
  trackName: string;
};

const SpotifyIcon = React.memo(({ trackName }: Props) => {
  return (
    <a
      href={`https://open.spotify.com/search/${trackName}%20idolm%40ster`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        width={21}
        height={21}
        src="/subscribe-icons/icon_spotify_black.webp"
        alt="spotify icon"
      />
    </a>
  );
});

SpotifyIcon.displayName = "SpotifyIcon";

export default SpotifyIcon;
