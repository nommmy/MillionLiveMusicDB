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
};

const PlayTrackButton = (props: Props) => {
  const setCurrentSong = useSetCurrentSong();
  const currentSong = useGetCurrentSong();
  const audioRef = useGetAudioRef();

  const isClicked = useRef(false);

  useEffect(() => {
    if (isClicked.current) {
      audioRef.current?.play();
      isClicked.current = false;
    }
  }, [currentSong]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentSong(props);
    isClicked.current = true;
  };

  return (
    <IconButton onClick={handleClick} className="control-track-button">
      <PlayCircleIcon sx={{ fontSize: 30 }} />
    </IconButton>
  );
};

export default PlayTrackButton;
