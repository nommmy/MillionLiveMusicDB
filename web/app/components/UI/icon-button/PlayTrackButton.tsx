"use client";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  useSetCurrentSong,
  useGetCurrentSong,
  useGetAudioRef,
} from "../../Provider/Providers";
import IconButton from "@mui/material/IconButton";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  src: string;
  artistName: string;
  albumImage: string;
  additionalClassName?: string;
};

const PlayTrackButton = ({title, src, artistName, albumImage, additionalClassName=""}: Props) => {
  const setCurrentSong = useSetCurrentSong();
  const currentSong = useGetCurrentSong();
  const audioRef = useGetAudioRef();

  const isClicked = useRef(false);

  useEffect(() => {
    if (isClicked.current) {
      audioRef.current?.play();
      isClicked.current = false;
    }
  }, [currentSong, audioRef]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentSong({ title, src, artistName, albumImage });
    isClicked.current = true;
  };

  return (
    <IconButton
      onClick={handleClick}
      className="control-track-button"
      disableRipple={true}>
      <PlayCircleIcon
        sx={{ fontSize: 30 }}
        className={`${additionalClassName}`}
      />
    </IconButton>
  );
};

export default PlayTrackButton;
