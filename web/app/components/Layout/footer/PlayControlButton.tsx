import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import React from "react";

type Props = {
  isReady: boolean;
  isPlaying: boolean;
  togglePlayPause: () => void;
  currentSong: {
    title: string;
    src: string;
    artistName: string;
    albumImage: string;
  };
};

const PlayControlButton = React.memo(({
  isReady,
  isPlaying,
  togglePlayPause,
  currentSong,
}: Props) => {
  return (
    <IconButton
      disabled={!isReady}
      onClick={togglePlayPause}
      aria-label={isPlaying ? "Pause" : "Play"}
      className="control-icon-button"
    >
      {!isReady && currentSong ? (
        <PlayCircleIcon className="control-icon disabled-icon" />
      ) : isPlaying ? (
        <PauseCircleIcon className="control-icon" />
      ) : (
        <PlayCircleIcon className="control-icon" />
      )}
    </IconButton>
  );
});

PlayControlButton.displayName = "PlayControlButton";

export default PlayControlButton;
