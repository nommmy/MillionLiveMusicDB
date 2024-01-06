import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeInput from "./VolumeInput";
import React from "react";

type Props = {
  volume: number;
  handleMuteUnmute: () => void;
  handleVolumeChange: (volumeValue: number) => void;
};

const VolumeController = React.memo(({ volume, handleMuteUnmute, handleVolumeChange }: Props) => {
  return (
    <div className="volume-control-container">
      <IconButton
        onClick={handleMuteUnmute}
        aria-label={volume === 0 ? "unmute" : "mute"}
        className="control-icon-button"
      >
        {volume === 0 ? (
          <VolumeOffIcon className="control-icon volume-icon" />
        ) : (
          <VolumeUpIcon className="control-icon volume-icon" />
        )}
      </IconButton>
      <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
    </div>
  );
});

VolumeController.displayName = "VolumeController";

export default VolumeController;
