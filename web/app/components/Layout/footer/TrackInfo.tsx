import Image from "next/image";
import React from "react";

type Props = {
  currentSong: {
    title: string;
    src: string;
    artistName: string;
    albumImage: string;
  };
};

const TrackInfo = React.memo(({currentSong}: Props) => {
  return (
    <div className="song-info-container">
      <Image
        width={56}
        height={56}
        src={currentSong?.albumImage}
        alt={`${currentSong?.title} album image`}
      />
      <div className="song-title-container">
        <p className="song-title">{currentSong?.title ?? "Select a song"}</p>
        <p className="sub-text">{currentSong?.artistName ?? "Singer Name"}</p>
      </div>
    </div>
  );
});

TrackInfo.displayName = "TrackInfo";

export default TrackInfo;
